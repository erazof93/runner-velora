import { create } from 'zustand';
import type { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;

  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setIsAuthenticated: (authenticated: boolean) => void;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restoreSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,

  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),
  setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

  login: async (email: string, password: string) => {
    // TODO: Implementar login después
    console.log('Login:', email, password);
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  restoreSession: () => {
    const savedUser = localStorage.getItem('user');
    const savedAccessToken = localStorage.getItem('accessToken');

    if (savedUser && savedAccessToken) {
      try {
        const user = JSON.parse(savedUser);
        set({
          user,
          accessToken: savedAccessToken,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Error restoring session:', error);
      }
    }
  },
}));
