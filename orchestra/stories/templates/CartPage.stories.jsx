import { useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import StepIndicator from '@/components/common/StepIndicator';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import ProductSlider from '@/components/home/ProductSlider';

const meta = {
  title: 'Templates/CartPage',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

// サンプルカートアイテム
const sampleCartItems = [
  {
    id: 'cart-001',
    name: 'ワイヤレスイヤホン プレミアムモデル',
    code: 'WH-1000XM5',
    price: 28000,
    image: 'https://placehold.co/400x400/e2e8f0/1e293b?text=Product+1',
    images: ['https://placehold.co/400x400/e2e8f0/1e293b?text=Product+1'],
    brand: 'TechBrand',
    category: '電化製品',
    stock: true,
    rating: 4.5,
    tags: ['人気'],
    quantity: 2,
  },
  {
    id: 'cart-002',
    name: 'スマートウォッチ',
    code: 'SW-500',
    price: 35000,
    image: 'https://placehold.co/400x400/e2e8f0/1e293b?text=Product+2',
    images: ['https://placehold.co/400x400/e2e8f0/1e293b?text=Product+2'],
    brand: 'TechBrand',
    category: '電化製品',
    stock: true,
    rating: 4.3,
    tags: [],
    quantity: 1,
  },
  {
    id: 'cart-003',
    name: 'モバイルバッテリー',
    code: 'MB-10000',
    price: 3200,
    image: 'https://placehold.co/400x400/e2e8f0/1e293b?text=Product+3',
    images: ['https://placehold.co/400x400/e2e8f0/1e293b?text=Product+3'],
    brand: 'TechBrand',
    category: '電化製品',
    stock: true,
    rating: 4.2,
    tags: [],
    quantity: 3,
  },
];

// おすすめ商品
const recommendedProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `rec-${i + 1}`,
  name: `おすすめ商品${i + 1}`,
  code: `REC-${String(i + 1).padStart(3, '0')}`,
  price: Math.floor(Math.random() * 30000) + 3000,
  image: `https://placehold.co/400x400/e2e8f0/1e293b?text=Rec+${i + 1}`,
  images: [`https://placehold.co/400x400/e2e8f0/1e293b?text=Rec+${i + 1}`],
  brand: 'TechBrand',
  category: '電化製品',
  stock: true,
  rating: 4.0 + Math.random(),
  tags: i % 2 === 0 ? ['人気'] : [],
}));

// デフォルトのカートページ（アイテムあり）
export const Default = {
  render: () => {
    const [items, setItems] = useState(sampleCartItems);
    const [selectedIds, setSelectedIds] = useState(['cart-001', 'cart-002']);

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
    const shippingFee = subtotal >= 10000 ? 0 : 500;
    const total = subtotal + shippingFee;

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={1} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">ショッピングカート</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  {selectedIds.length > 0 && (
                    <button className="ml-auto text-sm text-red-600 hover:text-red-700">
                      選択した商品を削除 ({selectedIds.length})
                    </button>
                  )}
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

              {/* サマリー */}
              <div className="lg:col-span-1">
                <CartSummary
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  total={total}
                  itemCount={selectedIds.length}
                  onCheckout={() => console.log('Proceed to checkout')}
                  disabled={selectedIds.length === 0}
                />
              </div>
            </div>

            {/* おすすめ商品 */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">こちらもおすすめ</h2>
              <ProductSlider products={recommendedProducts} />
            </section>
          </div>
        </main>
      </div>
    );
  },
};

// 空のカート
export const Empty = {
  render: () => (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <Breadcrumb />
        <StepIndicator currentStep={1} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">ショッピングカート</h1>

          <EmptyCart />

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">おすすめ商品</h2>
            <ProductSlider products={recommendedProducts} />
          </section>
        </div>
      </main>
    </div>
  ),
};

