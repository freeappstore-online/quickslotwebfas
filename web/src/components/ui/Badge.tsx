import type { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'primary' | 'success' | 'danger' | 'muted';
    size?: 'sm' | 'md';
}

export default function Badge({ children, variant = 'primary', size = 'md' }: BadgeProps) {
    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
        },
        success: {
            backgroundColor: 'var(--color-success-light)',
            color: 'var(--color-success)',
        },
        danger: {
            backgroundColor: 'var(--color-danger-light)',
            color: 'var(--color-danger)',
        },
        muted: {
            backgroundColor: 'var(--color-disabled)',
            color: 'var(--color-text-muted)',
        },
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
        sm: { padding: '4px 12px', fontSize: '12px' },
        md: { padding: '8px 16px', fontSize: '14px' },
    };

    return (
        <span
            className="font-bold"
            style={{
                ...variantStyles[variant],
                ...sizeStyles[size],
                borderRadius: '999px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
            }}
        >
            {children}
        </span>
    );
}