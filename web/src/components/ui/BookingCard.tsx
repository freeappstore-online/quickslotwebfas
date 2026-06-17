import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import type { Booking } from '../../types/bookings';

interface BookingCardProps {
    booking: Booking;
    onCancel: (id: string) => void;
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
    const isExpired = Date.now() > booking.slot.timestamp;

    return (
        <Card variant={isExpired ? 'expired' : 'success'}>
            {/* Top Row */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}
            >
                <div
                    style={{
                        fontSize: '40px',
                        fontWeight: 800,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1,
                    }}
                >
                    {booking.slot.time}
                </div>
                <Badge variant={isExpired ? 'danger' : 'success'}>
                    {isExpired ? 'Expired' : 'Upcoming'}
                </Badge>
            </div>

            {/* Date */}
            <div
                style={{
                    fontSize: '16px',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '24px',
                    fontWeight: 500,
                }}
            >
                {booking.slot.date}
            </div>

            {/* Details */}
            <div
                style={{
                    backgroundColor: 'var(--color-bg)',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid var(--color-border)',
                    marginBottom: '24px',
                }}
            >
                <div
                    style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '8px',
                    }}
                >
                    Booked by
                </div>
                <div
                    style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        marginBottom: '20px',
                    }}
                >
                    {booking.name}
                </div>
                <div
                    style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '8px',
                    }}
                >
                    Reason
                </div>
                <div
                    style={{
                        fontSize: '16px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.6,
                    }}
                >
                    {booking.reason}
                </div>
            </div>

            {/* Cancel button */}
            {!isExpired && (
                <Button onClick={() => onCancel(booking.id)} variant="danger" size="lg" fullWidth>
                    Cancel Appointment
                </Button>
            )}
        </Card>
    );
}