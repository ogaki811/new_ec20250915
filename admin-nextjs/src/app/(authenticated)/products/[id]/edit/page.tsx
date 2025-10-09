'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import Loading from '@/components/ui/Loading';
import type { Product } from '@/types/product';

export default function ProductEditPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();

        if (data.success && data.data) {
          setProduct(data.data);
        } else {
          setError('商品が見つかりません');
        }
      } catch (err) {
        console.error('Fetch product error:', err);
        setError('商品の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="admin-container py-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loading size="lg" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="admin-container py-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || '商品が見つかりません'}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">商品編集</h1>
        <p className="text-sm text-gray-500 mt-1">商品情報を編集します</p>
      </div>

      <ProductForm mode="edit" product={product} />
    </div>
  );
}
