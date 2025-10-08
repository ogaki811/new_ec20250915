import { useState } from 'react';
import CustomerInfoForm from '@/components/checkout/CustomerInfoForm';
import ShippingInfoForm from '@/components/checkout/ShippingInfoForm';

const meta = {
  title: 'Organisms/CheckoutForms',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

// お客様情報フォーム - デフォルト
export const CustomerInfoDefault = {
  render: () => {
    const [formData, setFormData] = useState({
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };

    return (
      <div className="max-w-2xl">
        <CustomerInfoForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />
      </div>
    );
  },
};

// お客様情報フォーム - 入力済み
export const CustomerInfoFilled = {
  render: () => {
    const [formData, setFormData] = useState({
      lastName: '山田',
      firstName: '太郎',
      email: 'yamada@example.com',
      phone: '090-1234-5678',
    });
    const [errors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
      <div className="max-w-2xl">
        <CustomerInfoForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />
      </div>
    );
  },
};

// お客様情報フォーム - エラー表示
export const CustomerInfoWithErrors = {
  render: () => {
    const [formData, setFormData] = useState({
      lastName: '',
      firstName: '',
      email: 'invalid-email',
      phone: '123',
    });
    const [errors] = useState({
      lastName: '姓を入力してください',
      firstName: '名を入力してください',
      email: '有効なメールアドレスを入力してください',
      phone: '正しい電話番号を入力してください',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
      <div className="max-w-2xl">
        <CustomerInfoForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />
      </div>
    );
  },
};

// 配送先情報フォーム - デフォルト
export const ShippingInfoDefault = {
  render: () => {
    const [formData, setFormData] = useState({
      postalCode: '',
      prefecture: '',
      city: '',
      address: '',
      building: '',
    });
    const [errors, setErrors] = useState({});
    const [postalLoading, setPostalLoading] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };

    const handlePostalCodeSearch = () => {
      setPostalLoading(true);
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          prefecture: '東京都',
          city: '渋谷区',
          address: '神南1-2-3',
        }));
        setPostalLoading(false);
      }, 1000);
    };

    return (
      <div className="max-w-2xl">
        <ShippingInfoForm
          formData={formData}
          errors={errors}
          postalLoading={postalLoading}
          onChange={handleChange}
          onPostalCodeSearch={handlePostalCodeSearch}
        />
      </div>
    );
  },
};

// 配送先情報フォーム - 入力済み
export const ShippingInfoFilled = {
  render: () => {
    const [formData, setFormData] = useState({
      postalCode: '150-0041',
      prefecture: '東京都',
      city: '渋谷区',
      address: '神南1-2-3',
      building: 'サンプルビル 4F',
    });
    const [errors] = useState({});
    const [postalLoading] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePostalCodeSearch = () => {
      console.log('Search postal code');
    };

    return (
      <div className="max-w-2xl">
        <ShippingInfoForm
          formData={formData}
          errors={errors}
          postalLoading={postalLoading}
          onChange={handleChange}
          onPostalCodeSearch={handlePostalCodeSearch}
        />
      </div>
    );
  },
};

// 配送先情報フォーム - ローディング中
export const ShippingInfoLoading = {
  render: () => {
    const [formData] = useState({
      postalCode: '150-0041',
      prefecture: '',
      city: '',
      address: '',
      building: '',
    });
    const [errors] = useState({});
    const [postalLoading] = useState(true);

    return (
      <div className="max-w-2xl">
        <ShippingInfoForm
          formData={formData}
          errors={errors}
          postalLoading={postalLoading}
          onChange={() => {}}
          onPostalCodeSearch={() => {}}
        />
      </div>
    );
  },
};

// 配送先情報フォーム - エラー表示
export const ShippingInfoWithErrors = {
  render: () => {
    const [formData, setFormData] = useState({
      postalCode: '123',
      prefecture: '',
      city: '',
      address: '',
      building: '',
    });
    const [errors] = useState({
      postalCode: '正しい郵便番号を入力してください（例: 123-4567）',
      prefecture: '都道府県を選択してください',
      city: '市区町村を入力してください',
      address: '番地を入力してください',
    });
    const [postalLoading] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
      <div className="max-w-2xl">
        <ShippingInfoForm
          formData={formData}
          errors={errors}
          postalLoading={postalLoading}
          onChange={handleChange}
          onPostalCodeSearch={() => {}}
        />
      </div>
    );
  },
};

// チェックアウトページ全体
export const CompleteCheckoutPage = {
  render: () => {
    const [customerData, setCustomerData] = useState({
      lastName: '山田',
      firstName: '太郎',
      email: 'yamada@example.com',
      phone: '090-1234-5678',
    });

    const [shippingData, setShippingData] = useState({
      postalCode: '150-0041',
      prefecture: '東京都',
      city: '渋谷区',
      address: '神南1-2-3',
      building: 'サンプルビル 4F',
    });

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

    const handleSubmit = () => {
      console.log('Submit order:', { customerData, shippingData });
      alert('注文を送信しました');
    };

    return (
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">ご注文手続き</h1>
        <p className="text-gray-600 mb-8">お客様情報と配送先を入力してください</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* フォームエリア */}
          <div className="lg:col-span-2 space-y-6">
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

            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 border rounded-md hover:bg-gray-50">
                戻る
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                次へ進む
              </button>
            </div>
          </div>

          {/* サマリーエリア */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">注文サマリー</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>商品合計</span>
                  <span>¥41,800</span>
                </div>
                <div className="flex justify-between">
                  <span>送料</span>
                  <span>¥500</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">合計</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ¥42,300
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ステップバイステップフォーム
export const StepByStepForm = {
  render: () => {
    const [step, setStep] = useState(1);

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

    const [errors, setErrors] = useState({});
    const [postalLoading, setPostalLoading] = useState(false);

    const handleCustomerChange = (e) => {
      const { name, value } = e.target;
      setCustomerData((prev) => ({ ...prev, [name]: value }));
    };

    const handleShippingChange = (e) => {
      const { name, value } = e.target;
      setShippingData((prev) => ({ ...prev, [name]: value }));
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
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step === s
                      ? 'bg-blue-600 text-white'
                      : step > s
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s ? '✓' : s}
                </div>
                {s < 2 && (
                  <div
                    className={`w-24 h-1 ${
                      step > s ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600">
            ステップ {step} / 2:{' '}
            {step === 1 ? 'お客様情報' : '配送先情報'}
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <CustomerInfoForm
              formData={customerData}
              errors={errors}
              onChange={handleCustomerChange}
            />
            <button
              onClick={() => setStep(2)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              次へ
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <ShippingInfoForm
              formData={shippingData}
              errors={errors}
              postalLoading={postalLoading}
              onChange={handleShippingChange}
              onPostalCodeSearch={handlePostalCodeSearch}
            />
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 border rounded-md hover:bg-gray-50"
              >
                戻る
              </button>
              <button
                onClick={() => alert('注文完了')}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                注文を確定
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};
