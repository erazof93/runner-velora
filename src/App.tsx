import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { CoachDashboard } from '@/pages/coach/Dashboard';
import { MyAthletes } from '@/pages/coach/MyAthletes';
import { TrainingPlans } from '@/pages/coach/TrainingPlans';
import { Earnings } from '@/pages/coach/Earnings';

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

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
