import { useState } from 'react';
import Checkbox from '@/components/ui/Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    checked: {
      control: 'boolean',
      description: 'チェック状態',
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
    label: 'チェックボックス',
  },
};

// ラベルなし
export const WithoutLabel = {
  args: {},
};

// チェック済み
export const Checked = {
  args: {
    label: 'チェック済み',
    defaultChecked: true,
  },
};

// 未チェック
export const Unchecked = {
  args: {
    label: '未チェック',
    defaultChecked: false,
  },
};

// 無効状態
export const Disabled = {
  args: {
    label: '無効なチェックボックス',
    disabled: true,
  },
};

// 無効状態（チェック済み）
export const DisabledChecked = {
  args: {
    label: '無効（チェック済み）',
    disabled: true,
    defaultChecked: true,
  },
};

// エラー状態
export const WithError = {
  args: {
    label: '利用規約に同意する',
    error: 'この項目は必須です',
  },
};

// インタラクティブ例
export const Interactive = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-2">
        <Checkbox
          label="チェックボックスをクリック"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p className="text-sm text-gray-600">
          状態: {checked ? 'チェック済み' : '未チェック'}
        </p>
      </div>
    );
  },
};

// 全状態一覧
export const AllStates = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="未チェック" />
      <Checkbox label="チェック済み" defaultChecked />
      <Checkbox label="無効" disabled />
      <Checkbox label="無効（チェック済み）" disabled defaultChecked />
      <Checkbox label="エラー" error="この項目は必須です" />
    </div>
  ),
};

// チェックボックスグループ
export const CheckboxGroup = {
  render: () => {
    const [selected, setSelected] = useState(['react']);

    const options = [
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue.js' },
      { id: 'angular', label: 'Angular' },
      { id: 'svelte', label: 'Svelte' },
    ];

    const handleChange = (id) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    return (
      <div className="space-y-2">
        <h3 className="font-semibold mb-3">好きなフレームワークを選択</h3>
        {options.map((option) => (
          <Checkbox
            key={option.id}
            label={option.label}
            checked={selected.includes(option.id)}
            onChange={() => handleChange(option.id)}
          />
        ))}
        <p className="text-sm text-gray-600 mt-4">
          選択中: {selected.length > 0 ? selected.join(', ') : 'なし'}
        </p>
      </div>
    );
  },
};

