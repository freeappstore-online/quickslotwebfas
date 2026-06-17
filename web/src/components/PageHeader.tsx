import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import Card from './ui/Card';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backTo?: string;
    backLabel?: string;
    rightContent?: ReactNode;
}

export default function PageHeader({
    title,
    subtitle,
    backTo,
    backLabel = '← Back',
    rightContent,
}: PageHeaderProps) {
    const navigate = useNavigate();

    return (
        <Card>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: subtitle ? '12px' : 0,
                }}
            >
                {/* Left: Back button */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    {backTo && (
                        <button
                            onClick={() => navigate(backTo)}
                            className="cursor-pointer"
                            style={{
                                color: 'var(--color-primary)',
                                fontSize: '15px',
                                fontWeight: 600,
                                background: 'none',
                                border: 'none',
                                padding: 0,
                            }}
                        >
                            {backLabel}
                        </button>
                    )}
                </div>

                {/* Center: Title */}
                <h1
                    style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        margin: 0,
                        textAlign: 'center',
                        flex: 'none',
                    }}
                >
                    {title}
                </h1>

                {/* Right: Content or spacer */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    {rightContent}
                </div>
            </div>

            {subtitle && (
                <p
                    style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '15px',
                        margin: 0,
                        textAlign: 'center',
                    }}
                >
                    {subtitle}
                </p>
            )}
        </Card>
    );
}