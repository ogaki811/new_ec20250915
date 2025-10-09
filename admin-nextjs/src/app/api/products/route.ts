import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import type { Product, ProductFilters } from '@/types/product';
import fs from 'fs/promises';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/products.json');

// GET /api/products - 商品一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // パラメータ取得
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const brand = searchParams.get('brand') || '';
    const inStock = searchParams.get('inStock');

    // フィルタリング
    let filteredProducts: Product[] = productsData as Product[];

    // 検索
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.code.toLowerCase().includes(searchLower)
      );
    }

    // カテゴリフィルター
    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    // ブランドフィルター
    if (brand) {
      filteredProducts = filteredProducts.filter((p) => p.brand === brand);
    }

    // 在庫フィルター
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter((p) => {
        if (typeof p.stock === 'number') {
          return p.stock > 0;
        }
        return p.stock === true;
      });
    }

    // ページネーション
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// POST /api/products - 商品新規作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 既存データを読み込み
    const fileContent = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    const products: Product[] = JSON.parse(fileContent);

    // 新しいIDを生成（最大ID + 1）
    const maxId = products.reduce((max, p) => {
      const id = parseInt(p.id);
      return id > max ? id : max;
    }, 0);
    const newId = (maxId + 1).toString();

    // 新商品を作成
    const newProduct: Product = {
      id: newId,
      name: body.name,
      code: body.code,
      price: body.price,
      image: body.image || '/img/product/default.jpg',
      images: body.images || ['/img/product/default.jpg'],
      brand: body.brand,
      category: body.category,
      stock: body.stock,
      rating: body.rating || 0,
      tags: body.tags || [],
      description: body.description || '',
      published: body.published ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 商品を追加
    products.push(newProduct);

    // ファイルに書き込み
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: '商品を登録しました',
      data: newProduct,
    });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
