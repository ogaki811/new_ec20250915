import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth';
import adminsData from '@/data/admins.json';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'メールアドレスとパスワードを入力してください' },
        { status: 400 }
      );
    }

    // 管理者を検索
    const admin = adminsData.find((a) => a.email === email);
    console.log('Found admin:', admin ? 'yes' : 'no');

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'メールアドレスまたはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // アクティブチェック
    if (!admin.isActive) {
      console.log('Admin is not active');
      return NextResponse.json(
        { success: false, message: 'このアカウントは無効化されています' },
        { status: 403 }
      );
    }

    // パスワード検証
    console.log('Verifying password...');
    const isValidPassword = await verifyPassword(password, admin.password);
    console.log('Password valid:', isValidPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'メールアドレスまたはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // トークン生成
    const token = generateToken(admin.id);

    // レスポンス（パスワードを除外）
    const { password: _, ...adminWithoutPassword } = admin;

    return NextResponse.json({
      success: true,
      message: 'ログインしました',
      admin: adminWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
