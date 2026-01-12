// This file defines a Zustand-based store to manage a shopping cart's state in a React (Next.js) application.
// It uses Zustand's vanilla store API and persists cart "items" using middleware, while keeping UI state (isOpen) out of persistence.
// The store and its types allow for adding/removing items, updating their quantity, clearing the cart, and managing UI open/close state.

import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

// --- Type Definitions ---

// Each cart item holds product and quantity info, and can have an optional image.
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// The state for the cart includes an array of items and UI state (isOpen).
export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// CartActions are the "commands" you can run: modify items, toggle UI, etc.
export interface CartActions {
  // Adds an item by product info (without quantity), allowing optional quantity (defaults to 1).
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  // Removes items via productId.
  removeItem: (productId: string) => void;
  // Sets an item's quantity; if quantity <= 0, removes that item.
  updateQuantity: (productId: string, quantity: number) => void;
  // Clears out all cart items.
  clearCart: () => void;
  // Flips UI open/close state.
  toggleCart: () => void;
  // Forces open/close state.
  openCart: () => void;
  closeCart: () => void;
}

// The complete type of our Zustand cart store.
export type CartStore = CartState & CartActions;

// --- Defaults ---

// The initial, default state for a new cart.
export const defaultInitState: CartState = {
  items: [],
  isOpen: false,
};

/**
 * Store Factory Function
 *
 * - Creates a Zustand store for cart state and actions.
 * - Uses persist middleware:
 *     - Saves "items" to e.g. localStorage, *not* UI state.
 *     - skipHydration is set for SSR/Next.js compatibility.
 * - Returns a vanilla Zustand store instance.
 */
export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set) => ({
        ...initState, // start with provided (or default) state

        // Add item: If it already exists, increase quantity. Otherwise, append as new.
        addItem: (item, quantity = 1) =>
          set((state) => {
            const existing = state.items.find(
              (i) => i.productId === item.productId
            );
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.productId === item.productId
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
                ),
              };
            }
            // Not previously in cart, so append.
            return { items: [...state.items, { ...item, quantity }] };
          }),

        // Remove item by productId
        removeItem: (productId) =>
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          })),

        // Set quantity; if <= 0, remove item.
        updateQuantity: (productId, quantity) =>
          set((state) => {
            if (quantity <= 0) {
              return {
                items: state.items.filter((i) => i.productId !== productId),
              };
            }
            return {
              items: state.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
              ),
            };
          }),

        // Removes all items, keeps cart open/closed as-is
        clearCart: () => set({ items: [] }),
        // Flip open/closed
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
        // Only set UI state, does not affect cart contents
        openCart: () => set({ isOpen: true }),
        closeCart: () => set({ isOpen: false }),
      }),
      {
        name: "cart-storage",
        // Hydration is skipped for SSR (Next.js)
        skipHydration: true,
        // Persist *only* items array, so UI state is ephemeral
        partialize: (state) => ({ items: state.items }),
      }
    )
  );
};
