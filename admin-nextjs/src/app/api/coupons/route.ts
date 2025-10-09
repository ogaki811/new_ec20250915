import { NextRequest, NextResponse } from 'next/server';
import couponsData from '@/data/coupons.json';
import type { Coupon } from '@/types/coupon';

// GET /api/coupons - クーポン一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // パラメータ取得
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';

    // フィルタリング
    let filteredCoupons: Coupon[] = couponsData as Coupon[];

    // 検索（コード・名前）
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCoupons = filteredCoupons.filter(
        (c) =>
          c.code.toLowerCase().includes(searchLower) ||
          c.name.toLowerCase().includes(searchLower)
      );
    }

    // タイプフィルター
    if (type) {
      filteredCoupons = filteredCoupons.filter((c) => c.type === type);
    }

    // ステータスフィルター
    if (status) {
      filteredCoupons = filteredCoupons.filter((c) => c.status === status);
    }

    // 作成日順にソート（新しい順）
    filteredCoupons.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // ページネーション
    const total = filteredCoupons.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCoupons = filteredCoupons.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedCoupons,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Coupons API error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
