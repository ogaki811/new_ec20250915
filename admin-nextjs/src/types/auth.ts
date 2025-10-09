// 認証関連型定義

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  admin?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  admin: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
  token: string | null;
}
