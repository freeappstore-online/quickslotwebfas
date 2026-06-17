import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { applyTheme, type BrandColorKey, type ThemeMode } from '../constants/theme';

interface ThemeState {
    mode: ThemeMode;
    brand: BrandColorKey;
    hasHydrated: boolean;
    setMode: (mode: ThemeMode) => void;
    setBrand: (brand: BrandColorKey) => void;
    toggleMode: () => void;
    setHasHydrated: (state: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            mode: 'light',
            brand: 'ocean',
            hasHydrated: false,

            setHasHydrated: (state: boolean) => {
                set({ hasHydrated: state });
            },

            setMode: (mode: ThemeMode) => {
                applyTheme(get().brand, mode);
                set({ mode });
            },

            setBrand: (brand: BrandColorKey) => {
                applyTheme(brand, get().mode);
                set({ brand });
            },

            toggleMode: () => {
                const newMode = get().mode === 'light' ? 'dark' : 'light';
                applyTheme(get().brand, newMode);
                set({ mode: newMode });
            },
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyTheme(state.brand, state.mode);
                    state.setHasHydrated(true);
                }
            },
        }
    )
);