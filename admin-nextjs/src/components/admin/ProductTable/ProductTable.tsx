'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Checkbox from '@/components/ui/Checkbox';
import Icon from '@/components/ui/Icon';
import type { Product } from '@/types/product';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(products.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const isAllSelected = products.length > 0 && selectedIds.length === products.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < products.length;

  // ローディング時のスケルトン
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  画像
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  商品名 / コード
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  価格
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  在庫
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  カテゴリ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ブランド
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-4">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-16 h-16 bg-gray-200 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2 justify-end">
                      <div className="w-12 h-8 bg-gray-200 rounded animate-pulse" />
                      <div className="w-12 h-8 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 空の状態
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Icon name="package" size={64} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            商品が見つかりません
          </h3>
          <p className="text-gray-500">
            検索条件を変更するか、新しい商品を登録してください
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left w-12">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                画像
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名 / コード
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                価格
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                在庫
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                カテゴリ
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ブランド
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              const stockValue =
                typeof product.stock === 'number' ? product.stock : product.stock ? 1 : 0;
              const inStock = stockValue > 0;

              return (
                <tr
                  key={product.id}
                  className={isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={isSelected}
                      onChange={(e) => handleSelectOne(product.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">{product.code}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ¥{product.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge variant={inStock ? 'success' : 'error'}>
                      {inStock
                        ? `在庫あり${typeof product.stock === 'number' ? ` (${product.stock})` : ''}`
                        : '在庫なし'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.brand}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(product.id)}
                      >
                        編集
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                      >
                        削除
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
