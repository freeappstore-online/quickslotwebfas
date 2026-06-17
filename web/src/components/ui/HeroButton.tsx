import type { ReactNode } from 'react';

interface HeroButtonProps {
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    children: ReactNode;
    subtitle?: string;
}

export default function HeroButton({
    onClick,
    variant = 'primary',
    children,
    subtitle,
}: HeroButtonProps) {
    const isPrimary = variant === 'primary';

    return (
        <button
            onClick={onClick}
            style={{
                width: '100%',
                backgroundColor: isPrimary ? 'var(--color-card)' : 'var(--color-welcome-overlay)',
                color: isPrimary ? 'var(--color-primary)' : 'var(--color-text-white)',
                fontSize: isPrimary ? '18px' : '16px',
                fontWeight: isPrimary ? 700 : 600,
                padding: '20px',
                borderRadius: '20px',
                border: isPrimary ? 'none' : '2px solid var(--color-welcome-overlay-border)',
                cursor: 'pointer',
                boxShadow: isPrimary ? '0 10px 25px rgba(0, 0, 0, 0.15)' : 'none',
                transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
                if (isPrimary) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                } else {
                    e.currentTarget.style.opacity = '0.8';
                }
            }}
            onMouseLeave={(e) => {
                if (isPrimary) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                } else {
                    e.currentTarget.style.opacity = '1';
                }
            }}
        >
            <div>{children}</div>
            {subtitle && (
                <div
                    style={{
                        fontSize: '13px',
                        color: isPrimary ? 'var(--color-text-secondary)' : 'rgba(255, 255, 255, 0.7)',
                        marginTop: '4px',
                        fontWeight: 500,
                    }}
                >
                    {subtitle}
                </div>
            )}
        </button>
    );
}