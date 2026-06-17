import Badge from './Badge';

interface SlotCardProps {
    time: string;
    status: 'available' | 'booked' | 'past';
    onClick?: () => void;
}

export default function SlotCard({ time, status, onClick }: SlotCardProps) {
    const isDisabled = status !== 'available';

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className="rounded-2xl text-left transition-all w-full"
            style={{
                padding: '24px',
                backgroundColor: isDisabled ? 'var(--color-disabled)' : 'var(--color-card)',
                border: `2px solid ${isDisabled ? 'var(--color-border)' : 'var(--color-border)'}`,
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                display: 'block',
            }}
            onMouseEnter={(e) => {
                if (!isDisabled) {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }
            }}
            onMouseLeave={(e) => {
                if (!isDisabled) {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'none';
                }
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '16px',
                }}
            >
                <div
                    style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: isDisabled ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {time}
                </div>
                <Badge
                    size="sm"
                    variant={status === 'past' ? 'muted' : status === 'booked' ? 'danger' : 'primary'}
                >
                    {status === 'past' ? 'Past' : status === 'booked' ? 'Booked' : 'Available'}
                </Badge>
            </div>

            {!isDisabled && (
                <div
                    style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                    }}
                >
                    Click to book →
                </div>
            )}

            {status === 'booked' && (
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    This slot is unavailable
                </div>
            )}

            {status === 'past' && (
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    Time has passed
                </div>
            )}
        </button>
    );
}