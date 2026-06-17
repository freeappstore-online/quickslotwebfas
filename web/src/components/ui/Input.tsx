interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    showCounter?: boolean;
    type?: 'text' | 'email';
}

export default function Input({
    label,
    value,
    onChange,
    placeholder,
    maxLength,
    showCounter = false,
    type = 'text',
}: InputProps) {
    return (
        <div>
            <label
                style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: '12px',
                }}
            >
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                style={{
                    width: '100%',
                    background: 'transparent',
                    border: '2px solid var(--color-border)',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    color: 'var(--color-text-primary)',
                    fontSize: '16px',
                    outline: 'none',
                    fontFamily: 'inherit',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
            />
            {showCounter && maxLength && (
                <p
                    style={{
                        fontSize: '13px',
                        color: 'var(--color-text-muted)',
                        textAlign: 'right',
                        marginTop: '12px',
                    }}
                >
                    {value.length}/{maxLength}
                </p>
            )}
        </div>
    );
}