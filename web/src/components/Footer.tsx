interface FooterProps {
    variant?: 'default' | 'hero';
}

export default function Footer({ variant = 'default' }: FooterProps) {
    const isHero = variant === 'hero';

    return (
        <div
            style={{
                padding: '20px',
                textAlign: 'center',
                fontSize: '13px',
                color: isHero ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-text-muted)',
            }}
        >
            <a
                href="https://freeappstore.online"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
                Built for freeappstore.online
            </a>
        </div>
    );
}