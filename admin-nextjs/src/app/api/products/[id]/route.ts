import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import type { Product } from '@/types/product';
import fs from 'fs/promises';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/products.json');

// GET /api/products/[id] - 商品詳細取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = productsData.find((p) => p.id === params.id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: '商品が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - 商品更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // 既存データを読み込み
    const fileContent = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    const products: Product[] = JSON.parse(fileContent);

    const index = products.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: '商品が見つかりません' },
        { status: 404 }
      );
    }

    // 商品を更新
    const updatedProduct: Product = {
      ...products[index],
      ...body,
      id: params.id, // IDは変更不可
      updatedAt: new Date().toISOString(),
    };

    products[index] = updatedProduct;

    // ファイルに書き込み
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: '商品を更新しました',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - 商品削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 既存データを読み込み
    const fileContent = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    const products: Product[] = JSON.parse(fileContent);

    const index = products.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: '商品が見つかりません' },
        { status: 404 }
      );
    }

    // 商品を削除
    products.splice(index, 1);

    // ファイルに書き込み
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: '商品を削除しました',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
