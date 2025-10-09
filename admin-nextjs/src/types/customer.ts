// 顧客ステータス
export type CustomerStatus = 'active' | 'inactive' | 'blocked';

// 顧客ランク
export type CustomerRank = 'bronze' | 'silver' | 'gold' | 'platinum';

// 顧客
export interface Customer {
  id: string;
  email: string;
  name: string;
  nameKana?: string;
  phone?: string;
  postalCode?: string;
  prefecture?: string;
  city?: string;
  address?: string;
  building?: string;
  status: CustomerStatus;
  rank: CustomerRank;
  totalOrders: number; // 総注文回数
  totalSpent: number; // 総購入金額
  lastOrderAt?: string; // 最終注文日
  registeredAt: string;
  updatedAt: string;
  notes?: string; // 管理者メモ
}

// 顧客フィルター
export interface CustomerFilters {
  search?: string; // 名前・メールで検索
  status?: CustomerStatus;
  rank?: CustomerRank;
}
