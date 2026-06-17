import type { ReactNode } from 'react';

interface HeroCardProps {
    icon: string;
    title: string;
    subtitle: string;
    children?: ReactNode;
}

export default function HeroCard({ icon, title, subtitle, children }: HeroCardProps) {
    return (
        <div
            style={{
                backgroundColor: 'var(--color-welcome-overlay)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '48px 32px',
                border: '1px solid var(--color-welcome-overlay-border)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
            }}
        >
            {/* Icon */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '24px',
                }}
            >
                <div
                    style={{
                        width: '110px',
                        height: '110px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-welcome-overlay)',
                        border: '2px solid var(--color-welcome-overlay-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span style={{ fontSize: '60px' }}>{icon}</span>
                </div>
            </div>

            {/* Title */}
            <h1
                style={{
                    fontSize: '48px',
                    fontWeight: 800,
                    color: 'var(--color-text-white)',
                    margin: 0,
                    marginBottom: '16px',
                    letterSpacing: '0.5px',
                }}
            >
                {title}
            </h1>

            {/* Subtitle */}
            <p
                style={{
                    fontSize: '17px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                    margin: 0,
                    marginBottom: children ? '40px' : 0,
                }}
            >
                {subtitle}
            </p>

            {children}
        </div>
    );
}