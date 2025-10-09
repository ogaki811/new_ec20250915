// 管理者型定義

export type AdminRole = 'super_admin' | 'admin' | 'operator';

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSession {
  admin: Admin;
  token: string;
  expiresAt: string;
}
