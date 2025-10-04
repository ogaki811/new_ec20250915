import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,

      // Actions
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set({
          user: { ...get().user, ...userData },
        });
      },

      isLoggedIn: () => {
        return get().isAuthenticated;
      },
    }),
    {
      name: 'auth-storage', // LocalStorage key
    }
  )
);

export default useAuthStore;
