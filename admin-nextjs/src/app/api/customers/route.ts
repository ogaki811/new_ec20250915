import { NextRequest, NextResponse } from 'next/server';
import customersData from '@/data/customers.json';
import type { Customer } from '@/types/customer';

// GET /api/customers - 顧客一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // パラメータ取得
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const rank = searchParams.get('rank') || '';

    // フィルタリング
    let filteredCustomers: Customer[] = customersData as Customer[];

    // 検索（名前・メール）
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower) ||
          (c.nameKana && c.nameKana.toLowerCase().includes(searchLower))
      );
    }

    // ステータスフィルター
    if (status) {
      filteredCustomers = filteredCustomers.filter((c) => c.status === status);
    }

    // ランクフィルター
    if (rank) {
      filteredCustomers = filteredCustomers.filter((c) => c.rank === rank);
    }

    // 最終注文日順にソート（新しい順）
    filteredCustomers.sort((a, b) => {
      const dateA = a.lastOrderAt ? new Date(a.lastOrderAt).getTime() : 0;
      const dateB = b.lastOrderAt ? new Date(b.lastOrderAt).getTime() : 0;
      return dateB - dateA;
    });

    // ページネーション
    const total = filteredCustomers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedCustomers,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Customers API error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
