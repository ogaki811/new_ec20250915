import { useState } from 'react';
import Pagination from '@/components/common/Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: '現在のページ番号',
    },
    totalPages: {
      control: 'number',
      description: '総ページ数',
    },
    onPageChange: {
      description: 'ページ変更時のコールバック',
    },
  },
};

export default meta;

// 最初のページ（1/10）
export const FirstPage = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 2ページ目（2/10）
export const SecondPage = {
  args: {
    currentPage: 2,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 中間ページ（5/10）
export const MiddlePage = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 最後から2番目（9/10）
export const SecondToLastPage = {
  args: {
    currentPage: 9,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 最後のページ（10/10）
export const LastPage = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 少ないページ数（1/3）
export const FewPages = {
  args: {
    currentPage: 1,
    totalPages: 3,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 7ページ以下（1/7）
export const SevenPages = {
  args: {
    currentPage: 1,
    totalPages: 7,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 多数のページ（1/100）
export const ManyPages = {
  args: {
    currentPage: 1,
    totalPages: 100,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 多数のページ - 中間（50/100）
export const ManyPagesMiddle = {
  args: {
    currentPage: 50,
    totalPages: 100,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 単一ページ（1/1）
export const SinglePage = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// インタラクティブ例
export const Interactive = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ページ {currentPage} / {totalPages}
          </p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

// 商品一覧での使用例
export const WithProductList = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;
    const itemsPerPage = 6;

    const allProducts = Array.from({ length: totalPages * itemsPerPage }, (_, i) => ({
      id: i + 1,
      name: `商品 ${i + 1}`,
      price: Math.floor(Math.random() * 10000) + 1000,
    }));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = allProducts.slice(startIndex, endIndex);

    return (
      <div className="w-full max-w-6xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">商品一覧</h2>
          <p className="text-sm text-gray-600">
            全{allProducts.length}件中 {startIndex + 1}-{Math.min(endIndex, allProducts.length)}件を表示
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <div className="bg-gray-200 h-48 rounded mb-3"></div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">¥{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 検索結果での使用例
export const WithSearchResults = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 8;

    return (
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">「ワイヤレス」の検索結果</h2>
          <p className="text-sm text-gray-600">約123件の商品が見つかりました</p>
        </div>

        <div className="space-y-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 border rounded-lg p-4">
              <div className="flex-shrink-0 w-32 h-32 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">商品名 {i + (currentPage - 1) * 5}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  商品の説明がここに入ります。魅力的な商品の特徴を簡潔に記載します。
                </p>
                <p className="text-lg font-bold text-blue-600">¥12,800</p>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 注文履歴での使用例
export const WithOrderHistory = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">注文履歴</h2>

        <div className="space-y-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">注文番号: #{12345 + i + (currentPage - 1) * 3}</h3>
                  <p className="text-sm text-gray-600">2025年10月{i}日</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  配達済み
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <p className="font-medium">商品名</p>
                    <p className="text-sm text-gray-600">数量: 1</p>
                  </div>
                  <p className="font-bold">¥12,800</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 全パターン一覧
export const AllPatterns = {
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold mb-3">最初のページ（1/10）</h3>
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">中間ページ（5/10）</h3>
        <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">最後のページ（10/10）</h3>
        <Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">少ないページ（2/3）</h3>
        <Pagination currentPage={2} totalPages={3} onPageChange={() => {}} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">多数のページ（50/100）</h3>
        <Pagination currentPage={50} totalPages={100} onPageChange={() => {}} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">単一ページ（1/1）</h3>
        <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// ページサイズ選択付き
export const WithPageSize = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const totalItems = 237;
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageSizeChange = (newSize) => {
      setPageSize(newSize);
      setCurrentPage(1);
    };

    return (
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            全{totalItems}件中 {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, totalItems)}件を表示
          </p>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">表示件数:</label>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value={10}>10件</option>
              <option value={20}>20件</option>
              <option value={50}>50件</option>
              <option value={100}>100件</option>
            </select>
          </div>
        </div>

        <div className="border rounded-lg p-4 min-h-[200px] flex items-center justify-center text-gray-400">
          コンテンツ表示エリア（{pageSize}件/ページ）
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// スクロールトップ付き
export const WithScrollToTop = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const handlePageChange = (page) => {
      setCurrentPage(page);
      // 実際のアプリではwindow.scrollTo(0, 0)を実行
      console.log('Scrolling to top and navigating to page:', page);
    };

    return (
      <div className="w-full max-w-4xl space-y-6">
        <div className="border rounded-lg p-4 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-4">
            ページ {currentPage} のコンテンツ
          </h3>
          <p className="text-gray-600">
            ページを切り替えると、自動的に最上部にスクロールします。
          </p>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
