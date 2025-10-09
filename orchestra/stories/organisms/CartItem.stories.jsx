import { useState } from 'react';
import CartItem from '@/components/cart/CartItem';

const meta = {
  title: 'Organisms/CartItem',
  component: CartItem,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    item: {
      description: 'カートアイテムデータ',
    },
    isSelected: {
      control: 'boolean',
      description: '選択状態',
    },
    onToggleSelect: {
      description: '選択切り替えコールバック',
    },
    onUpdateQuantity: {
      description: '数量更新コールバック',
    },
    onRemove: {
      description: '削除コールバック',
    },
  },
};

export default meta;

// サンプルカートアイテム
const sampleItem = {
  id: 'cart-001',
  name: 'ワイヤレスイヤホン プレミアムモデル',
  code: 'WH-1000XM5',
  price: 28000,
  image: 'https://placehold.co/400x400/e2e8f0/1e293b?text=Product',
  images: ['https://placehold.co/400x400/e2e8f0/1e293b?text=Product'],
  brand: 'TechBrand',
  category: '電化製品',
  stock: true,
  rating: 4.5,
  tags: ['人気'],
  quantity: 2,
};

// デフォルト（選択なし）
export const Default = {
  args: {
    item: sampleItem,
    isSelected: false,
    onToggleSelect: (id) => console.log('Toggle select:', id),
    onUpdateQuantity: (id, quantity) => console.log('Update quantity:', id, quantity),
    onRemove: (id) => console.log('Remove:', id),
  },
};

// 選択済み
export const Selected = {
  args: {
    item: sampleItem,
    isSelected: true,
    onToggleSelect: (id) => console.log('Toggle select:', id),
    onUpdateQuantity: (id, quantity) => console.log('Update quantity:', id, quantity),
    onRemove: (id) => console.log('Remove:', id),
  },
};

// 数量1
export const QuantityOne = {
  args: {
    item: { ...sampleItem, quantity: 1 },
    isSelected: false,
    onToggleSelect: (id) => console.log('Toggle select:', id),
    onUpdateQuantity: (id, quantity) => console.log('Update quantity:', id, quantity),
    onRemove: (id) => console.log('Remove:', id),
  },
};

// 数量多め
export const QuantityMany = {
  args: {
    item: { ...sampleItem, quantity: 15 },
    isSelected: false,
    onToggleSelect: (id) => console.log('Toggle select:', id),
    onUpdateQuantity: (id, quantity) => console.log('Update quantity:', id, quantity),
    onRemove: (id) => console.log('Remove:', id),
  },
};

// 高額商品
export const ExpensiveItem = {
  args: {
    item: {
      ...sampleItem,
      name: 'プロフェッショナルカメラ',
      price: 298000,
      quantity: 1,
    },
    isSelected: false,
    onToggleSelect: (id) => console.log('Toggle select:', id),
    onUpdateQuantity: (id, quantity) => console.log('Update quantity:', id, quantity),
    onRemove: (id) => console.log('Remove:', id),
  },
};

// 低額商品
export const CheapItem = {
  args: {
    item: {
      ...sampleItem,
      name: 'USB-Cケーブル',
      price: 980,
      quantity: 3,
    },
    isSelected: false,
    onToggleSelect: (id) => console.log('Toggle select:', id),
    onUpdateQuantity: (id, quantity) => console.log('Update quantity:', id, quantity),
    onRemove: (id) => console.log('Remove:', id),
  },
};

// 長い商品名
export const LongProductName = {
  args: {
    item: {
      ...sampleItem,
      name: 'プレミアムワイヤレスノイズキャンセリングヘッドホン 最新モデル 2024年版 ハイレゾ対応',
      quantity: 1,
    },
    isSelected: false,
    onToggleSelect: (id) => console.log('Toggle select:', id),
    onUpdateQuantity: (id, quantity) => console.log('Update quantity:', id, quantity),
    onRemove: (id) => console.log('Remove:', id),
  },
};

