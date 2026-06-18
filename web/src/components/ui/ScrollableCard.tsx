import type { ReactNode } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

interface ScrollableCardProps {
    header: ReactNode;
    children: ReactNode;
}

export default function ScrollableCard({ header, children }: ScrollableCardProps) {
    const isMobile = useIsMobile();

    // On mobile: render as regular card (no internal scroll, page scrolls)
    if (isMobile) {
        return (
            <div
                style={{
                    backgroundColor: 'var(--color-card)',
                    borderRadius: '24px',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    padding: '32px',
                }}
            >
                <div style={{ marginBottom: '24px' }}>{header}</div>
                <div>{children}</div>
            </div>
        );
    }

    // On desktop: scrollable with fixed header
    return (
        <div
            style={{
                backgroundColor: 'var(--color-card)',
                borderRadius: '24px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    padding: '32px 32px 0 32px',
                    flexShrink: 0,
                }}
            >
                {header}
            </div>

            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '8px 32px 32px 32px',
                }}
            >
                {children}
            </div>
        </div>
    );
}