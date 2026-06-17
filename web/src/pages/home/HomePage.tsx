import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/bookingStore';
import HeroLayout from '../../components/ui/HeroLayout';
import HeroCard from '../../components/ui/HeroCard';
import HeroButton from '../../components/ui/HeroButton';
import FeatureGrid from '../../components/ui/FeatureGrid';
import Footer from '../../components/Footer';

const FEATURES = [
    { icon: '⚡', label: 'Quick Booking' },
    { icon: '🕐', label: '30 Min Slots' },
    { icon: '✅', label: 'Easy Cancel' },
];

export default function HomePage() {
    const navigate = useNavigate();
    const bookings = useBookingStore((state) => state.bookings);
    const hasHydrated = useBookingStore((state) => state.hasHydrated);

    const activeBookings = hasHydrated
        ? bookings.filter((b) => b.slot.timestamp > Date.now()).length
        : 0;

    return (
        <HeroLayout>
            <HeroCard
                icon="📅"
                title="QuickSlot"
                subtitle="Book your appointments quickly and easily. No hassle, no waiting."
            >
                <FeatureGrid features={FEATURES} />
            </HeroCard>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <HeroButton onClick={() => navigate('/slots')} variant="primary">
                    Book an Appointment
                </HeroButton>

                <HeroButton
                    onClick={() => navigate('/my-bookings')}
                    variant="secondary"
                    subtitle={
                        activeBookings > 0
                            ? `${activeBookings} upcoming appointment${activeBookings !== 1 ? 's' : ''}`
                            : undefined
                    }
                >
                    My Bookings{activeBookings > 0 ? ` (${activeBookings})` : ''}
                </HeroButton>
            </div>

            <Footer variant="hero" />
        </HeroLayout>
    );
}