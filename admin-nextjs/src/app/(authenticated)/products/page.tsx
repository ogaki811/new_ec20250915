'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ProductFilters from '@/components/admin/ProductFilters';
import ProductTable from '@/components/admin/ProductTable';
import type { Product } from '@/types/product';

interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    inStock: '',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.brand && { brand: filters.brand }),
        ...(filters.inStock && { inStock: filters.inStock }),
      });

      const response = await fetch(`/api/products?${params}`);
      const data: ProductsResponse = await response.json();

      if (data.success) {
        setProducts(data.data);
        setPagination(data.pagination);
      } else {
        toast.error('商品の取得に失敗しました');
      }
    } catch (error) {
      console.error('Fetch products error:', error);
      toast.error('商品の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleEdit = (id: string) => {
    router.push(`/products/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/products/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('商品を削除しました');
        setDeleteTarget(null);
        fetchProducts();
      } else {
        toast.error(data.message || '商品の削除に失敗しました');
      }
    } catch (error) {
      console.error('Delete product error:', error);
      toast.error('商品の削除に失敗しました');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="admin-container py-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            商品の登録・編集・削除を行います
          </p>
        </div>
        <Button variant="primary" onClick={() => router.push('/products/new')}>
          + 新規登録
        </Button>
      </div>

      {/* フィルター */}
      <ProductFilters onFilterChange={handleFilterChange} />

      {/* 商品一覧テーブル */}
      <ProductTable
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(id, name) => setDeleteTarget({ id, name })}
      />

      {/* ページネーション */}
      {!loading && products.length > 0 && (
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
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              前へ
            </Button>
            <div className="flex gap-1">
              {[...Array(pagination.totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // 最初、最後、現在のページ周辺のみ表示
                if (
                  pageNum === 1 ||
                  pageNum === pagination.totalPages ||
                  (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1)
                ) {
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === pagination.page ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                } else if (
                  pageNum === pagination.page - 2 ||
                  pageNum === pagination.page + 2
                ) {
                  return (
                    <span key={pageNum} className="px-2 py-1 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              次へ
            </Button>
          </div>
        </div>
      )}

      {/* 削除確認モーダル */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="商品の削除"
        message={`「${deleteTarget?.name}」を削除してもよろしいですか？この操作は取り消せません。`}
        confirmLabel="削除"
        cancelLabel="キャンセル"
        variant="error"
        isLoading={deleteLoading}
      />
    </div>
  );
}
