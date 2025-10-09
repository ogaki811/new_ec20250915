import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const BANNER_CONFIG_FILE = path.join(process.cwd(), 'src/data/banner-config.json');

// バナー設定を取得
export async function GET() {
  try {
    const fileContent = await fs.readFile(BANNER_CONFIG_FILE, 'utf-8');
    const config = JSON.parse(fileContent);

    return NextResponse.json({
      success: true,
      data: config,
    });
  } catch (error) {
    // ファイルが存在しない場合はデフォルト設定を返す
    const defaultConfig = {
      enabled: false,
      message: '',
      variant: 'info',
      dismissible: true,
      actionLabel: '',
      actionUrl: '',
    };

    // デフォルト設定でファイルを作成
    await fs.writeFile(BANNER_CONFIG_FILE, JSON.stringify(defaultConfig, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      data: defaultConfig,
    });
  }
}

// バナー設定を保存
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

    const validVariants = ['info', 'warning', 'error', 'success'];
    if (!validVariants.includes(config.variant)) {
      return NextResponse.json(
        { success: false, message: '無効なバナータイプです' },
        { status: 400 }
      );
    }

    // 設定を保存
    await fs.writeFile(BANNER_CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      data: config,
    });
  } catch (error) {
    console.error('Banner config save error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
