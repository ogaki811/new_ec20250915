import { useState } from 'react';
import SearchBar from '@/components/product/SearchBar';

const meta = {
  title: 'Organisms/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '検索テキスト',
    },
    onChange: {
      description: 'テキスト変更時のコールバック',
    },
    onSearch: {
      description: '検索実行時のコールバック',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト',
    },
  },
};

export default meta;

// デフォルト（空）
export const Default = {
  args: {
    value: '',
    onChange: (value) => console.log('Changed:', value),
    onSearch: (value) => console.log('Search:', value),
    placeholder: '商品を検索',
  },
};

// テキスト入力済み
export const WithText = {
  args: {
    value: 'ワイヤレスイヤホン',
    onChange: (value) => console.log('Changed:', value),
    onSearch: (value) => console.log('Search:', value),
    placeholder: '商品を検索',
  },
};

// カスタムプレースホルダー
export const CustomPlaceholder = {
  args: {
    value: '',
    onChange: (value) => console.log('Changed:', value),
    onSearch: (value) => console.log('Search:', value),
    placeholder: 'キーワードを入力してください...',
  },
};

// 長いテキスト
export const LongText = {
  args: {
    value: 'ワイヤレスBluetoothノイズキャンセリングイヤホン',
    onChange: (value) => console.log('Changed:', value),
    onSearch: (value) => console.log('Search:', value),
    placeholder: '商品を検索',
  },
};