// インタラクティブ例
export const Interactive = {
  render: () => {
    const [item, setItem] = useState(sampleItem);
    const [isSelected, setIsSelected] = useState(false);

    const handleUpdateQuantity = (id, quantity) => {
      setItem((prev) => ({ ...prev, quantity }));
      console.log('Updated quantity:', quantity);
    };

    const handleRemove = (id) => {
      console.log('Removed item:', id);
      alert(`商品「${item.name}」を削除しました`);
    };

    return (
      <div className="max-w-3xl">
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">現在の状態</h3>
          <p className="text-sm">選択: {isSelected ? 'はい' : 'いいえ'}</p>
          <p className="text-sm">数量: {item.quantity}</p>
          <p className="text-sm">
            小計: ¥{(item.price * item.quantity).toLocaleString()}
          </p>
        </div>

        <CartItem
          item={item}
          isSelected={isSelected}
          onToggleSelect={() => setIsSelected(!isSelected)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
        />
      </div>
    );
  },
};

// カート画面例
export const CartPageExample = {
  render: () => {
    const [items, setItems] = useState([
      { ...sampleItem, id: 'cart-001', quantity: 2 },
      {
        ...sampleItem,
        id: 'cart-002',
        name: 'スマートウォッチ',
        price: 35000,
        quantity: 1,
      },
      {
        ...sampleItem,
        id: 'cart-003',
        name: 'モバイルバッテリー',
        price: 3200,
        quantity: 3,
      },
    ]);
    const [selectedIds, setSelectedIds] = useState(['cart-001']);

    const handleToggleSelect = (id) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    const handleUpdateQuantity = (id, quantity) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    };

    const handleRemove = (id) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    };

    const selectedItems = items.filter((item) => selectedIds.includes(item.id));
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">ショッピングカート</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* カートアイテムリスト */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={selectedIds.length === items.length}
                onChange={(e) =>
                  setSelectedIds(
                    e.target.checked ? items.map((i) => i.id) : []
                  )
                }
                className="w-5 h-5"
              />
              <span className="font-semibold">すべて選択</span>
            </div>

            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                isSelected={selectedIds.includes(item.id)}
                onToggleSelect={handleToggleSelect}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* 注文サマリー */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">注文サマリー</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>選択商品数</span>
                  <span>{selectedIds.length}件</span>
                </div>
                <div className="flex justify-between">
                  <span>小計</span>
                  <span>¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>送料</span>
                  <span>¥500</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">合計</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ¥{(subtotal + 500).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={selectedIds.length === 0}
              >
                レジに進む ({selectedIds.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// 複数アイテム
export const MultipleItems = {
  render: () => {
    const items = [
      { ...sampleItem, id: 'item-1', name: '商品A', price: 12800, quantity: 1 },
      { ...sampleItem, id: 'item-2', name: '商品B', price: 8900, quantity: 2 },
      { ...sampleItem, id: 'item-3', name: '商品C', price: 25000, quantity: 1 },
    ];

    return (
      <div className="max-w-3xl space-y-4">
        {items.map((item, index) => (
          <CartItem
            key={item.id}
            item={item}
            isSelected={index === 0}
            onToggleSelect={(id) => console.log('Toggle:', id)}
            onUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
            onRemove={(id) => console.log('Remove:', id)}
          />
        ))}
      </div>
    );
  },
};

// 選択状態の比較
export const SelectionStates = {
  render: () => (
    <div className="max-w-3xl space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">未選択</h3>
        <CartItem
          item={sampleItem}
          isSelected={false}
          onToggleSelect={(id) => console.log('Toggle:', id)}
          onUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
          onRemove={(id) => console.log('Remove:', id)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">選択済み</h3>
        <CartItem
          item={sampleItem}
          isSelected={true}
          onToggleSelect={(id) => console.log('Toggle:', id)}
          onUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
          onRemove={(id) => console.log('Remove:', id)}
        />
      </div>
    </div>
  ),
};

// 数量バリエーション
export const QuantityVariations = {
  render: () => (
    <div className="max-w-3xl space-y-4">
      {[1, 2, 5, 10, 20].map((quantity) => (
        <div key={quantity}>
          <h3 className="text-sm font-semibold mb-2">数量: {quantity}</h3>
          <CartItem
            item={{ ...sampleItem, quantity }}
            isSelected={false}
            onToggleSelect={(id) => console.log('Toggle:', id)}
            onUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
            onRemove={(id) => console.log('Remove:', id)}
          />
        </div>
      ))}
    </div>
  ),
};

// レスポンシブ表示
export const ResponsiveDemo = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">モバイル表示</h3>
        <div className="max-w-sm">
          <CartItem
            item={sampleItem}
            isSelected={false}
            onToggleSelect={(id) => console.log('Toggle:', id)}
            onUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
            onRemove={(id) => console.log('Remove:', id)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">デスクトップ表示</h3>
        <div className="max-w-3xl">
          <CartItem
            item={sampleItem}
            isSelected={false}
            onToggleSelect={(id) => console.log('Toggle:', id)}
            onUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
            onRemove={(id) => console.log('Remove:', id)}
          />
        </div>
      </div>
    </div>
  ),
};
