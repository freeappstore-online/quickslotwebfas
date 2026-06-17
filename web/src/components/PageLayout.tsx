import type { ReactNode } from 'react';
import Footer from './Footer';

interface PageLayoutProps {
    children: ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | '2xl' | '3xl';
    showFooter?: boolean;
}

export default function PageLayout({
    children,
    maxWidth = '2xl',
    showFooter = true,
}: PageLayoutProps) {
    const widths: Record<string, string> = {
        sm: '400px',
        md: '500px',
        lg: '600px',
        '2xl': '700px',
        '3xl': '800px',
    };

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
                    maxWidth: widths[maxWidth],
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    flex: 1,
                }}
            >
                {children}
            </div>

            {showFooter && (
                <div style={{ width: '100%', maxWidth: widths[maxWidth] }}>
                    <Footer />
                </div>
            )}
        </div>
    );
}