import React from 'react';
import type { Decorator } from '@storybook/nextjs';

/**
 * Zustand Store Mock Decorator
 *
 * このDecoratorは、Zustandの状態管理をモックするために使用します。
 * Organisms層のコンポーネントで使用される useCartStore, useFavoritesStore, useAuthStore などをモックします。
 *
 * 使用方法:
 * ```typescript
 * const meta = {
 *   title: 'Organisms/ProductCard',
 *   component: ProductCard,
 *   decorators: [withMockStore],
 * } satisfies Meta<typeof ProductCard>;
 * ```
 */

interface MockStoreContext {
  args?: {
    mockCartItems?: any[];
    mockFavorites?: any[];
    mockAuthUser?: any;
  };
}

export const withMockStore: Decorator = (Story, context: MockStoreContext) => {
  // モックデータの取得
  const mockCartItems = context.args?.mockCartItems || [];
  const mockFavorites = context.args?.mockFavorites || [];
  const mockAuthUser = context.args?.mockAuthUser || null;

  // TODO: 実際のZustandストアが実装されたら、ここでモックストアを作成して注入する
  // 現在は、ストアがまだ実装されていないため、コンポーネント側でストアを使用していない前提で進める

  console.log('[StoreDecorator] Mock Store Initialized:', {
    cartItems: mockCartItems.length,
    favorites: mockFavorites.length,
    authUser: mockAuthUser ? 'logged in' : 'guest',
  });

  return <Story />;
};

/**
 * カスタムモックストアを作成するヘルパー関数
 *
 * 使用例:
 * ```typescript
 * export const WithCartItems: Story = {
 *   decorators: [
 *     createMockStoreDecorator({
 *       cartItems: [
 *         { id: 1, name: '商品A', quantity: 2 },
 *         { id: 2, name: '商品B', quantity: 1 },
 *       ],
 *     }),
 *   ],
 * };
 * ```
 */
export function createMockStoreDecorator(mockData: {
  cartItems?: any[];
  favorites?: any[];
  authUser?: any;
}): Decorator {
  return (Story) => {
    console.log('[CustomStoreDecorator] Mock Store Created:', mockData);

    // TODO: 実際のZustandストアが実装されたら、ここでカスタムモックストアを作成

    return <Story />;
  };
}
