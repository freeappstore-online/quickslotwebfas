import type { ReactNode } from 'react';
import Card from './Card';

interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <Card>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '80px', marginBottom: '24px' }}>{icon}</div>
                <h2
                    style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        marginBottom: '16px',
                        margin: 0,
                    }}
                >
                    {title}
                </h2>
                <p
                    style={{
                        color: 'var(--color-text-secondary)',
                        margin: '16px 0 32px 0',
                        fontSize: '16px',
                        lineHeight: 1.6,
                    }}
                >
                    {description}
                </p>
                {action}
            </div>
        </Card>
    );
}