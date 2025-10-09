import { useState } from 'react';
import Radio from '@/components/ui/Radio';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    description: {
      control: 'text',
      description: '説明テキスト',
    },
    checked: {
      control: 'boolean',
      description: '選択状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    error: {
      control: 'text',
      description: 'エラーメッセージ',
    },
  },
};

export default meta;

// デフォルト
export const Default = {
  args: {
    label: 'ラジオボタン',
    name: 'default',
  },
};

// ラベルなし
export const WithoutLabel = {
  args: {
    name: 'no-label',
  },
};

// 説明付き
export const WithDescription = {
  args: {
    label: 'オプション1',
    description: 'このオプションの詳細説明がここに表示されます',
    name: 'with-description',
  },
};

// 選択済み
export const Checked = {
  args: {
    label: '選択済み',
    defaultChecked: true,
    name: 'checked',
  },
};

// 未選択
export const Unchecked = {
  args: {
    label: '未選択',
    defaultChecked: false,
    name: 'unchecked',
  },
};

// 無効状態
export const Disabled = {
  args: {
    label: '無効なオプション',
    disabled: true,
    name: 'disabled',
  },
};

// 無効状態（選択済み）
export const DisabledChecked = {
  args: {
    label: '無効（選択済み）',
    disabled: true,
    defaultChecked: true,
    name: 'disabled-checked',
  },
};

// エラー状態
export const WithError = {
  args: {
    label: 'オプションを選択',
    error: 'この項目は必須です',
    name: 'error',
  },
};

// 全状態一覧
export const AllStates = {
  render: () => (
    <div className="space-y-3">
      <Radio label="未選択" name="all-states-1" />
      <Radio label="選択済み" name="all-states-2" defaultChecked />
      <Radio label="説明付き" description="説明文がここに表示されます" name="all-states-3" />
      <Radio label="無効" name="all-states-4" disabled />
      <Radio label="無効（選択済み）" name="all-states-5" disabled defaultChecked />
      <Radio label="エラー" name="all-states-6" error="エラーメッセージ" />
    </div>
  ),
};

// ラジオグループ基本
export const RadioGroup = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <div className="space-y-2">
        <h3 className="font-semibold mb-3">オプションを選択</h3>
        <Radio
          label="オプション1"
          name="radio-group"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="オプション2"
          name="radio-group"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="オプション3"
          name="radio-group"
          value="option3"
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <p className="text-sm text-gray-600 mt-4">
          選択中: {selected}
        </p>
      </div>
    );
  },
};

