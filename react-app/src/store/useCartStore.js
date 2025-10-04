import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      selectedItems: [], // 選択された商品IDの配列
      recentlyDeleted: [], // 最近削除された商品（復元用）
      appliedCoupon: null, // 適用中のクーポン

      // Actions
      addItem: (product) => {
        const { items, selectedItems } = get();
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
            selectedItems: [...selectedItems, product.id], // 新規追加時は自動選択
          });
        }
      },

      removeItem: (productId) => {
        const { items, selectedItems } = get();
        const itemToRemove = items.find((item) => item.id === productId);

        if (itemToRemove) {
          // 最近削除リストに追加（復元用）
          set({
            recentlyDeleted: [
              { ...itemToRemove, deletedAt: Date.now() },
              ...get().recentlyDeleted.slice(0, 4) // 最大5件まで保持
            ]
          });
        }

        set({
          items: items.filter((item) => item.id !== productId),
          selectedItems: selectedItems.filter((id) => id !== productId),
        });
      },

      removeSelectedItems: () => {
        const { items, selectedItems } = get();
        const itemsToRemove = items.filter((item) => selectedItems.includes(item.id));

        // 削除される商品を最近削除リストに追加
        if (itemsToRemove.length > 0) {
          set({
            recentlyDeleted: [
              ...itemsToRemove.map(item => ({ ...item, deletedAt: Date.now() })),
              ...get().recentlyDeleted
            ].slice(0, 5)
          });
        }

        set({
          items: items.filter((item) => !selectedItems.includes(item.id)),
          selectedItems: [],
        });
      },

      restoreItem: (item) => {
        const { items, recentlyDeleted } = get();
        set({
          items: [...items, { ...item, deletedAt: undefined }],
          selectedItems: [...get().selectedItems, item.id],
          recentlyDeleted: recentlyDeleted.filter((deleted) => deleted.id !== item.id),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const item = get().items.find((item) => item.id === productId);

        // 在庫チェック
        if (item && item.stock !== undefined && quantity > item.stock) {
          return {
            success: false,
            message: `在庫が不足しています（在庫数: ${item.stock}個）`,
            maxQuantity: item.stock
          };
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });

        return { success: true };
      },

      clearCart: () => {
        set({ items: [], selectedItems: [], recentlyDeleted: [], appliedCoupon: null });
      },

      // クーポン関連
      applyCoupon: (coupon) => {
        const total = get().getTotal();

        // クーポンの利用条件チェック
        if (coupon.minPurchase && total < coupon.minPurchase) {
          return {
            success: false,
            message: `このクーポンは¥${coupon.minPurchase.toLocaleString()}以上のお買い物で利用できます`
          };
        }

        set({ appliedCoupon: coupon });
        return {
          success: true,
          message: `クーポン「${coupon.code}」を適用しました`
        };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      },

      // 商品選択関連
      toggleSelectItem: (productId) => {
        const { selectedItems } = get();
        if (selectedItems.includes(productId)) {
          set({ selectedItems: selectedItems.filter((id) => id !== productId) });
        } else {
          set({ selectedItems: [...selectedItems, productId] });
        }
      },

      selectAllItems: () => {
        const { items } = get();
        set({ selectedItems: items.map((item) => item.id) });
      },

      deselectAllItems: () => {
        set({ selectedItems: [] });
      },

      toggleSelectAll: () => {
        const { items, selectedItems } = get();
        if (selectedItems.length === items.length) {
          get().deselectAllItems();
        } else {
          get().selectAllItems();
        }
      },

      // Computed values
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getSelectedTotal: () => {
        const { items, selectedItems } = get();
        return items
          .filter((item) => selectedItems.includes(item.id))
          .reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      getSelectedItemCount: () => {
        const { items, selectedItems } = get();
        return items
          .filter((item) => selectedItems.includes(item.id))
          .reduce((count, item) => count + item.quantity, 0);
      },

      getShippingFee: () => {
        const total = get().getTotal();
        return total >= 3000 ? 0 : 500;
      },

      getSelectedShippingFee: () => {
        const total = get().getSelectedTotal();
        return total >= 3000 ? 0 : 500;
      },

      getGrandTotal: () => {
        return get().getTotal() + get().getShippingFee();
      },

      getSelectedGrandTotal: () => {
        return get().getSelectedTotal() + get().getSelectedShippingFee();
      },

      isAllSelected: () => {
        const { items, selectedItems } = get();
        return items.length > 0 && items.length === selectedItems.length;
      },

      // クーポン割引額の計算
      getCouponDiscount: () => {
        const { appliedCoupon } = get();
        if (!appliedCoupon) return 0;

        const subtotal = get().getTotal();

        if (appliedCoupon.type === 'percentage') {
          // パーセンテージ割引
          const discount = Math.floor(subtotal * (appliedCoupon.value / 100));
          return appliedCoupon.maxDiscount
            ? Math.min(discount, appliedCoupon.maxDiscount)
            : discount;
        } else if (appliedCoupon.type === 'fixed') {
          // 固定額割引
          return Math.min(appliedCoupon.value, subtotal);
        } else if (appliedCoupon.type === 'shipping') {
          // 送料無料
          return get().getShippingFee();
        }

        return 0;
      },

      // 最終合計（クーポン適用後）
      getFinalTotal: () => {
        const subtotal = get().getTotal();
        const shipping = get().getShippingFee();
        const discount = get().getCouponDiscount();

        const { appliedCoupon } = get();
        if (appliedCoupon && appliedCoupon.type === 'shipping') {
          // 送料無料クーポンの場合
          return subtotal;
        }

        return Math.max(0, subtotal + shipping - discount);
      },

      // 在庫チェック関連
      hasOutOfStockItems: () => {
        const { items } = get();
        return items.some((item) => item.stock !== undefined && item.quantity > item.stock);
      },

      hasLowStockItems: () => {
        const { items } = get();
        return items.some((item) => item.stock !== undefined && item.stock > 0 && item.stock < item.quantity);
      },

      getOutOfStockItems: () => {
        const { items } = get();
        return items.filter((item) => item.stock !== undefined && item.quantity > item.stock);
      },

      canCheckout: () => {
        const { items } = get();
        if (items.length === 0) return false;
        if (get().hasOutOfStockItems()) return false;
        return true;
      },
    }),
    {
      name: 'cart-storage', // LocalStorage key
    }
  )
);

export default useCartStore;
