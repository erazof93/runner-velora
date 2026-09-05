import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Pages
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { NotFound } from '@/pages/NotFound';
import { AthleteDashboard } from '@/pages/athlete/Dashboard';
import { Activities } from '@/pages/athlete/Activities';
import { FindCoach } from '@/pages/athlete/FindCoach';
import { CoachDetail } from '@/pages/athlete/CoachDetail';
import { CoachDashboard } from '@/pages/coach/Dashboard';
import { MyAthletes } from '@/pages/coach/MyAthletes';
import { AthleteDetail } from '@/pages/coach/AthleteDetail';
import { TrainingPlans } from '@/pages/coach/TrainingPlans';
import { Earnings } from '@/pages/coach/Earnings';
import { SettingsProfile } from '@/pages/settings/Profile';

export function App() {
  const { restoreSession } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <BrowserRouter>
      <MainLayout>
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
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
