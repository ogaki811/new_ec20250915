import { useState } from 'react';
import QuantitySelector from '@/components/product/QuantitySelector';

const meta = {
  title: 'Organisms/QuantitySelector',
  component: QuantitySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: '現在の数量',
    },
    onChange: {
      description: '数量変更時のコールバック',
    },
    max: {
      control: 'number',
      description: '最大数量',
    },
  },
};

export default meta;

// デフォルト（値: 1）
export const Default = {
  args: {
    value: 1,
    onChange: (quantity) => console.log('Quantity changed to:', quantity),
    max: 99,
  },
};

// セレクトモード（1-9）
export const SelectMode = {
  args: {
    value: 3,
    onChange: (quantity) => console.log('Quantity changed to:', quantity),
    max: 99,
  },
};

// 入力モード（10以上）
export const InputMode = {
  args: {
    value: 15,
    onChange: (quantity) => console.log('Quantity changed to:', quantity),
    max: 99,
  },
};

// 最大値制限（max: 20）
export const WithMaxLimit = {
  args: {
    value: 15,
    onChange: (quantity) => console.log('Quantity changed to:', quantity),
    max: 20,
  },
};

// 最大値制限（max: 10）
export const MaxLimit10 = {
  args: {
    value: 5,
    onChange: (quantity) => console.log('Quantity changed to:', quantity),
    max: 10,
  },
};

// インタラクティブ例
export const Interactive = {
  render: () => {
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">選択数量: {quantity}</p>
        </div>
        <QuantitySelector value={quantity} onChange={setQuantity} max={99} />
        <div className="text-center text-sm text-gray-600">
          <p>1-9: セレクトボックス</p>
          <p>10+: 入力フィールド（最大99）</p>
        </div>
      </div>
    );
  },
};

