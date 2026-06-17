import { useState, useRef, useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';
import { BRAND_COLORS, type BrandColorKey } from '../constants/theme';

export default function ThemeSwitcher() {
    const { mode, brand, toggleMode, setBrand } = useThemeStore();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            ref={dropdownRef}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                display: 'flex',
                gap: '8px',
            }}
        >
            {/* Theme Mode Toggle */}
            <button
                onClick={toggleMode}
                title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-card)',
                    border: '2px solid var(--color-border)',
                    cursor: 'pointer',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
                {mode === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Color Theme Selector */}
            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    title="Change color theme"
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: BRAND_COLORS[brand].primary,
                        border: '2px solid var(--color-border)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                    <span style={{ fontSize: '20px' }}>🎨</span>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '60px',
                            right: 0,
                            backgroundColor: 'var(--color-card)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '16px',
                            padding: '12px',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                            minWidth: '220px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                color: 'var(--color-text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                padding: '8px 12px',
                            }}
                        >
                            Color Theme
                        </div>

                        {(Object.keys(BRAND_COLORS) as BrandColorKey[]).map((key) => {
                            const themeColor = BRAND_COLORS[key];
                            const isSelected = brand === key;

                            return (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setBrand(key);
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '10px 12px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: isSelected ? 'var(--color-bg)' : 'transparent',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'background-color 0.15s',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: themeColor.primary,
                                            border: '2px solid var(--color-card)',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: isSelected ? 700 : 500,
                                            color: 'var(--color-text-primary)',
                                            flex: 1,
                                        }}
                                    >
                                        {themeColor.name}
                                    </span>
                                    {isSelected && (
                                        <span style={{ color: 'var(--color-primary)', fontSize: '16px' }}>✓</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}