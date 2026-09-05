import api from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { User } from '@/types/user';

export interface UpdateProfileDto {
  name?: string;
  bio?: string;
}

export const usersService = {
  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<User> {
    const { data } = await api.put<User>(endpoints.users.update(userId), dto);
    return data;
  },

  async follow(userId: string): Promise<void> {
    await api.post(endpoints.users.follow(userId));
  },
};
