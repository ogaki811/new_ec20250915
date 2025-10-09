'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (admin: AuthState['admin'], token: string) => void;
  logout: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      admin: null,
      token: null,
      isLoading: false,

      login: (admin, token) => {
        set({
          isAuthenticated: true,
          admin,
          token,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          admin: null,
          token: null,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        admin: state.admin,
        token: state.token,
      }),
    }
  )
);