// 1商品のみ
export const SingleItem = {
  render: () => {
    const [items, setItems] = useState([sampleCartItems[0]]);
    const [selectedIds, setSelectedIds] = useState(['cart-001']);

    const item = items[0];
    const subtotal = item.price * item.quantity;
    const shippingFee = 500;
    const total = subtotal + shippingFee;

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={1} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">ショッピングカート</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <input type="checkbox" checked className="w-5 h-5" readOnly />
                  <span className="font-semibold">すべて選択</span>
                </div>

                <CartItem
                  item={item}
                  isSelected={true}
                  onToggleSelect={() => {}}
                  onUpdateQuantity={(id, quantity) =>
                    setItems([{ ...item, quantity }])
                  }
                  onRemove={() => setItems([])}
                />
              </div>

              <div className="lg:col-span-1">
                <CartSummary
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  total={total}
                  itemCount={1}
                  onCheckout={() => console.log('Checkout')}
                  disabled={false}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// 送料無料
export const FreeShipping = {
  render: () => {
    const [items, setItems] = useState(sampleCartItems);
    const [selectedIds, setSelectedIds] = useState(['cart-001', 'cart-002', 'cart-003']);

    const selectedItems = items.filter((item) => selectedIds.includes(item.id));
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingFee = 0; // 送料無料
    const total = subtotal;

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={1} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">ショッピングカート</h1>

            {/* 送料無料バナー */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">
                🎉 送料無料！ 10,000円以上のご注文で送料が無料になりました
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <input type="checkbox" checked className="w-5 h-5" readOnly />
                  <span className="font-semibold">すべて選択</span>
                </div>

                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isSelected={true}
                    onToggleSelect={() => {}}
                    onUpdateQuantity={() => {}}
                    onRemove={() => {}}
                  />
                ))}
              </div>

              <div className="lg:col-span-1">
                <CartSummary
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  total={total}
                  itemCount={3}
                  onCheckout={() => console.log('Checkout')}
                  disabled={false}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// 一部選択
export const PartialSelection = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState(['cart-001']);

    const selectedItems = sampleCartItems.filter((item) => selectedIds.includes(item.id));
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingFee = 500;
    const total = subtotal + shippingFee;

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={1} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">ショッピングカート</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={false}
                    className="w-5 h-5"
                    readOnly
                  />
                  <span className="font-semibold">すべて選択</span>
                  <button className="ml-auto text-sm text-red-600 hover:text-red-700">
                    選択した商品を削除 (1)
                  </button>
                </div>

                {sampleCartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedIds.includes(item.id)}
                    onToggleSelect={(id) =>
                      setSelectedIds((prev) =>
                        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
                      )
                    }
                    onUpdateQuantity={() => {}}
                    onRemove={() => {}}
                  />
                ))}
              </div>

              <div className="lg:col-span-1">
                <CartSummary
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  total={total}
                  itemCount={selectedIds.length}
                  onCheckout={() => console.log('Checkout')}
                  disabled={selectedIds.length === 0}
                />
              </div>
            </div>

            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">こちらもおすすめ</h2>
              <ProductSlider products={recommendedProducts} />
            </section>
          </div>
        </main>
      </div>
    );
  },
};

// モバイルレイアウト
export const MobileLayout = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState(['cart-001', 'cart-002']);

    const selectedItems = sampleCartItems.filter((item) => selectedIds.includes(item.id));
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingFee = 500;
    const total = subtotal + shippingFee;

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={1} />

          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">カート</h1>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={selectedIds.length === sampleCartItems.length}
                className="w-4 h-4"
                readOnly
              />
              <span className="text-sm font-semibold">すべて選択</span>
            </div>

            <div className="space-y-3 mb-6">
              {sampleCartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isSelected={selectedIds.includes(item.id)}
                  onToggleSelect={() => {}}
                  onUpdateQuantity={() => {}}
                  onRemove={() => {}}
                />
              ))}
            </div>

            <CartSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              itemCount={selectedIds.length}
              onCheckout={() => console.log('Checkout')}
              disabled={false}
            />
          </div>
        </main>
      </div>
    );
  },
  globals: {
    viewport: {
      value: "mobile1",
      isRotated: false
    }
  },
};
