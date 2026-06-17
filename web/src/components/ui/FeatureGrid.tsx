interface Feature {
    icon: string;
    label: string;
}

interface FeatureGridProps {
    features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${features.length}, 1fr)`,
                gap: '16px',
            }}
        >
            {features.map((feature) => (
                <FeatureItem key={feature.label} icon={feature.icon} label={feature.label} />
            ))}
        </div>
    );
}

function FeatureItem({ icon, label }: Feature) {
    return (
        <div
            style={{
                backgroundColor: 'var(--color-welcome-overlay)',
                border: '1px solid var(--color-welcome-overlay-border)',
                borderRadius: '16px',
                padding: '16px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
            }}
        >
            <div
                style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-welcome-overlay)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <span style={{ fontSize: '22px' }}>{icon}</span>
            </div>
            <div
                style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'center',
                }}
            >
                {label}
            </div>
        </div>
    );
}