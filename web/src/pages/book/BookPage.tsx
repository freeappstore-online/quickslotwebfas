import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { parse, format } from 'date-fns';
import { useBookingStore } from '../../store/bookingStore';
import { generateSlotsForDate } from '../../utils/slots';
import { validateBooking } from '../../utils/validations';
import type { TimeSlot } from '../../types/bookings';
import PageLayout from '../../components/PageLayout';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import ErrorMessage from '../../components/ui/ErrorMessage';
import EmptyState from '../../components/ui/EmptyState';
import SelectedSlotCard from '../../components/ui/SelectedSlotCard';

export default function BookPage() {
    const [searchParams] = useSearchParams();
    const slotId = searchParams.get('slotId');
    const navigate = useNavigate();

    const { addBooking, isSlotTaken } = useBookingStore();

    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    const slot = useMemo(() => {
        if (!slotId) return null;
        const parts = slotId.split('-');
        if (parts.length < 5) return null;

        const dateString = `${parts[0]}-${parts[1]}-${parts[2]}`;
        const slotDate = parse(dateString, 'yyyy-MM-dd', new Date());
        return generateSlotsForDate(slotDate).find((s) => s.id === slotId) || null;
    }, [slotId]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!slot) return;

        if (isSlotTaken(slot.id)) {
            setError('This slot is already booked');
            return;
        }

        const validation = validateBooking(name, reason, slot.timestamp);
        if (!validation.isValid) {
            setError(validation.error || 'Invalid input');
            return;
        }

        const success = addBooking({
            id: Date.now().toString(),
            slotId: slot.id,
            name: name.trim(),
            reason: reason.trim(),
            createdAt: Date.now(),
            slot: slot as TimeSlot,
        });

        if (!success) {
            setError('Could not create booking. Please try again.');
            return;
        }

        navigate('/my-bookings');
    };

    if (!slot) {
        return (
            <PageLayout maxWidth="md">
                <EmptyState
                    icon="⚠️"
                    title="Invalid Slot"
                    description="The selected slot is invalid or no longer available."
                    action={
                        <Button onClick={() => navigate('/slots')} size="lg" fullWidth>
                            Go Back to Slots
                        </Button>
                    }
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <PageHeader
                title="Book Appointment"
                subtitle="Fill in your details to confirm the booking"
                backTo="/slots"
                backLabel="← Slots"
            />

            <SelectedSlotCard
                date={format(new Date(slot.timestamp), 'EEEE, MMMM dd, yyyy')}
                time={slot.time}
            />

            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {error && <ErrorMessage message={error} />}

                <Card>
                    <Input
                        label="Your Name"
                        value={name}
                        onChange={setName}
                        placeholder="Enter your full name"
                        maxLength={50}
                        showCounter
                    />
                </Card>

                <Card>
                    <Textarea
                        label="Reason for Visit"
                        value={reason}
                        onChange={setReason}
                        placeholder="Briefly describe the reason for your appointment"
                        maxLength={200}
                        showCounter
                    />
                </Card>

                <Button type="submit" size="lg" fullWidth>
                    Confirm Booking
                </Button>
            </form>
        </PageLayout>
    );
}