// 複数の数量セレクター
export const MultipleSelectors = {
  render: () => {
    const [qty1, setQty1] = useState(1);
    const [qty2, setQty2] = useState(5);
    const [qty3, setQty3] = useState(12);

    return (
      <div className="space-y-4 w-96">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">商品A</span>
            <span className="text-gray-600">¥1,200</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">数量:</span>
            <QuantitySelector value={qty1} onChange={setQty1} max={50} />
          </div>
          <div className="text-right mt-2">
            <span className="font-bold">小計: ¥{(1200 * qty1).toLocaleString()}</span>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">商品B</span>
            <span className="text-gray-600">¥3,500</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">数量:</span>
            <QuantitySelector value={qty2} onChange={setQty2} max={30} />
          </div>
          <div className="text-right mt-2">
            <span className="font-bold">小計: ¥{(3500 * qty2).toLocaleString()}</span>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">商品C</span>
            <span className="text-gray-600">¥890</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">数量:</span>
            <QuantitySelector value={qty3} onChange={setQty3} max={99} />
          </div>
          <div className="text-right mt-2">
            <span className="font-bold">小計: ¥{(890 * qty3).toLocaleString()}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center font-bold text-lg">
            <span>合計</span>
            <span>¥{(1200 * qty1 + 3500 * qty2 + 890 * qty3).toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  },
};

// カート画面での使用例
export const CartExample = {
  render: () => {
    const [cartItems, setCartItems] = useState([
      { id: 1, name: 'ワイヤレスイヤホン', price: 12800, quantity: 1, max: 20 },
      { id: 2, name: 'スマートウォッチ', price: 28000, quantity: 2, max: 10 },
      { id: 3, name: 'モバイルバッテリー', price: 3200, quantity: 15, max: 99 },
    ]);

    const updateQuantity = (id, newQuantity) => {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">ショッピングカート</h2>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border rounded-lg p-4">
              <div className="w-24 h-24 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-gray-600 mb-3">¥{item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">数量:</span>
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(qty) => updateQuantity(item.id, qty)}
                    max={item.max}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  ¥{(item.price * item.quantity).toLocaleString()}
                </p>
                <button className="text-sm text-red-600 hover:underline mt-2">削除</button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center text-2xl font-bold mb-6">
            <span>合計</span>
            <span className="text-blue-600">¥{total.toLocaleString()}</span>
          </div>
          <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            レジに進む
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// セレクト → 入力切り替えデモ
export const ModeToggleDemo = {
  render: () => {
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="space-y-6 w-96">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-4">数量セレクター動作デモ</h3>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">数量を選択:</label>
            <QuantitySelector value={quantity} onChange={setQuantity} max={99} />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">現在の数量:</span>
              <span className="font-bold">{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">モード:</span>
              <span className="font-bold">{quantity >= 10 ? '入力フィールド' : 'セレクトボックス'}</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
            <p className="font-semibold mb-2">💡 ヒント:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>1-9個: セレクトボックスで選択</li>
              <li>10個以上: 「10+」を選択すると入力フィールドに切り替わります</li>
              <li>入力モード時は「選択に戻る」で再びセレクトボックスに戻れます</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
};

// バリデーション例
export const ValidationExample = {
  render: () => {
    const [quantity, setQuantity] = useState(10);
    const [error, setError] = useState('');
    const max = 30;

    const handleChange = (newQuantity) => {
      setQuantity(newQuantity);
      if (newQuantity > max) {
        setError(`最大${max}個までご購入いただけます`);
      } else if (newQuantity < 1) {
        setError('1個以上を選択してください');
      } else {
        setError('');
      }
    };

    return (
      <div className="w-96 border rounded-lg p-6">
        <h3 className="font-semibold mb-4">在庫制限あり商品</h3>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">数量:</span>
            <span className="text-sm text-gray-600">残り{max}個</span>
          </div>
          <QuantitySelector value={quantity} onChange={handleChange} max={max} />
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
          <p className="font-semibold">⚠ 在庫制限</p>
          <p>この商品は残り{max}個までご購入可能です</p>
        </div>
      </div>
    );
  },
};

// 全状態パターン
export const AllStates = {
  render: () => {
    const [qty1, setQty1] = useState(1);
    const [qty2, setQty2] = useState(5);
    const [qty3, setQty3] = useState(9);
    const [qty4, setQty4] = useState(10);
    const [qty5, setQty5] = useState(25);
    const [qty6, setQty6] = useState(99);

    return (
      <div className="space-y-6 w-96">
        <div>
          <h3 className="text-sm font-semibold mb-2">数量: 1（最小値）</h3>
          <QuantitySelector value={qty1} onChange={setQty1} max={99} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">数量: 5（セレクトモード中間）</h3>
          <QuantitySelector value={qty2} onChange={setQty2} max={99} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">数量: 9（セレクトモード最大）</h3>
          <QuantitySelector value={qty3} onChange={setQty3} max={99} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">数量: 10（入力モード開始）</h3>
          <QuantitySelector value={qty4} onChange={setQty4} max={99} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">数量: 25（入力モード中間）</h3>
          <QuantitySelector value={qty5} onChange={setQty5} max={99} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">数量: 99（最大値）</h3>
          <QuantitySelector value={qty6} onChange={setQty6} max={99} />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 商品詳細ページでの使用例
export const ProductDetailExample = {
  render: () => {
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 aspect-square rounded-lg"></div>

          <div>
            <h1 className="text-3xl font-bold mb-2">ワイヤレスイヤホン</h1>
            <p className="text-gray-600 mb-4">品番: WH-1000XM5</p>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">(4.5) 1,234件のレビュー</span>
            </div>

            <p className="text-3xl font-bold text-blue-600 mb-6">¥28,000</p>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                業界最高クラスのノイズキャンセリング機能を搭載したワイヤレスイヤホン。
                クリアな音質と快適な装着感で、長時間の使用でも疲れにくい設計です。
              </p>
            </div>

            <div className="border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">数量:</span>
                <QuantitySelector value={quantity} onChange={setQuantity} max={50} />
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <span className="text-lg font-semibold">小計:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ¥{(28000 * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                カートに追加
              </button>
              <button className="w-full px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                お気に入りに追加
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
