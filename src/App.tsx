import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Loading } from '@/components/common/Loading';

// Pages (lazy — cada ruta es su propio chunk)
const Login = lazy(() => import('@/pages/Login').then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));
const AthleteDashboard = lazy(() =>
  import('@/pages/athlete/Dashboard').then((m) => ({ default: m.AthleteDashboard })),
);
const Activities = lazy(() =>
  import('@/pages/athlete/Activities').then((m) => ({ default: m.Activities })),
);
const FindCoach = lazy(() =>
  import('@/pages/athlete/FindCoach').then((m) => ({ default: m.FindCoach })),
);
const CoachDetail = lazy(() =>
  import('@/pages/athlete/CoachDetail').then((m) => ({ default: m.CoachDetail })),
);
const CoachDashboard = lazy(() =>
  import('@/pages/coach/Dashboard').then((m) => ({ default: m.CoachDashboard })),
);
const MyAthletes = lazy(() =>
  import('@/pages/coach/MyAthletes').then((m) => ({ default: m.MyAthletes })),
);
const AthleteDetail = lazy(() =>
  import('@/pages/coach/AthleteDetail').then((m) => ({ default: m.AthleteDetail })),
);
const TrainingPlans = lazy(() =>
  import('@/pages/coach/TrainingPlans').then((m) => ({ default: m.TrainingPlans })),
);
const Earnings = lazy(() =>
  import('@/pages/coach/Earnings').then((m) => ({ default: m.Earnings })),
);
const SettingsProfile = lazy(() =>
  import('@/pages/settings/Profile').then((m) => ({ default: m.SettingsProfile })),
);

export function App() {
  const { restoreSession } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/athlete"
                element={
                  <ProtectedRoute requiredRole={['CLIENTE']}>
                    <AthleteDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/athlete/activities"
                element={
                  <ProtectedRoute requiredRole={['CLIENTE']}>
                    <Activities />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/athlete/find-coach"
                element={
                  <ProtectedRoute requiredRole={['CLIENTE']}>
                    <FindCoach />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/athlete/coach/:id"
                element={
                  <ProtectedRoute requiredRole={['CLIENTE']}>
                    <CoachDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/coach"
                element={
                  <ProtectedRoute requiredRole={['COACH']}>
                    <CoachDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coach/athletes"
                element={
                  <ProtectedRoute requiredRole={['COACH']}>
                    <MyAthletes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coach/athletes/:athleteId"
                element={
                  <ProtectedRoute requiredRole={['COACH']}>
                    <AthleteDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coach/plans"
                element={
                  <ProtectedRoute requiredRole={['COACH']}>
                    <TrainingPlans />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coach/earnings"
                element={
                  <ProtectedRoute requiredRole={['COACH']}>
                    <Earnings />
                  </ProtectedRoute>
                }
              />

              <Route path="/settings" element={<Navigate to="/settings/profile" replace />} />
              <Route
                path="/settings/profile"
                element={
                  <ProtectedRoute>
                    <SettingsProfile />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </BrowserRouter>
      <Toaster position="top-right" theme="dark" richColors closeButton />
    </ErrorBoundary>
  );
}

export default App;
