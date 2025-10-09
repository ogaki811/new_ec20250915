// 注文ステータス
export type OrderStatus =
  | 'pending' // 保留
  | 'processing' // 処理中
  | 'shipped' // 発送済み
  | 'delivered' // 配達完了
  | 'cancelled'; // キャンセル

// 支払いステータス
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// 支払い方法
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'cash_on_delivery';

// 配送方法
export type ShippingMethod = 'standard' | 'express' | 'overnight';

// 注文商品
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  price: number;
  quantity: number;
  subtotal: number;
  image?: string;
}

// 配送先情報
export interface ShippingAddress {
  name: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building?: string;
  phone: string;
}

// 注文
export interface Order {
  id: string;
  orderNumber: string; // 注文番号（例: ORD-20250101-0001）
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number; // 小計
  tax: number; // 税額
  shippingFee: number; // 送料
  total: number; // 合計
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  shippingAddress: ShippingAddress;
  notes?: string; // 備考
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

// 注文フィルター
export interface OrderFilters {
  search?: string; // 注文番号・顧客名で検索
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  dateFrom?: string;
  dateTo?: string;
}
