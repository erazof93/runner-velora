export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    refresh: '/auth/refresh-token',
  },
  users: {
    getById: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    follow: (id: string) => `/users/${id}/follow`,
  },
  activities: {
    create: '/activities',
    getById: (id: string) => `/activities/${id}`,
    getByUser: (userId: string) => `/activities/user/${userId}`,
    update: (id: string) => `/activities/${id}`,
    delete: (id: string) => `/activities/${id}`,
  },
  coach: {
    becomeCoach: '/coach',
    marketplace: '/coach/marketplace',
    earnings: '/coach/earnings',
    athletes: '/coach/athletes',
    athleteById: (id: string) => `/coach/athletes/${id}`,
    athleteFeedback: (athleteId: string) => `/coach/athletes/${athleteId}/feedback`,
    plans: '/coach/plans',
    planById: (id: string) => `/coach/plans/${id}`,
    applications: '/coach/applications',
    myApplication: '/coach/applications/me',
  },
  subscriptions: {
    getMe: '/subscriptions/me',
    checkout: '/subscriptions/stripe/checkout',
    cancel: '/subscriptions/cancel',
    transactions: '/subscriptions/transactions',
  },
};
