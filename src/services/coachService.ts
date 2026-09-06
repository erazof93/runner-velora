import api from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type {
  AthleteProfile,
  CoachApplication,
  CoachAthlete,
  CoachEarnings,
  CoachSummary,
  CreateTrainingPlanDto,
  TrainingPlan,
} from '@/lib/api/types';

export const coachService = {
  async getMarketplace(): Promise<CoachSummary[]> {
    const { data } = await api.get<CoachSummary[]>(endpoints.coach.marketplace);
    return data;
  },

  async becomeCoach(bio?: string): Promise<void> {
    await api.post(endpoints.coach.becomeCoach, { bio });
  },

  async submitApplication(dto: {
    phone: string;
    experience: string;
    bio?: string;
  }): Promise<CoachApplication> {
    const { data } = await api.post<CoachApplication>(
      endpoints.coach.applications,
      dto,
    );
    return data;
  },

  async getMyApplication(): Promise<CoachApplication | null> {
    const { data } = await api.get<CoachApplication | null>(
      endpoints.coach.myApplication,
    );
    return data;
  },

  async getMyAthletes(): Promise<CoachAthlete[]> {
    const { data } = await api.get<CoachAthlete[]>(endpoints.coach.athletes);
    return data;
  },

  async getAthleteProfile(athleteId: string): Promise<AthleteProfile> {
    const { data } = await api.get<AthleteProfile>(endpoints.coach.athleteById(athleteId));
    return data;
  },

  async assignAthlete(athleteId: string, notes?: string): Promise<CoachAthlete> {
    const { data } = await api.post<CoachAthlete>(endpoints.coach.athleteById(athleteId), {
      notes,
    });
    return data;
  },

  async removeAthlete(athleteId: string): Promise<void> {
    await api.delete(endpoints.coach.athleteById(athleteId));
  },

  async getMyPlans(): Promise<TrainingPlan[]> {
    const { data } = await api.get<TrainingPlan[]>(endpoints.coach.plans);
    return data;
  },

  async createPlan(dto: CreateTrainingPlanDto): Promise<TrainingPlan> {
    const { data } = await api.post<TrainingPlan>(endpoints.coach.plans, dto);
    return data;
  },

  async updatePlan(id: string, dto: Partial<CreateTrainingPlanDto>): Promise<TrainingPlan> {
    const { data } = await api.put<TrainingPlan>(endpoints.coach.planById(id), dto);
    return data;
  },

  async deletePlan(id: string): Promise<void> {
    await api.delete(endpoints.coach.planById(id));
  },

  async getEarnings(): Promise<CoachEarnings> {
    const { data } = await api.get<CoachEarnings>(endpoints.coach.earnings);
    return data;
  },
};
