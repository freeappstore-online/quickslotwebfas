import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/bookingStore';
import { generateSlotsForDate } from '../../utils/slots';
import type { TimeSlot } from '../../types/bookings';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SlotCard from '../../components/ui/SlotCard';
import DatePicker from '../../components/ui/DatePicker';
import ScrollableCard from '../../components/ui/ScrollableCard';
import SectionHeader from '../../components/ui/SectionHeader';

export default function SlotsPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const { isSlotTaken, bookings } = useBookingStore();

    const slotsWithStatus = useMemo(() => {
        const slots = generateSlotsForDate(selectedDate);
        return slots.map((slot) => ({ ...slot, isBooked: isSlotTaken(slot.id) }));
    }, [selectedDate, bookings, isSlotTaken]);

    const availableCount = slotsWithStatus.filter((s) => s.isAvailable && !s.isBooked).length;

    const handleSlotClick = (slot: TimeSlot & { isBooked: boolean }) => {
        if (slot.isBooked || !slot.isAvailable) return;
        navigate(`/book?slotId=${slot.id}`);
    };

    const getSlotStatus = (slot: TimeSlot & { isBooked: boolean }): 'available' | 'booked' | 'past' => {
        if (!slot.isAvailable) return 'past';
        if (slot.isBooked) return 'booked';
        return 'available';
    };

    return (
        <div
            style={{
                height: '100svh',
                width: '100%',
                backgroundColor: 'var(--color-bg)',
                display: 'flex',
                justifyContent: 'center',
                padding: '40px 20px',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    height: '100%',
                }}
            >
                <div style={{ flexShrink: 0 }}>
                    <PageHeader
                        title="Available Slots"
                        subtitle="Choose a date and select your preferred time slot"
                        backTo="/"
                        backLabel="← Home"
                    />
                </div>

                <div style={{ flexShrink: 0 }}>
                    <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
                </div>

                <div style={{ flex: 1, minHeight: 0 }}>
                    <ScrollableCard
                        header={
                            <SectionHeader
                                title="Time Slots"
                                subtitle="30-minute intervals"
                                rightContent={<Badge variant="success">{availableCount} available</Badge>}
                            />
                        }
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '16px',
                                paddingBottom: '8px',
                            }}
                        >
                            {slotsWithStatus.map((slot) => (
                                <SlotCard
                                    key={slot.id}
                                    time={slot.time}
                                    status={getSlotStatus(slot)}
                                    onClick={() => handleSlotClick(slot)}
                                />
                            ))}
                        </div>
                    </ScrollableCard>
                </div>

                <div style={{ flexShrink: 0 }}>
                    <Button onClick={() => navigate('/my-bookings')} size="lg" fullWidth>
                        View My Bookings
                    </Button>
                </div>
            </div>
        </div>
    );
}