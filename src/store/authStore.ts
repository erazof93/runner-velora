import { create } from 'zustand';
import type { User, AuthResponse } from '@/types/user';
import api from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { loginSchema } from '@/lib/validators/auth';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  /** true hasta que restoreSession() haya corrido una vez (evita el flash a /login en un refresh). */
  isRestoring: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  setError: (error: string | null) => void;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restoreSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isRestoring: true,
  error: null,

  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),
  setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setError: (error) => set({ error }),

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      // Validar inputs
      const validated = loginSchema.parse({ email, password });

      // API request
      const response = await api.post<AuthResponse>(endpoints.auth.login, validated);
      const { accessToken, refreshToken, ...userData } = response.data;

      // Guardar en state
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        tier: userData.tier,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Login falló';

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      error: null,
    });

    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  restoreSession: () => {
    const savedUser = localStorage.getItem('user');
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedRefreshToken = localStorage.getItem('refreshToken');

    if (savedUser && savedAccessToken) {
      try {
        const user = JSON.parse(savedUser) as User;
        set({
          user,
          accessToken: savedAccessToken,
          refreshToken: savedRefreshToken,
          isAuthenticated: true,
          isRestoring: false,
        });
        return;
      } catch (error) {
        console.error('Error restoring session:', error);
      }
    }

    set({ isAuthenticated: false, isRestoring: false });
  },
}));
