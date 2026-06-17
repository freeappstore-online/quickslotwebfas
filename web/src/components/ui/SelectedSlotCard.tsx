import Card from './Card';

interface SelectedSlotCardProps {
    date: string;
    time: string;
    label?: string;
}

export default function SelectedSlotCard({
    date,
    time,
    label = 'Selected Appointment',
}: SelectedSlotCardProps) {
    return (
        <Card variant="accent">
            <div
                style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '16px',
                }}
            >
                {label}
            </div>
            <div
                style={{
                    fontSize: '16px',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '12px',
                    fontWeight: 500,
                }}
            >
                {date}
            </div>
            <div
                style={{
                    fontSize: '48px',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                }}
            >
                {time}
            </div>
        </Card>
    );
}