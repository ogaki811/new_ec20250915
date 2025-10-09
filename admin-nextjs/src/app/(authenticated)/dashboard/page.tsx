'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface DashboardStats {
  totalSales: number;
  todayOrders: number;
  pendingOrders: number;
  outOfStock: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    todayOrders: 0,
    pendingOrders: 0,
    outOfStock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Fetch stats error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-container py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ダッシュボード</h1>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="今日の売上"
          value={`¥${stats.totalSales.toLocaleString()}`}
          icon="creditCard"
          color="blue"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="今日の注文"
          value={`${stats.todayOrders}件`}
          icon="cart"
          color="green"
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatsCard
          title="処理中の注文"
          value={`${stats.pendingOrders}件`}
          icon="package"
          color="yellow"
          trend={{ value: 5.2, isPositive: false }}
        />
        <StatsCard
          title="在庫切れ商品"
          value={`${stats.outOfStock}件`}
          icon="alert"
          color="red"
        />
      </div>

      {/* 最近の注文 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">最近の注文</h2>
          <div className="space-y-4">
            {[
              {
                id: '#12345',
                customer: '山田太郎',
                amount: 12500,
                status: 'pending',
                time: '5分前',
              },
              {
                id: '#12344',
                customer: '佐藤花子',
                amount: 8900,
                status: 'completed',
                time: '15分前',
              },
              {
                id: '#12343',
                customer: '鈴木一郎',
                amount: 15600,
                status: 'processing',
                time: '32分前',
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-semibold text-gray-900">
                    ¥{order.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{order.time}</p>
                </div>
                <Badge
                  variant={
                    order.status === 'completed'
                      ? 'success'
                      : order.status === 'processing'
                        ? 'warning'
                        : 'default'
                  }
                >
                  {order.status === 'completed'
                    ? '完了'
                    : order.status === 'processing'
                      ? '処理中'
                      : '保留'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">クイックアクション</h2>
          <div className="space-y-3">
            <a
              href="/products/new"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="font-medium text-gray-900">新規商品登録</p>
              <p className="text-sm text-gray-500 mt-1">新しい商品を追加</p>
            </a>
            <a
              href="/orders"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="font-medium text-gray-900">注文管理</p>
              <p className="text-sm text-gray-500 mt-1">注文の確認と処理</p>
            </a>
            <a
              href="/products"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="font-medium text-gray-900">在庫管理</p>
              <p className="text-sm text-gray-500 mt-1">在庫状況の確認</p>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