// 利用規約同意
export const TermsAgreement = {
  render: () => {
    const [agreed, setAgreed] = useState(false);

    return (
      <div className="w-96 space-y-4">
        <div className="p-4 border rounded-lg bg-gray-50 max-h-40 overflow-y-auto">
          <h4 className="font-semibold mb-2">利用規約</h4>
          <p className="text-sm text-gray-600 mb-2">
            本サービスをご利用いただくにあたり、以下の利用規約をお読みいただき、同意いただく必要があります。
          </p>
          <p className="text-sm text-gray-600">
            1. 利用者は本サービスを適切に使用するものとします。
            <br />
            2. 本サービスの内容は予告なく変更される場合があります。
            <br />
            3. 利用者は自己責任において本サービスを利用するものとします。
          </p>
        </div>

        <Checkbox
          label={
            <span>
              利用規約に同意します{' '}
              <span className="text-red-600">*</span>
            </span>
          }
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />

        <button
          className={`w-full px-4 py-2 rounded-md transition-colors ${
            agreed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!agreed}
        >
          登録する
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// フィルタリング例
export const FilterExample = {
  render: () => {
    const [filters, setFilters] = useState({
      inStock: false,
      onSale: false,
      freeShipping: false,
    });

    const handleFilterChange = (key) => {
      setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="w-80">
        <h3 className="font-semibold mb-4">商品フィルタ</h3>

        <div className="space-y-3 mb-4">
          <Checkbox
            label="在庫あり"
            checked={filters.inStock}
            onChange={() => handleFilterChange('inStock')}
          />
          <Checkbox
            label="セール中"
            checked={filters.onSale}
            onChange={() => handleFilterChange('onSale')}
          />
          <Checkbox
            label="送料無料"
            checked={filters.freeShipping}
            onChange={() => handleFilterChange('freeShipping')}
          />
        </div>

        <div className="pt-4 border-t">
          <h4 className="text-sm font-semibold mb-2">適用中のフィルタ:</h4>
          <div className="flex gap-2 flex-wrap">
            {filters.inStock && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                在庫あり
              </span>
            )}
            {filters.onSale && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                セール中
              </span>
            )}
            {filters.freeShipping && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                送料無料
              </span>
            )}
            {!filters.inStock && !filters.onSale && !filters.freeShipping && (
              <span className="text-sm text-gray-500">フィルタなし</span>
            )}
          </div>
        </div>
      </div>
    );
  },
};

// TODOリスト例
export const TodoList = {
  render: () => {
    const [todos, setTodos] = useState([
      { id: 1, text: 'デザインレビュー', completed: true },
      { id: 2, text: 'コードレビュー', completed: false },
      { id: 3, text: 'ドキュメント更新', completed: false },
      { id: 4, text: 'テストコード作成', completed: false },
    ]);

    const handleToggle = (id) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

    return (
      <div className="w-96">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">タスクリスト</h3>
          <span className="text-sm text-gray-600">
            {todos.filter((t) => t.completed).length} / {todos.length} 完了
          </span>
        </div>

        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              <span
                className={`ml-3 ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-700'
                }`}
              >
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// メール設定例
export const EmailSettings = {
  render: () => {
    const [settings, setSettings] = useState({
      newsletter: true,
      updates: false,
      promotions: false,
      security: true,
    });

    const handleChange = (key) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="w-96">
        <h3 className="font-semibold mb-4">メール通知設定</h3>

        <div className="space-y-4">
          <div className="pb-3 border-b">
            <Checkbox
              label={
                <div>
                  <div className="font-medium">ニュースレター</div>
                  <div className="text-sm text-gray-600">
                    最新情報やお知らせをお届けします
                  </div>
                </div>
              }
              checked={settings.newsletter}
              onChange={() => handleChange('newsletter')}
            />
          </div>

          <div className="pb-3 border-b">
            <Checkbox
              label={
                <div>
                  <div className="font-medium">製品アップデート</div>
                  <div className="text-sm text-gray-600">
                    新機能やアップデート情報をお届けします
                  </div>
                </div>
              }
              checked={settings.updates}
              onChange={() => handleChange('updates')}
            />
          </div>

          <div className="pb-3 border-b">
            <Checkbox
              label={
                <div>
                  <div className="font-medium">プロモーション</div>
                  <div className="text-sm text-gray-600">
                    セールやクーポン情報をお届けします
                  </div>
                </div>
              }
              checked={settings.promotions}
              onChange={() => handleChange('promotions')}
            />
          </div>

          <div>
            <Checkbox
              label={
                <div>
                  <div className="font-medium">セキュリティ通知</div>
                  <div className="text-sm text-gray-600">
                    アカウントの重要な変更をお知らせします（推奨）
                  </div>
                </div>
              }
              checked={settings.security}
              onChange={() => handleChange('security')}
            />
          </div>
        </div>

        <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          設定を保存
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 全選択/全解除
export const SelectAll = {
  render: () => {
    const items = [
      { id: 1, name: '商品A' },
      { id: 2, name: '商品B' },
      { id: 3, name: '商品C' },
      { id: 4, name: '商品D' },
    ];

    const [selected, setSelected] = useState([]);

    const allSelected = selected.length === items.length;
    const someSelected = selected.length > 0 && selected.length < items.length;

    const handleSelectAll = () => {
      if (allSelected) {
        setSelected([]);
      } else {
        setSelected(items.map((item) => item.id));
      }
    };

    const handleSelectItem = (id) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    return (
      <div className="w-80">
        <div className="border rounded-lg overflow-hidden">
          <div className="p-3 bg-gray-50 border-b">
            <Checkbox
              label={
                <span className="font-semibold">
                  すべて選択 {someSelected && `(${selected.length}/${items.length})`}
                </span>
              }
              checked={allSelected}
              onChange={handleSelectAll}
            />
          </div>

          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="p-3 hover:bg-gray-50">
                <Checkbox
                  label={item.name}
                  checked={selected.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {selected.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              {selected.length}件選択中
            </p>
          </div>
        )}
      </div>
    );
  },
};
