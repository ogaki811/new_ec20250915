import { NextRequest, NextResponse } from 'next/server';
import ordersData from '@/data/orders.json';
import type { Order } from '@/types/order';

// GET /api/orders - 注文一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // パラメータ取得
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const paymentStatus = searchParams.get('paymentStatus') || '';

    // フィルタリング
    let filteredOrders: Order[] = ordersData as Order[];

    // 検索（注文番号・顧客名）
    if (search) {
      const searchLower = search.toLowerCase();
      filteredOrders = filteredOrders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchLower) ||
          o.customerName.toLowerCase().includes(searchLower) ||
          o.customerEmail.toLowerCase().includes(searchLower)
      );
    }

    // ステータスフィルター
    if (status) {
      filteredOrders = filteredOrders.filter((o) => o.status === status);
    }

    // 支払いステータスフィルター
    if (paymentStatus) {
      filteredOrders = filteredOrders.filter((o) => o.paymentStatus === paymentStatus);
    }

    // 日付順にソート（新しい順）
    filteredOrders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // ページネーション
    const total = filteredOrders.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedOrders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
