import type { ReactNode } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

interface ResponsiveGridProps {
    children: ReactNode;
    minItemWidth?: string;
    gap?: string;
}

export default function ResponsiveGrid({
    children,
    minItemWidth = '220px',
    gap = '16px',
}: ResponsiveGridProps) {
    const isMobile = useIsMobile();

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
                gap,
                paddingBottom: '8px',
            }}
        >
            {children}
        </div>
    );
}