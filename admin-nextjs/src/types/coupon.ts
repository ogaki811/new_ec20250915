// クーポンタイプ
export type CouponType = 'percentage' | 'fixed_amount' | 'free_shipping';

// クーポンステータス
export type CouponStatus = 'active' | 'inactive' | 'expired';

// クーポン
export interface Coupon {
  id: string;
  code: string; // クーポンコード（例: SUMMER2025）
  name: string; // クーポン名
  description?: string;
  type: CouponType;
  discountValue: number; // 割引額または割引率
  minPurchaseAmount?: number; // 最低購入金額
  maxDiscountAmount?: number; // 最大割引額（percentage用）
  usageLimit?: number; // 使用回数制限（null = 無制限）
  usedCount: number; // 使用済み回数
  validFrom: string; // 有効期間開始
  validUntil: string; // 有効期間終了
  status: CouponStatus;
  createdAt: string;
  updatedAt: string;
}

// クーポンフィルター
export interface CouponFilters {
  search?: string; // コード・名前で検索
  type?: CouponType;
  status?: CouponStatus;
}
