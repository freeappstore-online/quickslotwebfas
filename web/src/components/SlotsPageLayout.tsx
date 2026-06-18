import type { ReactNode } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

interface SlotsPageLayoutProps {
    children: ReactNode;
}

export default function SlotsPageLayout({ children }: SlotsPageLayoutProps) {
    const isMobile = useIsMobile();

    // Mobile: full page scrolls
    if (isMobile) {
        return (
            <div
                style={{
                    minHeight: '100svh',
                    width: '100%',
                    backgroundColor: 'var(--color-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '40px 20px 0 20px',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        flex: 1,
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }

    // Desktop: fixed height, internal scroll
    return (
        <div
            style={{
                height: '100svh',
                width: '100%',
                backgroundColor: 'var(--color-bg)',
                display: 'flex',
                justifyContent: 'center',
                padding: '40px 20px 0 20px',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    height: '100%',
                }}
            >
                {children}
            </div>
        </div>
    );
}