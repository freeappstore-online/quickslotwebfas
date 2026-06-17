import type { ReactNode } from 'react';

interface ScrollableCardProps {
    header: ReactNode;
    children: ReactNode;
}

export default function ScrollableCard({ header, children }: ScrollableCardProps) {
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
            {/* Header - Fixed with padding */}
            <div
                style={{
                    padding: '32px 32px 0 32px',
                    flexShrink: 0,
                }}
            >
                {header}
            </div>

            {/* Scrollable Content */}
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