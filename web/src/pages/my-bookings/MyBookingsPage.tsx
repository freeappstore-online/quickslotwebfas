import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/bookingStore';
import PageLayout from '../../components/PageLayout';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import BookingCard from '../../components/ui/BookingCard';

export default function MyBookingsPage() {
    const { bookings, cancelBooking } = useBookingStore();
    const navigate = useNavigate();

    const sortedBookings = [...bookings].sort((a, b) => a.slot.timestamp - b.slot.timestamp);
    const upcomingCount = bookings.filter((b) => b.slot.timestamp > Date.now()).length;

    const handleCancel = (id: string) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            cancelBooking(id);
        }
    };

    if (bookings.length === 0) {
        return (
            <PageLayout maxWidth="md">
                <EmptyState
                    icon="📭"
                    title="No Bookings Yet"
                    description="You haven't booked any appointments. Let's schedule one!"
                    action={
                        <Button onClick={() => navigate('/slots')} size="lg" fullWidth>
                            Book Now
                        </Button>
                    }
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <PageHeader
                title="My Bookings"
                subtitle="View and manage your appointments"
                backTo="/"
                backLabel="← Home"
                rightContent={<Badge variant="primary">{upcomingCount} upcoming</Badge>}
            />

            {sortedBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onCancel={handleCancel} />
            ))}
        </PageLayout>
    );
}