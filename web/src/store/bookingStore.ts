import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Booking } from '../types/bookings';

interface BookingState {
    bookings: Booking[];
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    addBooking: (booking: Booking) => boolean;
    cancelBooking: (id: string) => void;
    isSlotTaken: (slotId: string) => boolean;
    clearAllBookings: () => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            bookings: [],
            hasHydrated: false,

            setHasHydrated: (state: boolean) => {
                set({ hasHydrated: state });
            },

            addBooking: (booking: Booking): boolean => {
                if (get().isSlotTaken(booking.slotId)) {
                    return false;
                }
                if (Date.now() > booking.slot.timestamp) {
                    return false;
                }
                set((state) => ({
                    bookings: [...state.bookings, booking],
                }));
                return true;
            },

            cancelBooking: (id: string): void => {
                set((state) => ({
                    bookings: state.bookings.filter((b) => b.id !== id),
                }));
            },

            isSlotTaken: (slotId: string): boolean => {
                return get().bookings.some((b) => b.slotId === slotId);
            },

            clearAllBookings: (): void => {
                set({ bookings: [] });
            },
        }),
        {
            name: 'booking-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);