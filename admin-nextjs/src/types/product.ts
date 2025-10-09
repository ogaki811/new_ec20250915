// 商品型定義（smartsample-nextjsと互換性あり）

export type Category = '文具・事務用品' | '家具' | '電化製品' | '収納用品';

export type Tag = '人気' | '高評価' | '新商品' | 'セール';

export interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  images: string[];
  brand: string;
  category: Category;
  stock: boolean | number;
  rating: number;
  tags: Tag[];
  // 管理画面用追加フィールド
  description?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  tags?: string[];
  search?: string;
  published?: boolean;
}

export type ProductSortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'created-desc'
  | 'created-asc';
