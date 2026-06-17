import type { ReactNode } from 'react';

interface HeroLayoutProps {
    children: ReactNode;
}

export default function HeroLayout({ children }: HeroLayoutProps) {
    return (
        <div
            style={{
                minHeight: '100svh',
                width: '100%',
                backgroundColor: 'var(--color-welcome-background)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                transition: 'background-color 0.3s',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '480px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                }}
            >
                {children}
            </div>
        </div>
    );
}