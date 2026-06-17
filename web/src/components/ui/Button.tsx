import type { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
}

export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'lg',
    fullWidth = false,
    disabled = false,
    className = '',
}: ButtonProps) {
    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            backgroundColor: 'var(--color-primary)',
            color: 'white',
        },
        secondary: {
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
        },
        danger: {
            backgroundColor: 'var(--color-danger-light)',
            color: 'var(--color-danger)',
            border: '2px solid var(--color-danger)',
        },
        success: {
            backgroundColor: 'var(--color-success-light)',
            color: 'var(--color-success)',
        },
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
        sm: { padding: '10px 20px', fontSize: '14px', borderRadius: '12px' },
        md: { padding: '14px 24px', fontSize: '16px', borderRadius: '16px' },
        lg: { padding: '20px 28px', fontSize: '17px', borderRadius: '20px' },
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`font-bold transition-all ${className}`}
            style={{
                ...variantStyles[variant],
                ...sizeStyles[size],
                width: fullWidth ? '100%' : 'auto',
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.currentTarget.style.opacity = '0.9';
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled) {
                    e.currentTarget.style.opacity = '1';
                }
            }}
        >
            {children}
        </button>
    );
}