import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'accent' | 'success' | 'danger' | 'expired';
}

export default function Card({ children, className = '', variant = 'default' }: CardProps) {
    const borderStyles: Record<string, React.CSSProperties> = {
        default: {
            border: '1px solid var(--color-border)',
        },
        accent: {
            borderLeft: '6px solid var(--color-primary)',
            borderRight: '1px solid var(--color-border)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
        },
        success: {
            borderLeft: '6px solid var(--color-success)',
            borderRight: '1px solid var(--color-border)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
        },
        danger: {
            borderLeft: '6px solid var(--color-danger)',
            borderRight: '1px solid var(--color-border)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
        },
        expired: {
            borderLeft: '6px solid var(--color-text-muted)',
            borderRight: '1px solid var(--color-border)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            opacity: 0.6,
        },
    };

    return (
        <div
            className={`rounded-3xl shadow-sm ${className}`}
            style={{
                backgroundColor: 'var(--color-card)',
                padding: '32px',
                ...borderStyles[variant],
            }}
        >
            {children}
        </div>
    );
}