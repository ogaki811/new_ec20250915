'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import MyPageSidebar from '@/components/mypage/MyPageSidebar';
import Badge from '@/components/ui/Badge';
import { Button } from '@/components/ui';
import OrderDetailModal from '@/components/order/OrderDetailModal';
import useAuthStore from '@/store/useAuthStore';

interface OrderItem {
  name: string;
  code: string;
  price: string;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  statusVariant: 'primary' | 'success' | 'warning' | 'danger';
  total: string;
  items: OrderItem[];
  shippingAddress?: {
    name: string;
    postalCode: string;
    address: string;
    phone: string;
  };
  subtotal?: string;
  shippingFee?: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [periodFilter, setPeriodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // デモ用の注文データ
  const allOrders: Order[] = [
    {
      id: '20240115-001',
      date: '2024年1月15日',
      status: '配送中',
      statusVariant: 'primary',
      total: '15,980',
      subtotal: '15,980',
      shippingFee: '0',
      items: [
        { name: 'A4コピー用紙 5000枚', code: 'AWA4132', price: '7,990', quantity: 2, image: 'AWA4132_l1.jpg' }
      ],
      shippingAddress: {
        name: '山田 太郎',
        postalCode: '100-0001',
        address: '東京都千代田区千代田1-1-1',
        phone: '090-1234-5678'
      }
    },
    {
      id: '20240110-002',
      date: '2024年1月10日',
      status: '配送完了',
      statusVariant: 'success',
      total: '8,500',
      subtotal: '8,500',
      shippingFee: '0',
      items: [
        { name: 'オフィスチェア', code: 'AW75238', price: '8,500', quantity: 1, image: 'AW75238_l1.jpg' }
      ],
      shippingAddress: {
        name: '山田 太郎',
        postalCode: '100-0001',
        address: '東京都千代田区千代田1-1-1',
        phone: '090-1234-5678'
      }
    },
    {
      id: '20240105-003',
      date: '2024年1月5日',
      status: '配送完了',
      statusVariant: 'success',
      total: '3,200',
      subtotal: '3,200',
      shippingFee: '0',
      items: [
        { name: 'ボールペン 10本セット', code: '8027341', price: '1,200', quantity: 1, image: '8027341_l1.jpg' },
        { name: 'クリアファイル 20枚', code: 'AH85168', price: '2,000', quantity: 1, image: 'AH85168_l1.jpg' }
      ],
      shippingAddress: {
        name: '山田 太郎',
        postalCode: '100-0001',
        address: '東京都千代田区千代田1-1-1',
        phone: '090-1234-5678'
      }
    }
  ];

  // フィルタリング
  const filteredOrders = useMemo(() => {
    let results = allOrders;

    if (statusFilter !== 'all') {
      results = results.filter(order => order.status === statusFilter);
    }

    // 期間フィルタは実際の実装では日付計算が必要
    // ここではデモなので省略

    return results;
  }, [statusFilter, periodFilter]);

  // ページネーション
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="ec-order-history min-h-screen bg-gray-50 py-8">
        <div className="ec-order-history__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />

          <div className="ec-order-history__layout lg:grid lg:grid-cols-4 lg:gap-8 mt-8">
            {/* サイドバー */}
            <MyPageSidebar />

            {/* メインコンテンツ */}
            <div className="ec-order-history__content lg:col-span-3 mt-8 lg:mt-0">
              <div className="ec-order-history__card bg-white rounded-lg shadow-sm p-8">
                <h1 className="ec-order-history__title text-3xl font-medium text-gray-900 mb-8 pb-2 border-b-2 border-blue-600">
                  注文履歴
                </h1>

                {/* フィルター */}
                <div className="ec-order-history__filters mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="ec-order-history__filter-field">
                    <label className="ec-order-history__filter-label block text-sm font-medium text-gray-700 mb-2">
                      期間
                    </label>
                    <select
                      value={periodFilter}
                      onChange={(e) => setPeriodFilter(e.target.value)}
                      className="ec-order-history__filter-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">すべて</option>
                      <option value="1month">過去1ヶ月</option>
                      <option value="3months">過去3ヶ月</option>
                      <option value="6months">過去6ヶ月</option>
                      <option value="1year">過去1年</option>
                    </select>
                  </div>
                  <div className="ec-order-history__filter-field">
                    <label className="ec-order-history__filter-label block text-sm font-medium text-gray-700 mb-2">
                      ステータス
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="ec-order-history__filter-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">すべて</option>
                      <option value="注文確認中">注文確認中</option>
                      <option value="配送準備中">配送準備中</option>
                      <option value="配送中">配送中</option>
                      <option value="配送完了">配送完了</option>
                      <option value="キャンセル">キャンセル</option>
                    </select>
                  </div>
                </div>

                {/* 注文リスト */}
                <div className="ec-order-history__orders-list space-y-6">
                  {paginatedOrders.map((order) => (
                    <div key={order.id} className="ec-order-history__order-card border border-gray-200 rounded-lg p-6">
                      {/* 注文ヘッダー */}
                      <div className="ec-order-history__order-header flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b border-gray-200">
                        <div className="ec-order-history__order-info mb-4 md:mb-0">
                          <p className="ec-order-history__order-number font-semibold text-gray-900 text-lg">
                            注文番号: {order.id}
                          </p>
                          <p className="ec-order-history__order-date text-sm text-gray-600 mt-1">
                            {order.date}
                          </p>
                        </div>
                        <div className="ec-order-history__order-actions flex items-center space-x-4">
                          <Badge variant={order.statusVariant}>
                            {order.status}
                          </Badge>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleViewDetail(order)}
                          >
                            詳細を見る
                          </Button>
                        </div>
                      </div>

                      {/* 注文商品 */}
                      <div className="ec-order-history__items space-y-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="ec-order-history__item flex items-center space-x-4">
                            <img
                              src={`/img/product/${item.image}`}
                              alt={item.name}
                              className="ec-order-history__item-image w-24 h-24 object-cover rounded"
                            />
                            <div className="ec-order-history__item-details flex-1">
                              <p className="ec-order-history__item-name font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="ec-order-history__item-code text-sm text-gray-600">
                                商品コード: {item.code}
                              </p>
                              <p className="ec-order-history__item-quantity text-sm text-gray-600">
                                数量: {item.quantity}
                              </p>
                            </div>
                            <div className="ec-order-history__item-price-wrapper text-right">
                              <p className="ec-order-history__item-price text-lg font-bold text-gray-900">
                                ¥{item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 合計 */}
                      <div className="ec-order-history__total mt-6 pt-4 border-t border-gray-200">
                        <div className="ec-order-history__total-wrapper flex justify-between items-center">
                          <p className="ec-order-history__total-label text-lg font-semibold text-gray-900">
                            合計金額
                          </p>
                          <p className="ec-order-history__total-amount text-2xl font-bold text-gray-900">
                            ¥{order.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 注文がない場合 */}
                {paginatedOrders.length === 0 && (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-gray-600">注文履歴がありません</p>
                  </div>
                )}

                {/* ページネーション */}
                {totalPages > 1 && (
                  <div className="ec-order-history__pagination mt-8 flex justify-center">
                    <nav className="ec-order-history__pagination-nav flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="ec-order-history__pagination-button px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        前へ
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`ec-order-history__pagination-button px-4 py-2 rounded-lg ${
                            currentPage === page
                              ? 'ec-order-history__pagination-button--active bg-blue-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="ec-order-history__pagination-button px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        次へ
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* 注文詳細モーダル */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
