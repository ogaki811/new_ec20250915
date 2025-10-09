import StepIndicator from '@/components/common/StepIndicator';

const meta = {
  title: 'Molecules/StepIndicator',
  component: StepIndicator,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: 'number',
      description: '現在のステップ番号',
    },
    steps: {
      description: 'ステップ配列',
    },
  },
};

export default meta;

// ステップ1（カート確認）
export const Step1 = {
  args: {
    currentStep: 1,
  },
};

// ステップ2（お客様情報）
export const Step2 = {
  args: {
    currentStep: 2,
  },
};

// ステップ3（決済・完了）
export const Step3 = {
  args: {
    currentStep: 3,
  },
};

// カスタムステップ（4ステップ）
export const FourSteps = {
  args: {
    currentStep: 2,
    steps: [
      { number: 1, label: 'カート確認' },
      { number: 2, label: 'お客様情報' },
      { number: 3, label: '配送・支払い' },
      { number: 4, label: '注文完了' },
    ],
  },
};

// カスタムステップ（5ステップ）
export const FiveSteps = {
  args: {
    currentStep: 3,
    steps: [
      { number: 1, label: 'カート' },
      { number: 2, label: 'お客様情報' },
      { number: 3, label: '配送方法' },
      { number: 4, label: '支払い方法' },
      { number: 5, label: '完了' },
    ],
  },
};

// 登録フロー（3ステップ）
export const SignupFlow = {
  args: {
    currentStep: 2,
    steps: [
      { number: 1, label: 'アカウント情報' },
      { number: 2, label: 'プロフィール入力' },
      { number: 3, label: '登録完了' },
    ],
  },
};

// 全ステップパターン
export const AllStates = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold px-8 mb-2">ステップ1（開始）</h3>
        <StepIndicator currentStep={1} />
      </div>

      <div>
        <h3 className="text-sm font-semibold px-8 mb-2">ステップ2（進行中）</h3>
        <StepIndicator currentStep={2} />
      </div>

      <div>
        <h3 className="text-sm font-semibold px-8 mb-2">ステップ3（完了）</h3>
        <StepIndicator currentStep={3} />
      </div>
    </div>
  ),
};

// チェックアウトフロー例
export const CheckoutFlow = {
  render: () => {
    const CheckoutStep1 = () => (
      <div>
        <StepIndicator currentStep={1} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">カート内の商品</h2>
            <div className="space-y-4 mb-8">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 border rounded-lg p-4">
                  <div className="w-24 h-24 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">商品名 {i}</h3>
                    <p className="text-sm text-gray-600">¥12,800</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                次へ進む
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    return <CheckoutStep1 />;
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// インタラクティブデモ
export const Interactive = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    const steps = [
      { number: 1, label: 'カート確認' },
      { number: 2, label: 'お客様情報' },
      { number: 3, label: '決済・完了' },
    ];

    return (
      <div>
        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="border rounded-lg p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">
                ステップ {currentStep}: {steps[currentStep - 1].label}
              </h3>
              <p className="text-gray-600 mb-6">
                ここにステップ{currentStep}の内容が表示されます
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  戻る
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                  disabled={currentStep === 3}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                >
                  {currentStep === 3 ? '完了' : '次へ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// ステップ内容付き（ステップ1）
export const WithContentStep1 = {
  render: () => (
    <div>
      <StepIndicator currentStep={1} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">カート内の商品</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <h4 className="font-medium">商品名</h4>
                  <p className="text-sm text-gray-600">サイズ: M / カラー: ブルー</p>
                  <p className="text-sm font-bold mt-2">¥12,800</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">小計</span>
              <span className="text-lg font-bold">¥12,800</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>送料</span>
              <span>¥500</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-xl font-semibold">合計</span>
              <span className="text-2xl font-bold text-blue-600">¥13,300</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              次へ進む
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// ステップ内容付き（ステップ2）
export const WithContentStep2 = {
  render: () => (
    <div>
      <StepIndicator currentStep={2} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <form className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4">お客様情報</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">姓</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="山田"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">名</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="太郎"
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4">配送先住所</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">郵便番号</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">住所</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="東京都渋谷区..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button className="px-6 py-2 border rounded-md hover:bg-gray-50">
                戻る
              </button>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                次へ進む
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// ステップ内容付き（ステップ3 - 完了）
export const WithContentStep3 = {
  render: () => (
    <div>
      <StepIndicator currentStep={3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="border rounded-lg p-12">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4">ご注文ありがとうございます！</h2>
            <p className="text-gray-600 mb-6">
              ご注文が完了しました。<br />
              確認メールを送信いたしましたのでご確認ください。
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">注文番号</p>
              <p className="text-lg font-bold">#12345</p>
            </div>

            <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              注文履歴を見る
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
