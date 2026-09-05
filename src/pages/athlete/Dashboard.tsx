import { useEffect, useState } from 'react';
import { BarChart3, Clock, MapPin, Star } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActivityCard } from '@/components/dashboard/ActivityCard';
import { ActivityForm, type ActivityFormData } from '@/components/dashboard/ActivityForm';
import { CoachCard } from '@/components/dashboard/CoachCard';
import { activitiesService } from '@/services/activitiesService';
import { coachService } from '@/services/coachService';
import type { Activity, CoachSummary } from '@/lib/api/types';

export function AthleteDashboard() {
  const { user } = useAuthStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [coaches, setCoaches] = useState<CoachSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [activitiesData, coachesData] = await Promise.all([
          activitiesService.getByUser(user.id),
          coachService.getMarketplace(),
        ]);

        setActivities(activitiesData);
        setCoaches(coachesData.slice(0, 2));
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Error cargando datos');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleCreateActivity = async (formData: ActivityFormData) => {
    if (!user) return;
    const created = await activitiesService.create({
      title: formData.title,
      activityType: formData.activityType,
      distance: parseFloat(formData.distance),
      duration: parseInt(formData.duration, 10),
      notes: formData.notes || undefined,
    });
    setActivities((prev) => [created, ...prev]);
  };

  const totalDistance = activities.reduce((sum, a) => sum + Number(a.distance), 0);
  const totalMinutes = Math.round(activities.reduce((sum, a) => sum + a.duration, 0) / 60);

  if (loading) {
    return <div className="text-center py-12 text-slate-100">Cargando...</div>;
  }

  if (error) {
    return <div className="text-error py-12 text-center">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-50">¡Hola, {user?.name}! 🏃</h1>
        <p className="text-slate-100 mt-2">Continúa tu entrenamiento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Actividades" value={activities.length} icon={BarChart3} />
        <StatCard title="Distancia" value={totalDistance.toFixed(1)} unit="km" icon={MapPin} />
        <StatCard title="Tiempo" value={totalMinutes} unit="min" icon={Clock} />
        <StatCard title="Suscripción" value={user?.tier ?? 'FREE'} icon={Star} />
      </div>

      <ActivityForm onSubmit={handleCreateActivity} />

      <div>
        <h2 className="text-2xl font-bold text-slate-50 mb-4">📋 Mis Actividades</h2>
        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map((a) => (
              <ActivityCard
                key={a.id}
                title={a.title}
                type={a.activityType}
                distance={Number(a.distance)}
                duration={a.duration}
                date={a.createdAt}
              />
            ))
          ) : (
            <p className="text-slate-100">No hay actividades registradas todavía</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-50 mb-4">🏋️ Encuentra tu Coach</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coaches.length > 0 ? (
            coaches.map((c) => (
              <CoachCard
                key={c.id}
                name={c.name}
                bio={c.bio ?? undefined}
                athleteCount={c.athleteCount}
                planCount={c.planCount}
              />
            ))
          ) : (
            <p className="text-slate-100">No hay coaches disponibles todavía</p>
          )}
        </div>
      </div>
    </div>
  );
}
