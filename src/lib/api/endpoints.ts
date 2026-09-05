export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  users: {
    me: '/users/me',
    getById: (id: string) => `/users/${id}`,
    update: '/users/me',
  },
  activities: {
    create: '/activities',
    getMe: '/activities/me',
    getById: (id: string) => `/activities/${id}`,
  },
  coaches: {
    marketplace: '/coach/marketplace',
    getById: (id: string) => `/coach/${id}`,
  },
  subscriptions: {
    getMe: '/subscriptions/me',
    checkout: '/subscriptions/stripe/checkout',
  },
};
