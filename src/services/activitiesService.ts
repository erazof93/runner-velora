import api from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { Activity, CreateActivityDto } from '@/lib/api/types';

export const activitiesService = {
  async getByUser(userId: string): Promise<Activity[]> {
    const { data } = await api.get<Activity[]>(endpoints.activities.getByUser(userId));
    return data;
  },

  async getById(id: string): Promise<Activity> {
    const { data } = await api.get<Activity>(endpoints.activities.getById(id));
    return data;
  },

  async create(dto: CreateActivityDto): Promise<Activity> {
    const { data } = await api.post<Activity>(endpoints.activities.create, dto);
    return data;
  },

  async update(id: string, dto: Partial<CreateActivityDto>): Promise<Activity> {
    const { data } = await api.put<Activity>(endpoints.activities.update(id), dto);
    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(endpoints.activities.delete(id));
  },
};
