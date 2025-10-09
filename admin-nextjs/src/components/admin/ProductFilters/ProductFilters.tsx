'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    brand: string;
    inStock: string;
  }) => void;
}

const categories = ['', '文具・事務用品', '家具', '電化製品', '収納用品'];
const brands = ['', 'プラス', 'ゼブラ', 'ぺんてる', 'ロジクール', 'パナソニック'];

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [inStock, setInStock] = useState('');

  const handleSearch = () => {
    onFilterChange({ search, category, brand, inStock });
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setBrand('');
    setInStock('');
    onFilterChange({ search: '', category: '', brand: '', inStock: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 検索 */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="商品名・商品コードで検索"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            fullWidth
          />
        </div>

        {/* カテゴリ */}
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          <option value="">全カテゴリ</option>
          {categories.slice(1).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>

        {/* ブランド */}
        <Select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          fullWidth
        >
          <option value="">全ブランド</option>
          {brands.slice(1).map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Select>

        {/* 在庫 */}
        <Select
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
          fullWidth
        >
          <option value="">全て</option>
          <option value="true">在庫あり</option>
          <option value="false">在庫なし</option>
        </Select>
      </div>

      {/* ボタン */}
      <div className="flex gap-2 mt-4">
        <Button variant="primary" size="sm" onClick={handleSearch}>
          検索
        </Button>
        <Button variant="secondary" size="sm" onClick={handleReset}>
          リセット
        </Button>
      </div>
    </div>
  );
}
