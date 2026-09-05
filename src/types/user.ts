export type UserRole = 'CLIENTE' | 'COACH' | 'ADMIN' | 'SUPERADMIN';
export type UserTier = 'FREE' | 'PREMIUM' | 'PRO_COACHING';

export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  profilePicture?: string;
  role: UserRole;
  tier: UserTier;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tier: UserTier;
  accessToken: string;
  refreshToken: string;
}
