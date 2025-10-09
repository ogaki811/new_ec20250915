'use client';

import { useState, useEffect } from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import type { Coupon, CouponType, CouponStatus } from '@/types/coupon';

interface CouponsResponse {
  success: boolean;
  data: Coupon[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const typeLabels: Record<CouponType, string> = {
  percentage: '割引率',
  fixed_amount: '固定額',
  free_shipping: '送料無料',
};

const statusLabels: Record<CouponStatus, string> = {
  active: '有効',
  inactive: '無効',
  expired: '期限切れ',
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
  });

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.type && { type: filters.type }),
        ...(filters.status && { status: filters.status }),
      });

      const response = await fetch(`/api/coupons?${params}`);
      const data: CouponsResponse = await response.json();

      if (data.success) {
        setCoupons(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Fetch coupons error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, filters]);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchCoupons();
  };

  const handleReset = () => {
    setFilters({ search: '', type: '', status: '' });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const getStatusBadgeVariant = (status: CouponStatus) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'expired':
        return 'error';
    }
  };

  const getDiscountDisplay = (coupon: Coupon) => {
    switch (coupon.type) {
      case 'percentage':
        return `${coupon.discountValue}% OFF`;
      case 'fixed_amount':
        return `¥${coupon.discountValue.toLocaleString()} OFF`;
      case 'free_shipping':
        return '送料無料';
    }
  };

  const getUsageDisplay = (coupon: Coupon) => {
    if (coupon.usageLimit === null) {
      return `${coupon.usedCount}回 / 無制限`;
    }
    return `${coupon.usedCount}回 / ${coupon.usageLimit}回`;
  };

  return (
    <div className="admin-container py-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">クーポン管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            クーポンの作成と管理を行います
          </p>
        </div>
        <Button variant="primary">+ 新規作成</Button>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              type="search"
              placeholder="クーポンコード・名前で検索"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              fullWidth
            />
          </div>
          <Select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            fullWidth
          >
            <option value="">全タイプ</option>
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            fullWidth
          >
            <option value="">全ステータス</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="primary" size="sm" onClick={handleSearch}>
            検索
          </Button>
          <Button variant="secondary" size="sm" onClick={handleReset}>
            リセット
          </Button>
        </div>
      </div>

      {/* クーポン一覧 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  クーポンコード
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  クーポン名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  割引内容
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  最低購入額
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  使用状況
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  有効期限
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ステータス
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    読み込み中...
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    クーポンが見つかりません
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono font-semibold text-gray-900">
                        {coupon.code}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {coupon.name}
                      </div>
                      {coupon.description && (
                        <div className="text-xs text-gray-500">{coupon.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600">
                        {getDiscountDisplay(coupon)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {coupon.minPurchaseAmount
                        ? `¥${coupon.minPurchaseAmount.toLocaleString()}`
                        : '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getUsageDisplay(coupon)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-500">
                        {new Date(coupon.validFrom).toLocaleDateString('ja-JP')}
                        <br />〜{' '}
                        {new Date(coupon.validUntil).toLocaleDateString('ja-JP')}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(coupon.status)}>
                        {statusLabels[coupon.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2 justify-end">
                        <Button variant="secondary" size="sm">
                          編集
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ページネーション */}
      {!loading && coupons.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            <span className="font-medium">{pagination.total}</span> 件中{' '}
            <span className="font-medium">
              {(pagination.page - 1) * pagination.limit + 1}
            </span>{' '}
            -{' '}
            <span className="font-medium">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{' '}
            件を表示
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              前へ
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
            >
              次へ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
