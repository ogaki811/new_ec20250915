// 商品型定義

export interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  images: string[];
  brand: string;
  category: string;
  stock: boolean | number; // true/false または在庫数
  rating: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
  deletedAt?: number; // 削除時のタイムスタンプ（復元用）
}

export type Category = '文具・事務用品' | '家具' | '電化製品' | '収納用品';

export type Tag = '人気' | '高評価' | '新商品' | 'セール';

// 商品フィルター
export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  tags?: string[];
  search?: string;
}

// 商品ソート
export type ProductSortOption =
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'rating-desc'
  | 'newest';

// ページネーション
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