// インタラクティブ例
export const Interactive = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    const handleSearch = (value) => {
      if (value.trim()) {
        setSearchHistory((prev) => [value, ...prev.filter((item) => item !== value)].slice(0, 5));
        console.log('Searching for:', value);
      }
    };

    return (
      <div className="w-full max-w-2xl space-y-4">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="商品を検索"
        />

        <div className="text-sm text-gray-600">
          <p>現在の入力: <strong>{searchValue || '(なし)'}</strong></p>
        </div>

        {searchHistory.length > 0 && (
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2">検索履歴</h3>
            <ul className="space-y-1">
              {searchHistory.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {index + 1}. {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

// 検索結果付き
export const WithResults = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const mockProducts = [
      'ワイヤレスイヤホン',
      'ワイヤレスマウス',
      'ワイヤレスキーボード',
      'Bluetoothスピーカー',
      'スマートウォッチ',
      'モバイルバッテリー',
      'USB-Cケーブル',
      'ノートパソコンスタンド',
    ];

    const handleSearch = (value) => {
      setIsSearching(true);

      setTimeout(() => {
        const filtered = mockProducts.filter((product) =>
          product.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 500);
    };

    return (
      <div className="w-full max-w-2xl space-y-4">
        <SearchBar
          value={searchValue}
          onChange={(value) => {
            setSearchValue(value);
            if (!value) setResults([]);
          }}
          onSearch={handleSearch}
          placeholder="商品を検索"
        />

        {isSearching && (
          <div className="text-center py-8 text-gray-600">
            検索中...
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <p className="text-sm text-gray-600">{results.length}件の商品が見つかりました</p>
            </div>
            <div className="divide-y">
              {results.map((product, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <p className="font-medium">{product}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isSearching && searchValue && results.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>検索結果が見つかりませんでした</p>
            <p className="text-sm mt-2">別のキーワードをお試しください</p>
          </div>
        )}
      </div>
    );
  },
};

// サジェスト機能付き
export const WithSuggestions = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = [
      'ワイヤレスイヤホン',
      'ワイヤレスマウス',
      'ワイヤレスキーボード',
      'ワイヤレスヘッドホン',
      'ワイヤレスチャージャー',
    ];

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div className="w-full max-w-2xl">
        <div className="relative">
          <SearchBar
            value={searchValue}
            onChange={(value) => {
              setSearchValue(value);
              setShowSuggestions(value.length > 0);
            }}
            onSearch={(value) => {
              console.log('Searching for:', value);
              setShowSuggestions(false);
            }}
            placeholder="商品を検索"
          />

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 border rounded-lg bg-white shadow-lg z-10">
              <div className="px-4 py-2 bg-gray-50 border-b">
                <p className="text-xs text-gray-600">候補</p>
              </div>
              <div className="divide-y">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchValue(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

// ヘッダー内での使用例
export const InHeader = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');

    return (
      <div className="w-full">
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-6">
                <h1 className="text-xl font-bold">ECサイト</h1>
              </div>

              <div className="flex-1 max-w-2xl mx-6">
                <SearchBar
                  value={searchValue}
                  onChange={setSearchValue}
                  onSearch={(value) => console.log('Search:', value)}
                  placeholder="商品を検索"
                />
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// モバイルレイアウト
export const Mobile = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');

    return (
      <div className="w-full max-w-sm">
        <div className="bg-white border-b p-4">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={(value) => console.log('Search:', value)}
            placeholder="商品を検索"
          />
        </div>
      </div>
    );
  },
};

// 検索ページレイアウト
export const SearchPage = {
  render: () => {
    const [searchValue, setSearchValue] = useState('イヤホン');
    const [results] = useState([
      { id: 1, name: 'ワイヤレスイヤホン A', price: 12800 },
      { id: 2, name: 'ワイヤレスイヤホン B', price: 8900 },
      { id: 3, name: 'Bluetoothイヤホン C', price: 15600 },
    ]);

    return (
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={(value) => console.log('Search:', value)}
            placeholder="商品を検索"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            「{searchValue}」の検索結果: {results.length}件
          </p>
        </div>

        <div className="space-y-4">
          {results.map((product) => (
            <div key={product.id} className="flex gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-blue-600">¥{product.price.toLocaleString()}</p>
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

// 複数のサイズバリエーション
export const Sizes = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <div className="space-y-8">
        <div className="w-96">
          <h3 className="text-sm font-semibold mb-2">Small (396px)</h3>
          <SearchBar
            value={value1}
            onChange={setValue1}
            onSearch={(v) => console.log('Search:', v)}
            placeholder="商品を検索"
          />
        </div>

        <div className="w-[512px]">
          <h3 className="text-sm font-semibold mb-2">Medium (512px)</h3>
          <SearchBar
            value={value2}
            onChange={setValue2}
            onSearch={(v) => console.log('Search:', v)}
            placeholder="商品を検索"
          />
        </div>

        <div className="w-[768px]">
          <h3 className="text-sm font-semibold mb-2">Large (768px)</h3>
          <SearchBar
            value={value3}
            onChange={setValue3}
            onSearch={(v) => console.log('Search:', v)}
            placeholder="商品を検索"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// キーボードナビゲーション
export const KeyboardNavigation = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');

    return (
      <div className="w-full max-w-2xl space-y-4">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={(value) => console.log('Search:', value)}
          placeholder="商品を検索"
        />

        <div className="border rounded-lg p-4 bg-blue-50 text-sm">
          <h3 className="font-semibold mb-2">💡 キーボード操作</h3>
          <ul className="space-y-1 text-gray-700">
            <li>• Enterキー: 検索を実行</li>
            <li>• Escキー: フォーカスを外す</li>
            <li>• クリアボタン: 入力テキストをクリア</li>
          </ul>
        </div>
      </div>
    );
  },
};

// フォーカス状態
export const FocusStates = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('検索中...');

    return (
      <div className="space-y-6">
        <div className="w-96">
          <h3 className="text-sm font-semibold mb-2">通常状態</h3>
          <SearchBar
            value={value1}
            onChange={setValue1}
            onSearch={(v) => console.log('Search:', v)}
            placeholder="商品を検索"
          />
        </div>

        <div className="w-96">
          <h3 className="text-sm font-semibold mb-2">入力済み（クリアボタン表示）</h3>
          <SearchBar
            value={value2}
            onChange={setValue2}
            onSearch={(v) => console.log('Search:', v)}
            placeholder="商品を検索"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// エラー状態の例
export const WithValidation = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState('');

    const handleSearch = (value) => {
      if (value.length < 2) {
        setError('2文字以上入力してください');
      } else {
        setError('');
        console.log('Searching for:', value);
      }
    };

    return (
      <div className="w-full max-w-2xl space-y-2">
        <SearchBar
          value={searchValue}
          onChange={(value) => {
            setSearchValue(value);
            if (error && value.length >= 2) setError('');
          }}
          onSearch={handleSearch}
          placeholder="商品を検索（2文字以上）"
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  },
};
