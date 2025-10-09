import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const BANNERS_FILE = path.join(process.cwd(), 'src/data/banners.json');

// 特定のバナーを取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileContent = await fs.readFile(BANNERS_FILE, 'utf-8');
    const banners = JSON.parse(fileContent);
    const banner = banners.find((b: any) => b.id === params.id);

    if (!banner) {
      return NextResponse.json(
        { success: false, message: 'バナーが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error('Banner get error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// バナーを更新（フル更新）
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();

    // バリデーション
    if (!updates.message || typeof updates.message !== 'string') {
      return NextResponse.json(
        { success: false, message: 'メッセージは必須です' },
        { status: 400 }
      );
    }

    if (!updates.imageUrl || typeof updates.imageUrl !== 'string') {
      return NextResponse.json(
        { success: false, message: '画像は必須です' },
        { status: 400 }
      );
    }

    const validVariants = ['info', 'warning', 'error', 'success'];
    if (!validVariants.includes(updates.variant)) {
      return NextResponse.json(
        { success: false, message: '無効なバナータイプです' },
        { status: 400 }
      );
    }

    // 日付のバリデーション
    if (updates.publishStartDate && updates.publishEndDate) {
      const startDate = new Date(updates.publishStartDate);
      const endDate = new Date(updates.publishEndDate);
      if (startDate >= endDate) {
        return NextResponse.json(
          { success: false, message: '公開終了日時は公開開始日時より後に設定してください' },
          { status: 400 }
        );
      }
    }

    const fileContent = await fs.readFile(BANNERS_FILE, 'utf-8');
    const banners = JSON.parse(fileContent);
    const index = banners.findIndex((b: any) => b.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'バナーが見つかりません' },
        { status: 404 }
      );
    }

    // 更新
    banners[index] = {
      ...banners[index],
      ...updates,
      id: params.id, // IDは変更不可
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(BANNERS_FILE, JSON.stringify(banners, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      data: banners[index],
    });
  } catch (error) {
    console.error('Banner update error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// バナーを部分更新（ステータス切り替えなど）
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const fileContent = await fs.readFile(BANNERS_FILE, 'utf-8');
    const banners = JSON.parse(fileContent);
    const index = banners.findIndex((b: any) => b.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'バナーが見つかりません' },
        { status: 404 }
      );
    }

    // 部分更新
    banners[index] = {
      ...banners[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(BANNERS_FILE, JSON.stringify(banners, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      data: banners[index],
    });
  } catch (error) {
    console.error('Banner patch error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// バナーを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileContent = await fs.readFile(BANNERS_FILE, 'utf-8');
    const banners = JSON.parse(fileContent);
    const filteredBanners = banners.filter((b: any) => b.id !== params.id);

    if (banners.length === filteredBanners.length) {
      return NextResponse.json(
        { success: false, message: 'バナーが見つかりません' },
        { status: 404 }
      );
    }

    await fs.writeFile(
      BANNERS_FILE,
      JSON.stringify(filteredBanners, null, 2),
      'utf-8'
    );

    return NextResponse.json({
      success: true,
      message: 'バナーを削除しました',
    });
  } catch (error) {
    console.error('Banner delete error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
