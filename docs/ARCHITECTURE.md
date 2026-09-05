# Arquitectura - Runner Velora

## 📂 Estructura de Directorios

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── MainLayout.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Loading.tsx
│   └── auth/
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       └── ProtectedRoute.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── NotFound.tsx
│   ├── athlete/
│   │   ├── Dashboard.tsx
│   │   ├── Activities.tsx
│   │   ├── Statistics.tsx
│   │   ├── FindCoach.tsx
│   │   └── UpgradePremium.tsx
│   ├── coach/
│   │   ├── Dashboard.tsx
│   │   ├── MyAthletes.tsx
│   │   ├── TrainingPlans.tsx
│   │   ├── Schedule.tsx
│   │   └── Earnings.tsx
│   └── common/
│       ├── Settings.tsx
│       └── Profile.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── useUser.ts
│
├── store/
│   ├── authStore.ts
│   ├── userStore.ts
│   └── coachStore.ts
│
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   └── types.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── format.ts
│   │   └── helpers.ts
│   └── constants/
│       ├── roles.ts
│       ├── tiers.ts
│       └── api.ts
│
├── types/
│   ├── user.ts
│   ├── coach.ts
│   ├── activity.ts
│   └── subscription.ts
│
└── styles/
    ├── tailwind.config.ts
    └── globals.css
```

## 🔄 State Management (Zustand)

**authStore.ts**
```typescript
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (email, password) => Promise<void>;
  logout: () => void;
  setUser: (user) => void;
}
```

**userStore.ts**
```typescript
interface UserStore {
  profile: User | null;
  getProfile: () => Promise<void>;
  updateProfile: (data) => Promise<void>;
}
```

## 🔗 API Integration

**Client Setup** (`lib/api/client.ts`)
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// JWT interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🛣️ Routing

Role-based routing:

```
/ → Dashboard (redirige según role)
  ├─ /athlete/* (solo CLIENTE)
  ├─ /coach/* (solo COACH)
  └─ /settings
/login
/register
/404
```

## 🎨 Styling

- **Framework:** Tailwind CSS v4
- **Components:** Headless UI + Tailwind
- **Dark Mode:** Soportado

## 📡 Request Lifecycle

```
1. User action
   ↓
2. Hook/Store function called
   ↓
3. API request (axios + JWT)
   ↓
4. Backend processes
   ↓
5. Response handler
   ↓
6. Store update
   ↓
7. Component re-render