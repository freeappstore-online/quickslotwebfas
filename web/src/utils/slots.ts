import {
    addMinutes,
    format,
    startOfDay,
    setHours,
    setMinutes,
    isPast,
} from 'date-fns';
import type { TimeSlot } from '../types/bookings';

const WORKING_HOURS_START = 9;
const WORKING_HOURS_END = 17;
const SLOT_INTERVAL_MINUTES = 30;

export const generateSlotsForDate = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];

    let current = setMinutes(
        setHours(startOfDay(date), WORKING_HOURS_START),
        0
    );

    const end = setMinutes(
        setHours(startOfDay(date), WORKING_HOURS_END),
        0
    );

    while (current < end) {
        const timestamp = current.getTime();

        slots.push({
            id: format(current, 'yyyy-MM-dd-HH-mm'),
            date: format(current, 'yyyy-MM-dd'),
            time: format(current, 'hh:mm a'),
            timestamp,
            isAvailable: !isPast(current),
        });

        current = addMinutes(current, SLOT_INTERVAL_MINUTES);
    }

    return slots;
};