import { useState } from 'react';
import Select from '@/components/ui/Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    error: {
      control: 'text',
      description: 'エラーメッセージ',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    required: {
      control: 'boolean',
      description: '必須フィールド',
    },
    fullWidth: {
      control: 'boolean',
      description: '全幅表示',
    },
  },
};

export default meta;

// デフォルト
export const Default = {
  args: {
    options: [
      { value: 'option1', label: 'オプション 1' },
      { value: 'option2', label: 'オプション 2' },
      { value: 'option3', label: 'オプション 3' },
    ],
  },
};

// ラベル付き
export const WithLabel = {
  args: {
    label: 'オプションを選択',
    options: [
      { value: '', label: '選択してください' },
      { value: 'option1', label: 'オプション 1' },
      { value: 'option2', label: 'オプション 2' },
      { value: 'option3', label: 'オプション 3' },
    ],
  },
};

// エラー状態
export const WithError = {
  args: {
    label: 'カテゴリを選択',
    options: [
      { value: '', label: '選択してください' },
      { value: 'electronics', label: '電化製品' },
      { value: 'clothing', label: '衣類' },
      { value: 'books', label: '書籍' },
    ],
    error: 'カテゴリを選択してください',
  },
};

// 無効状態
export const Disabled = {
  args: {
    label: '無効な選択',
    options: [
      { value: 'option1', label: 'オプション 1' },
      { value: 'option2', label: 'オプション 2' },
    ],
    disabled: true,
  },
};

// 必須フィールド
export const Required = {
  args: {
    label: '必須項目',
    options: [
      { value: '', label: '選択してください' },
      { value: 'option1', label: 'オプション 1' },
      { value: 'option2', label: 'オプション 2' },
    ],
    required: true,
  },
};

