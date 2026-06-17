interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div
            style={{
                backgroundColor: 'var(--color-danger-light)',
                border: '2px solid var(--color-danger)',
                color: 'var(--color-danger)',
                padding: '20px 24px',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: 600,
            }}
        >
            {message}
        </div>
    );
}