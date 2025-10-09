'use client';

import ProductForm from '@/components/admin/ProductForm';

export default function ProductNewPage() {
  return (
    <div className="admin-container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">商品登録</h1>
        <p className="text-sm text-gray-500 mt-1">新しい商品を登録します</p>
      </div>

      <ProductForm mode="create" />
    </div>
  );
}