// 全幅表示
export const FullWidth = {
  args: {
    label: '全幅セレクト',
    options: [
      { value: 'option1', label: 'オプション 1' },
      { value: 'option2', label: 'オプション 2' },
    ],
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// インタラクティブ例
export const Interactive = {
  render: () => {
    const [selected, setSelected] = useState('');

    const options = [
      { value: '', label: '選択してください' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ];

    return (
      <div className="space-y-4">
        <Select
          label="フレームワークを選択"
          options={options}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        />
        {selected && (
          <p className="text-sm text-gray-600">
            選択中: {options.find((o) => o.value === selected)?.label}
          </p>
        )}
      </div>
    );
  },
};

// 都道府県選択
export const PrefectureSelect = {
  render: () => {
    const [prefecture, setPrefecture] = useState('');

    const prefectures = [
      { value: '', label: '都道府県を選択' },
      { value: 'tokyo', label: '東京都' },
      { value: 'osaka', label: '大阪府' },
      { value: 'kyoto', label: '京都府' },
      { value: 'hokkaido', label: '北海道' },
      { value: 'fukuoka', label: '福岡県' },
      { value: 'aichi', label: '愛知県' },
      { value: 'kanagawa', label: '神奈川県' },
    ];

    return (
      <div className="w-80">
        <Select
          label="都道府県"
          options={prefectures}
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          fullWidth
        />
      </div>
    );
  },
};

// 国選択
export const CountrySelect = {
  render: () => {
    const [country, setCountry] = useState('jp');

    const countries = [
      { value: 'jp', label: '🇯🇵 日本' },
      { value: 'us', label: '🇺🇸 アメリカ' },
      { value: 'uk', label: '🇬🇧 イギリス' },
      { value: 'cn', label: '🇨🇳 中国' },
      { value: 'kr', label: '🇰🇷 韓国' },
      { value: 'fr', label: '🇫🇷 フランス' },
      { value: 'de', label: '🇩🇪 ドイツ' },
    ];

    return (
      <div className="w-80">
        <Select
          label="国を選択"
          options={countries}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
        />
      </div>
    );
  },
};

// ソート選択
export const SortSelect = {
  render: () => {
    const [sortBy, setSortBy] = useState('newest');

    const sortOptions = [
      { value: 'newest', label: '新着順' },
      { value: 'oldest', label: '古い順' },
      { value: 'price-low', label: '価格が安い順' },
      { value: 'price-high', label: '価格が高い順' },
      { value: 'popular', label: '人気順' },
      { value: 'rating', label: '評価が高い順' },
    ];

    return (
      <div className="w-80">
        <Select
          label="並び替え"
          options={sortOptions}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          fullWidth
        />
      </div>
    );
  },
};

// 日付選択（年月日）
export const DateSelects = {
  render: () => {
    const [date, setDate] = useState({ year: '2025', month: '1', day: '1' });

    const years = Array.from({ length: 100 }, (_, i) => {
      const year = (2025 - i).toString();
      return { value: year, label: `${year}年` };
    });

    const months = Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString();
      return { value: month, label: `${month}月` };
    });

    const days = Array.from({ length: 31 }, (_, i) => {
      const day = (i + 1).toString();
      return { value: day, label: `${day}日` };
    });

    return (
      <div className="w-96">
        <h3 className="font-semibold mb-4">生年月日</h3>
        <div className="grid grid-cols-3 gap-3">
          <Select
            options={years}
            value={date.year}
            onChange={(e) => setDate({ ...date, year: e.target.value })}
            fullWidth
          />
          <Select
            options={months}
            value={date.month}
            onChange={(e) => setDate({ ...date, month: e.target.value })}
            fullWidth
          />
          <Select
            options={days}
            value={date.day}
            onChange={(e) => setDate({ ...date, day: e.target.value })}
            fullWidth
          />
        </div>
        <p className="text-sm text-gray-600 mt-3">
          選択日: {date.year}年{date.month}月{date.day}日
        </p>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 時刻選択
export const TimeSelect = {
  render: () => {
    const [time, setTime] = useState({ hour: '09', minute: '00' });

    const hours = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      return { value: hour, label: `${hour}時` };
    });

    const minutes = Array.from({ length: 12 }, (_, i) => {
      const minute = (i * 5).toString().padStart(2, '0');
      return { value: minute, label: `${minute}分` };
    });

    return (
      <div className="w-80">
        <h3 className="font-semibold mb-4">時刻を選択</h3>
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="時"
            options={hours}
            value={time.hour}
            onChange={(e) => setTime({ ...time, hour: e.target.value })}
            fullWidth
          />
          <Select
            label="分"
            options={minutes}
            value={time.minute}
            onChange={(e) => setTime({ ...time, minute: e.target.value })}
            fullWidth
          />
        </div>
        <p className="text-sm text-gray-600 mt-3">
          選択時刻: {time.hour}:{time.minute}
        </p>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// カスケード選択（連動セレクト）
export const CascadingSelects = {
  render: () => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');

    const categories = [
      { value: '', label: 'カテゴリを選択' },
      { value: 'electronics', label: '電化製品' },
      { value: 'clothing', label: '衣類' },
      { value: 'books', label: '書籍' },
    ];

    const subcategories = {
      electronics: [
        { value: '', label: 'サブカテゴリを選択' },
        { value: 'smartphone', label: 'スマートフォン' },
        { value: 'laptop', label: 'ノートPC' },
        { value: 'tablet', label: 'タブレット' },
      ],
      clothing: [
        { value: '', label: 'サブカテゴリを選択' },
        { value: 'mens', label: 'メンズ' },
        { value: 'womens', label: 'レディース' },
        { value: 'kids', label: 'キッズ' },
      ],
      books: [
        { value: '', label: 'サブカテゴリを選択' },
        { value: 'fiction', label: '小説' },
        { value: 'business', label: 'ビジネス' },
        { value: 'technical', label: '技術書' },
      ],
    };

    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
      setSubcategory('');
    };

    return (
      <div className="w-96 space-y-4">
        <Select
          label="カテゴリ"
          options={categories}
          value={category}
          onChange={handleCategoryChange}
          fullWidth
        />

        <Select
          label="サブカテゴリ"
          options={
            category
              ? subcategories[category]
              : [{ value: '', label: 'まずカテゴリを選択してください' }]
          }
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          disabled={!category}
          fullWidth
        />

        {category && subcategory && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              選択中: {categories.find((c) => c.value === category)?.label} →{' '}
              {subcategories[category].find((s) => s.value === subcategory)?.label}
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// フォーム内での使用例
export const InForm = {
  render: () => {
    const [formData, setFormData] = useState({
      country: 'jp',
      prefecture: '',
      city: '',
    });

    const countries = [
      { value: 'jp', label: '日本' },
      { value: 'us', label: 'アメリカ' },
    ];

    const prefectures = [
      { value: '', label: '都道府県を選択' },
      { value: 'tokyo', label: '東京都' },
      { value: 'osaka', label: '大阪府' },
    ];

    const cities = [
      { value: '', label: '市区町村を選択' },
      { value: 'shibuya', label: '渋谷区' },
      { value: 'shinjuku', label: '新宿区' },
    ];

    return (
      <div className="w-96">
        <h3 className="text-lg font-semibold mb-4">住所情報</h3>

        <div className="space-y-4">
          <Select
            label="国"
            options={countries}
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            fullWidth
          />

          <Select
            label="都道府県"
            options={prefectures}
            value={formData.prefecture}
            onChange={(e) =>
              setFormData({ ...formData, prefecture: e.target.value })
            }
            required
            fullWidth
          />

          <Select
            label="市区町村"
            options={cities}
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            fullWidth
          />

          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            送信
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 数量選択
export const QuantitySelect = {
  render: () => {
    const [quantity, setQuantity] = useState('1');

    const quantities = Array.from({ length: 10 }, (_, i) => ({
      value: (i + 1).toString(),
      label: `${i + 1}個`,
    }));

    return (
      <div className="w-64 border rounded-lg p-4">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://placehold.co/80x80/e2e8f0/64748b?text=Product"
            alt="商品"
            className="w-20 h-20 rounded"
          />
          <div>
            <h4 className="font-semibold">商品名</h4>
            <p className="text-sm text-gray-600">¥1,980</p>
          </div>
        </div>

        <Select
          label="数量"
          options={quantities}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
        />

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">合計</span>
            <span className="text-lg font-bold text-blue-600">
              ¥{(1980 * parseInt(quantity)).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  },
};
