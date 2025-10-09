'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import ImageUpload from '@/components/ui/ImageUpload';
import type { Product, Category, Tag } from '@/types/product';

interface ProductFormProps {
  product?: Product;
  mode: 'create' | 'edit';
}

const categories: Category[] = ['文具・事務用品', '家具', '電化製品', '収納用品'];
const brands = ['プラス', 'ゼブラ', 'ぺんてる', 'ロジクール', 'パナソニック'];
const allTags: Tag[] = ['人気', '高評価', '新商品', 'セール'];

export default function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: product?.name || '',
    code: product?.code || '',
    price: product?.price?.toString() || '',
    category: product?.category || '',
    brand: product?.brand || '',
    stock: product?.stock?.toString() || '',
    description: product?.description || '',
    published: product?.published ?? true,
    tags: product?.tags || [],
    image: product?.image || '',
    images: product?.images || [],
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '商品名を入力してください';
    }

    if (!formData.code.trim()) {
      newErrors.code = '商品コードを入力してください';
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = '有効な価格を入力してください';
    }

    if (!formData.category) {
      newErrors.category = 'カテゴリを選択してください';
    }

    if (!formData.brand) {
      newErrors.brand = 'ブランドを選択してください';
    }

    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = '有効な在庫数を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const url = mode === 'create' ? '/api/products' : `/api/products/${product?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          image: formData.image,
          images: formData.images,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/products');
      } else {
        setErrors({ submit: data.message || '保存に失敗しました' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({ submit: 'エラーが発生しました' });
    } finally {
      setLoading(false);
    }
  };

  const handleTagToggle = (tag: Tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errors.submit}
        </div>
      )}

      {/* 基本情報 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="商品名"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              placeholder="例: A4コピー用紙 5000枚"
              fullWidth
              required
            />
          </div>

          <Input
            label="商品コード"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            error={errors.code}
            placeholder="例: AWA4132"
            fullWidth
            required
          />

          <Input
            type="number"
            label="価格（円）"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            error={errors.price}
            placeholder="例: 7990"
            fullWidth
            required
          />

          <Select
            label="カテゴリ"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            error={errors.category}
            fullWidth
            required
          >
            <option value="">選択してください</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>

          <Select
            label="ブランド"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            error={errors.brand}
            fullWidth
            required
          >
            <option value="">選択してください</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>

          <Input
            type="number"
            label="在庫数"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            error={errors.stock}
            placeholder="例: 150"
            fullWidth
            required
          />

          <div className="md:col-span-2">
            <Textarea
              label="商品説明"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="商品の詳細説明を入力してください"
              fullWidth
            />
          </div>
        </div>
      </div>

      {/* 商品画像 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">商品画像</h2>
        <ImageUpload
          label="メイン画像"
          value={formData.image}
          onChange={(url) => setFormData({ ...formData, image: url as string })}
          helperText="商品のメイン画像を選択してください"
        />
        <div className="mt-6">
          <ImageUpload
            label="追加画像"
            value={formData.images}
            onChange={(urls) => setFormData({ ...formData, images: urls as string[] })}
            multiple
            maxFiles={5}
            helperText="最大5枚まで追加画像をアップロードできます"
          />
        </div>
      </div>

      {/* タグ */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">タグ</h2>
        <div className="flex flex-wrap gap-4">
          {allTags.map((tag) => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.tags.includes(tag)}
                onChange={() => handleTagToggle(tag)}
              />
              <span className="text-sm text-gray-700">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 公開設定 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">公開設定</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          />
          <span className="text-sm text-gray-700">この商品を公開する</span>
        </label>
      </div>

      {/* アクションボタン */}
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/products')}
          disabled={loading}
        >
          キャンセル
        </Button>
        <Button type="submit" variant="primary" loading={loading} disabled={loading}>
          {mode === 'create' ? '登録する' : '更新する'}
        </Button>
      </div>
    </form>
  );
}
