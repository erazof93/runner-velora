export type ActivityType = 'run' | 'bike' | 'swim';
export type CoachAthleteStatus = 'active' | 'inactive';

export interface Activity {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  activityType: ActivityType;
  distance: number;
  duration: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateActivityDto {
  title: string;
  description?: string;
  activityType: ActivityType;
  distance: number;
  duration: number;
  notes?: string;
}

export interface CoachSummary {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  profilePicture: string | null;
  athleteCount: number;
  planCount: number;
  createdAt: string;
}

export interface CoachAthlete {
  id: string;
  athleteId: string;
  name: string;
  email: string;
  status: CoachAthleteStatus;
  notes: string | null;
  assignedAt: string;
}

export interface AthleteProfile {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  activityCount: number;
  followerCount: number;
  totalDistance: number;
  totalDuration: number;
  status: CoachAthleteStatus;
}

export interface TrainingPlan {
  id: string;
  coachId: string;
  name: string;
  weekStart: string;
  description: string | null;
  exercises: unknown[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTrainingPlanDto {
  name: string;
  weekStart: string;
  description?: string;
  exercises: unknown[];
}

export interface CoachEarningTransaction {
  id: string;
  athleteId: string;
  athleteName: string;
  amount: number;
  currency: string;
  description: string;
  createdAt: string;
}

export interface CoachEarnings {
  totalEarnings: number;
  transactions: CoachEarningTransaction[];
}
