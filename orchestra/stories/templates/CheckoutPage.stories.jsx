import { useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import StepIndicator from '@/components/common/StepIndicator';
import CustomerInfoForm from '@/components/checkout/CustomerInfoForm';
import ShippingInfoForm from '@/components/checkout/ShippingInfoForm';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import DeliveryDateSelector from '@/components/checkout/DeliveryDateSelector';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';

const meta = {
  title: 'Templates/CheckoutPage',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

// サンプル注文データ
const sampleOrderItems = [
  {
    id: 'item-001',
    name: 'ワイヤレスイヤホン',
    price: 28000,
    quantity: 2,
    image: 'https://placehold.co/100x100/e2e8f0/1e293b?text=1',
  },
  {
    id: 'item-002',
    name: 'スマートウォッチ',
    price: 35000,
    quantity: 1,
    image: 'https://placehold.co/100x100/e2e8f0/1e293b?text=2',
  },
];

const subtotal = sampleOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shippingFee = 500;
const total = subtotal + shippingFee;

// デフォルトのチェックアウトページ
export const Default = {
  render: () => {
    const [customerData, setCustomerData] = useState({
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
    });

    const [shippingData, setShippingData] = useState({
      postalCode: '',
      prefecture: '',
      city: '',
      address: '',
      building: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [errors, setErrors] = useState({});
    const [postalLoading, setPostalLoading] = useState(false);

    const handleCustomerChange = (e) => {
      const { name, value } = e.target;
      setCustomerData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };

    const handleShippingChange = (e) => {
      const { name, value } = e.target;
      setShippingData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };

    const handlePostalCodeSearch = () => {
      setPostalLoading(true);
      setTimeout(() => {
        setShippingData((prev) => ({
          ...prev,
          prefecture: '東京都',
          city: '渋谷区',
          address: '神南1-2-3',
        }));
        setPostalLoading(false);
      }, 1000);
    };

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={2} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ご注文手続き</h1>
            <p className="text-gray-600 mb-8">お客様情報と配送先を入力してください</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* フォームエリア */}
              <div className="lg:col-span-2 space-y-8">
                <CustomerInfoForm
                  formData={customerData}
                  errors={errors}
                  onChange={handleCustomerChange}
                />

                <ShippingInfoForm
                  formData={shippingData}
                  errors={errors}
                  postalLoading={postalLoading}
                  onChange={handleShippingChange}
                  onPostalCodeSearch={handlePostalCodeSearch}
                />

                <PaymentMethodSelector
                  paymentMethod={paymentMethod}
                  onChange={setPaymentMethod}
                />

                <DeliveryDateSelector
                  deliveryDate={deliveryDate}
                  deliveryTime={deliveryTime}
                  onDeliveryDateChange={setDeliveryDate}
                  onDeliveryTimeChange={setDeliveryTime}
                />

                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 border rounded-md hover:bg-gray-50">
                    戻る
                  </button>
                  <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    注文を確定する
                  </button>
                </div>
              </div>

              {/* サマリーエリア */}
              <div className="lg:col-span-1">
                <CheckoutSummary
                  items={sampleOrderItems}
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  total={total}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// 入力済み（ログインユーザー）
export const FilledForm = {
  render: () => {
    const [customerData] = useState({
      lastName: '山田',
      firstName: '太郎',
      email: 'yamada@example.com',
      phone: '090-1234-5678',
    });

    const [shippingData] = useState({
      postalCode: '150-0041',
      prefecture: '東京都',
      city: '渋谷区',
      address: '神南1-2-3',
      building: 'サンプルビル 4F',
    });

    const [paymentMethod] = useState('credit');
    const [deliveryDate] = useState('2025-10-15');
    const [deliveryTime] = useState('14-16');

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={2} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ご注文手続き</h1>
            <p className="text-gray-600 mb-8">お客様情報と配送先を入力してください</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <CustomerInfoForm
                  formData={customerData}
                  errors={{}}
                  onChange={() => {}}
                />

                <ShippingInfoForm
                  formData={shippingData}
                  errors={{}}
                  postalLoading={false}
                  onChange={() => {}}
                  onPostalCodeSearch={() => {}}
                />

                <PaymentMethodSelector
                  paymentMethod={paymentMethod}
                  onChange={() => {}}
                />

                <DeliveryDateSelector
                  deliveryDate={deliveryDate}
                  deliveryTime={deliveryTime}
                  onDeliveryDateChange={() => {}}
                  onDeliveryTimeChange={() => {}}
                />

                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 border rounded-md hover:bg-gray-50">
                    戻る
                  </button>
                  <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    注文を確定する
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <CheckoutSummary
                  items={sampleOrderItems}
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  total={total}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// バリデーションエラー
export const WithErrors = {
  render: () => {
    const [customerData] = useState({
      lastName: '',
      firstName: '',
      email: 'invalid-email',
      phone: '123',
    });

    const [shippingData] = useState({
      postalCode: '123',
      prefecture: '',
      city: '',
      address: '',
      building: '',
    });

    const errors = {
      lastName: '姓を入力してください',
      firstName: '名を入力してください',
      email: '有効なメールアドレスを入力してください',
      phone: '正しい電話番号を入力してください（例: 090-1234-5678）',
      postalCode: '正しい郵便番号を入力してください（例: 123-4567）',
      prefecture: '都道府県を選択してください',
      city: '市区町村を入力してください',
      address: '番地を入力してください',
    };

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={2} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ご注文手続き</h1>
            <p className="text-gray-600 mb-8">お客様情報と配送先を入力してください</p>

            {/* エラーサマリー */}
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h2 className="text-red-800 font-semibold mb-2">入力エラーがあります</h2>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([key, value]) => (
                  <li key={key}>• {value}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <CustomerInfoForm
                  formData={customerData}
                  errors={errors}
                  onChange={() => {}}
                />

                <ShippingInfoForm
                  formData={shippingData}
                  errors={errors}
                  postalLoading={false}
                  onChange={() => {}}
                  onPostalCodeSearch={() => {}}
                />

                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 border rounded-md hover:bg-gray-50">
                    戻る
                  </button>
                  <button
                    disabled
                    className="flex-1 px-6 py-3 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                  >
                    注文を確定する
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <CheckoutSummary
                  items={sampleOrderItems}
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  total={total}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// コンビニ決済選択
export const ConvenienceStorePayment = {
  render: () => {
    const [paymentMethod] = useState('convenience');

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={2} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ご注文手続き</h1>
            <p className="text-gray-600 mb-8">お客様情報と配送先を入力してください</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <PaymentMethodSelector
                  paymentMethod={paymentMethod}
                  onChange={() => {}}
                />

                <DeliveryDateSelector
                  deliveryDate=""
                  deliveryTime=""
                  onDeliveryDateChange={() => {}}
                  onDeliveryTimeChange={() => {}}
                />
              </div>

              <div className="lg:col-span-1">
                <CheckoutSummary
                  items={sampleOrderItems}
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  total={total}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// モバイルレイアウト
export const MobileLayout = {
  render: () => {
    const [customerData] = useState({
      lastName: '山田',
      firstName: '太郎',
      email: 'yamada@example.com',
      phone: '090-1234-5678',
    });

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />
          <StepIndicator currentStep={2} />

          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">注文手続き</h1>
            <p className="text-sm text-gray-600 mb-6">お客様情報を入力</p>

            <div className="space-y-6">
              <CustomerInfoForm
                formData={customerData}
                errors={{}}
                onChange={() => {}}
              />

              <CheckoutSummary
                items={sampleOrderItems}
                subtotal={subtotal}
                shippingFee={shippingFee}
                total={total}
              />

              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                注文を確定する
              </button>
            </div>
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
