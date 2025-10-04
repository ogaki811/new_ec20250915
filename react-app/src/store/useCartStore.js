import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],

      // Actions
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: product.quantity || 1 }],
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Computed values
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      getShippingFee: () => {
        const total = get().getTotal();
        return total >= 3000 ? 0 : 500;
      },

      getGrandTotal: () => {
        return get().getTotal() + get().getShippingFee();
      },
    }),
    {
      name: 'cart-storage', // LocalStorage key
    }
  )
);

export default useCartStore;
