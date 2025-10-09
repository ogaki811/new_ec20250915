import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const BANNERS_FILE = path.join(process.cwd(), 'src/data/banners.json');

// バナー一覧を取得
export async function GET() {
  try {
    const fileContent = await fs.readFile(BANNERS_FILE, 'utf-8');
    const banners = JSON.parse(fileContent);

    return NextResponse.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    // ファイルが存在しない場合は空配列を返す
    await fs.writeFile(BANNERS_FILE, JSON.stringify([], null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      data: [],
    });
  }
}

// 新規バナーを作成
export async function POST(request: NextRequest) {
  try {
    const config = await request.json();

    // バリデーション
    if (!config.message || typeof config.message !== 'string') {
      return NextResponse.json(
        { success: false, message: 'メッセージは必須です' },
        { status: 400 }
      );
    }

    if (!config.imageUrl || typeof config.imageUrl !== 'string') {
      return NextResponse.json(
        { success: false, message: '画像は必須です' },
        { status: 400 }
      );
    }

    const validVariants = ['info', 'warning', 'error', 'success'];
    if (!validVariants.includes(config.variant)) {
      return NextResponse.json(
        { success: false, message: '無効なバナータイプです' },
        { status: 400 }
      );
    }

    // 日付のバリデーション（開始日が終了日より後の場合はエラー）
    if (config.publishStartDate && config.publishEndDate) {
      const startDate = new Date(config.publishStartDate);
      const endDate = new Date(config.publishEndDate);
      if (startDate >= endDate) {
        return NextResponse.json(
          { success: false, message: '公開終了日時は公開開始日時より後に設定してください' },
          { status: 400 }
        );
      }
    }

    // 既存のバナーを読み込む
    let banners = [];
    try {
      const fileContent = await fs.readFile(BANNERS_FILE, 'utf-8');
      banners = JSON.parse(fileContent);
    } catch {
      // ファイルが存在しない場合は空配列
    }

    // 新しいバナーを作成
    const newBanner = {
      id: uuidv4(),
      ...config,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    banners.push(newBanner);

    // 保存
    await fs.writeFile(BANNERS_FILE, JSON.stringify(banners, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      data: newBanner,
    });
  } catch (error) {
    console.error('Banner create error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
