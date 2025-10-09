import bcrypt from 'bcryptjs';

/**
 * パスワードをハッシュ化
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * パスワードを検証
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * シンプルなJWTトークン生成（開発用）
 */
export function generateToken(adminId: string): string {
  const payload = {
    adminId,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24時間
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * トークン検証（開発用）
 */
export function verifyToken(token: string): { adminId: string } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Date.now()) {
      return null; // 期限切れ
    }
    return { adminId: payload.adminId };
  } catch {
    return null;
  }
}
