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
import Footer from '../../components/Footer';
import ResponsiveGrid from '../../components/ResponsiveGrid';
import SlotsPageLayout from '../../components/SlotsPageLayout';

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

    const getSlotStatus = (
        slot: TimeSlot & { isBooked: boolean }
    ): 'available' | 'booked' | 'past' => {
        if (!slot.isAvailable) return 'past';
        if (slot.isBooked) return 'booked';
        return 'available';
    };

    return (
        <SlotsPageLayout>
            <PageHeader
                title="Available Slots"
                subtitle="Choose a date and select your preferred time slot"
                backTo="/"
                backLabel="← Home"
            />

            <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />

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
                    <ResponsiveGrid>
                        {slotsWithStatus.map((slot) => (
                            <SlotCard
                                key={slot.id}
                                time={slot.time}
                                status={getSlotStatus(slot)}
                                onClick={() => handleSlotClick(slot)}
                            />
                        ))}
                    </ResponsiveGrid>
                </ScrollableCard>
            </div>

            <Button onClick={() => navigate('/my-bookings')} size="lg" fullWidth>
                View My Bookings
            </Button>

            <Footer />
        </SlotsPageLayout>
    );
}