// 支払い方法選択
export const PaymentMethod = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState('credit-card');

    return (
      <div className="w-96">
        <h3 className="font-semibold mb-4">お支払い方法</h3>

        <div className="space-y-3">
          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <Radio
              label="クレジットカード"
              description="Visa、Mastercard、JCB、American Express"
              name="payment"
              value="credit-card"
              checked={paymentMethod === 'credit-card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <Radio
              label="銀行振込"
              description="お振込確認後、商品を発送いたします"
              name="payment"
              value="bank-transfer"
              checked={paymentMethod === 'bank-transfer'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <Radio
              label="コンビニ決済"
              description="セブンイレブン、ファミリーマート、ローソン"
              name="payment"
              value="convenience-store"
              checked={paymentMethod === 'convenience-store'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <Radio
              label="代金引換"
              description="商品受け取り時に現金でお支払い（手数料 ¥330）"
              name="payment"
              value="cash-on-delivery"
              checked={paymentMethod === 'cash-on-delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 配送方法選択
export const ShippingMethod = {
  render: () => {
    const [shippingMethod, setShippingMethod] = useState('standard');

    const methods = [
      {
        value: 'standard',
        label: '通常配送',
        description: '5-7営業日でお届け',
        price: '無料',
      },
      {
        value: 'express',
        label: '速達便',
        description: '2-3営業日でお届け',
        price: '¥500',
      },
      {
        value: 'same-day',
        label: '当日配送',
        description: '本日中にお届け（対象地域のみ）',
        price: '¥1,500',
      },
    ];

    return (
      <div className="w-96">
        <h3 className="font-semibold mb-4">配送方法を選択</h3>

        <div className="space-y-3">
          {methods.map((method) => (
            <div
              key={method.value}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                shippingMethod === method.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setShippingMethod(method.value)}
            >
              <div className="flex items-start justify-between">
                <Radio
                  label={method.label}
                  description={method.description}
                  name="shipping"
                  value={method.value}
                  checked={shippingMethod === method.value}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <span className="text-sm font-semibold text-blue-600">
                  {method.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// プランサイズ選択
export const PlanSelection = {
  render: () => {
    const [plan, setPlan] = useState('pro');

    const plans = [
      {
        value: 'free',
        label: 'Free',
        price: '¥0',
        period: '/月',
        features: ['5プロジェクト', '1GB ストレージ', 'コミュニティサポート'],
      },
      {
        value: 'pro',
        label: 'Pro',
        price: '¥980',
        period: '/月',
        features: ['無制限プロジェクト', '100GB ストレージ', '優先サポート'],
        recommended: true,
      },
      {
        value: 'enterprise',
        label: 'Enterprise',
        price: '¥2,980',
        period: '/月',
        features: ['無制限プロジェクト', '1TB ストレージ', '専任サポート'],
      },
    ];

    return (
      <div className="w-full max-w-2xl">
        <h3 className="font-semibold mb-4 text-center">プランを選択</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((planOption) => (
            <div
              key={planOption.value}
              className={`border rounded-lg p-6 transition-all cursor-pointer relative ${
                plan === planOption.value
                  ? 'border-blue-500 shadow-lg'
                  : 'hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setPlan(planOption.value)}
            >
              {planOption.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    おすすめ
                  </span>
                </div>
              )}

              <Radio
                label={planOption.label}
                name="plan"
                value={planOption.value}
                checked={plan === planOption.value}
                onChange={(e) => setPlan(e.target.value)}
              />

              <div className="mt-4 mb-6">
                <span className="text-3xl font-bold">{planOption.price}</span>
                <span className="text-gray-600">{planOption.period}</span>
              </div>

              <ul className="space-y-2">
                {planOption.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// アンケート形式
export const SurveyQuestion = {
  render: () => {
    const [answers, setAnswers] = useState({
      satisfaction: '',
      frequency: '',
    });

    return (
      <div className="w-96 space-y-6">
        <div>
          <h3 className="font-semibold mb-3">
            サービスの満足度をお聞かせください
          </h3>
          <div className="space-y-2">
            {['とても満足', '満足', '普通', '不満', 'とても不満'].map((option) => (
              <Radio
                key={option}
                label={option}
                name="satisfaction"
                value={option}
                checked={answers.satisfaction === option}
                onChange={(e) =>
                  setAnswers({ ...answers, satisfaction: e.target.value })
                }
              />
            ))}
          </div>
        </div>

        <div className="pt-6 border-t">
          <h3 className="font-semibold mb-3">
            サービスの利用頻度をお聞かせください
          </h3>
          <div className="space-y-2">
            {['毎日', '週に数回', '月に数回', 'ほとんど使わない'].map((option) => (
              <Radio
                key={option}
                label={option}
                name="frequency"
                value={option}
                checked={answers.frequency === option}
                onChange={(e) =>
                  setAnswers({ ...answers, frequency: e.target.value })
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 言語選択
export const LanguageSelection = {
  render: () => {
    const [language, setLanguage] = useState('ja');

    const languages = [
      { value: 'ja', label: '日本語', native: '日本語' },
      { value: 'en', label: '英語', native: 'English' },
      { value: 'zh', label: '中国語', native: '中文' },
      { value: 'ko', label: '韓国語', native: '한국어' },
    ];

    return (
      <div className="w-80">
        <h3 className="font-semibold mb-4">言語を選択</h3>

        <div className="space-y-2">
          {languages.map((lang) => (
            <div
              key={lang.value}
              className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <Radio
                label={
                  <div className="flex items-center justify-between">
                    <span>{lang.label}</span>
                    <span className="text-sm text-gray-500">{lang.native}</span>
                  </div>
                }
                name="language"
                value={lang.value}
                checked={language === lang.value}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// カード形式
export const CardStyle = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    const options = [
      {
        value: 'option1',
        title: 'オプション 1',
        description: 'このオプションの詳細な説明がここに入ります',
        icon: '🎯',
      },
      {
        value: 'option2',
        title: 'オプション 2',
        description: 'このオプションの詳細な説明がここに入ります',
        icon: '⚡',
      },
      {
        value: 'option3',
        title: 'オプション 3',
        description: 'このオプションの詳細な説明がここに入ります',
        icon: '🚀',
      },
    ];

    return (
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((option) => (
            <div
              key={option.value}
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selected === option.value
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => setSelected(option.value)}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{option.icon}</div>
                <Radio
                  label={option.title}
                  name="card-style"
                  value={option.value}
                  checked={selected === option.value}
                  onChange={(e) => setSelected(e.target.value)}
                />
              </div>
              <p className="text-sm text-gray-600 text-center mt-2">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
