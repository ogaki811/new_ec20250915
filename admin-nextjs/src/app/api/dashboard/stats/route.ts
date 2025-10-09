import { NextResponse } from 'next/server';
import productsData from '@/data/products.json';

export async function GET() {
  try {
    // 在庫切れ商品をカウント
    const outOfStock = productsData.filter((p) => {
      if (typeof p.stock === 'number') {
        return p.stock === 0;
      }
      return p.stock === false;
    }).length;

    // 模擬データ（実際は注文データから計算）
    const stats = {
      totalSales: 125000,
      todayOrders: 24,
      pendingOrders: 15,
      outOfStock,
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
