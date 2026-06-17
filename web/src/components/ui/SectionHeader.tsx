import type { ReactNode } from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    rightContent?: ReactNode;
}

export default function SectionHeader({ title, subtitle, rightContent }: SectionHeaderProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
            }}
        >
            <div>
                <h2
                    style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        margin: 0,
                        marginBottom: subtitle ? '4px' : 0,
                    }}
                >
                    {title}
                </h2>
                {subtitle && (
                    <p
                        style={{
                            fontSize: '14px',
                            color: 'var(--color-text-secondary)',
                            margin: 0,
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
            {rightContent}
        </div>
    );
}