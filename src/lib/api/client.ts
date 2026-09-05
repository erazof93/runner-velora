import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar JWT
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Rutas de autenticación: un 401 aquí significa "credenciales incorrectas",
// no "sesión expirada". Lo maneja el formulario, no el interceptor.
const AUTH_PATHS = ['/auth/login', '/auth/register', '/auth/refresh-token'];

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url: string = error.config?.url ?? '';
    const isAuthRequest = AUTH_PATHS.some((p) => url.includes(p));

    // Solo forzamos logout+redirect cuando una petición autenticada recibe 401
    // (sesión expirada). Nunca en el propio login/registro ni si ya no hay sesión.
    if (
      error.response?.status === 401 &&
      !isAuthRequest &&
      useAuthStore.getState().isAuthenticated
    ) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
