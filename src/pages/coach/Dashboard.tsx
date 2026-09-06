import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Clock, DollarSign, MapPin } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { ListSkeleton } from '@/components/common/Skeleton';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActivityCard } from '@/components/dashboard/ActivityCard';
import { ActivityForm, type ActivityFormData } from '@/components/dashboard/ActivityForm';
import { activitiesService } from '@/services/activitiesService';
import { coachService } from '@/services/coachService';
import type {
  Activity,
  CoachAthlete,
  CoachEarnings,
  TrainingPlan,
} from '@/lib/api/types';

export function CoachDashboard() {
  const { user } = useAuthStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [athletes, setAthletes] = useState<CoachAthlete[]>([]);
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [earnings, setEarnings] = useState<CoachEarnings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      const [a, at, pl, ea] = await Promise.allSettled([
        activitiesService.getByUser(user.id),
        coachService.getMyAthletes(),
        coachService.getMyPlans(),
        coachService.getEarnings(),
      ]);
      if (a.status === 'fulfilled') setActivities(a.value);
      if (at.status === 'fulfilled') setAthletes(at.value);
      if (pl.status === 'fulfilled') setPlans(pl.value);
      if (ea.status === 'fulfilled') setEarnings(ea.value);
      if ([a, at, pl, ea].every((r) => r.status === 'rejected')) {
        setError('No se pudo cargar el panel.');
      }
      setLoading(false);
    };

    load();
  }, [user]);

  const handleCreateActivity = async (form: ActivityFormData) => {
    if (!user) return;
    const created = await activitiesService.create({
      title: form.title,
      activityType: form.activityType,
      distance: parseFloat(form.distance),
      duration: parseInt(form.duration, 10),
      notes: form.notes || undefined,
    });
    setActivities((prev) => [created, ...prev]);
  };

  const totalDistance = activities.reduce((s, a) => s + Number(a.distance), 0);
  const totalMinutes = Math.round(
    activities.reduce((s, a) => s + a.duration, 0) / 60,
  );

  const earningStats = useMemo(() => {
    const txs = earnings?.transactions ?? [];
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sum = (from: Date) =>
      txs
        .filter((t) => new Date(t.createdAt) >= from)
        .reduce((s, t) => s + t.amount, 0);
    return { thisMonth: sum(startOfMonth), thisWeek: sum(startOfWeek) };
  }, [earnings]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-50">
          ¡Hola, Coach {user?.name}! 🏋️
        </h1>
        <ListSkeleton count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-50">
          ¡Hola, Coach {user?.name}! 🏋️
        </h1>
        <EmptyState icon="⚠️" title="Error" description={error} />
      </div>
    );
  }

  const recentActivities = activities.slice(0, 5);
  const topAthletes = athletes.slice(0, 6);
  const topPlans = plans.slice(0, 3);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-50">
          ¡Hola, Coach {user?.name}! 🏋️
        </h1>
        <p className="text-slate-100 mt-2">Tu panel de entrenador y atleta en uno</p>
      </div>

      {/* ── 1 · Mi progreso personal ─────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-50">📊 Mi progreso</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Actividades" value={activities.length} icon={BarChart3} />
          <StatCard
            title="Distancia"
            value={totalDistance.toFixed(1)}
            unit="km"
            icon={MapPin}
          />
          <StatCard title="Tiempo" value={totalMinutes} unit="min" icon={Clock} />
        </div>

        <ActivityForm onSubmit={handleCreateActivity} />

        {recentActivities.length > 0 ? (
          <div className="space-y-3">
            {recentActivities.map((a) => (
              <ActivityCard
                key={a.id}
                title={a.title}
                type={a.activityType}
                distance={Number(a.distance)}
                duration={a.duration}
                date={a.createdAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-100">
            Aún no registras actividades propias.
          </p>
        )}
      </section>

      {/* ── 2 · Mis atletas ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-50">👥 Mis atletas</h2>
          <Link
            to="/coach/athletes"
            className="text-sm font-medium text-primary hover:text-primary-hover"
          >
            Ver todos →
          </Link>
        </div>

        {topAthletes.length === 0 ? (
          <EmptyState
            icon="👥"
            title="Sin atletas asignados"
            description="Cuando un atleta te asigne como coach aparecerá aquí."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topAthletes.map((at) => (
              <Card key={at.id} hover className="space-y-3">
                <div>
                  <h3 className="font-semibold text-slate-50">{at.name}</h3>
                  <p className="text-sm text-slate-100">{at.email}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/coach/athletes/${at.athleteId}`}
                    className="flex-1 rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                  >
                    Ver detalle
                  </Link>
                  <Link
                    to="/coach/plans"
                    className="flex-1 rounded-lg border border-dark-600 px-3 py-2 text-center text-sm font-medium text-slate-50 transition-colors hover:border-primary hover:text-primary"
                  >
                    Plan
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ── 3 · Mis planes ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-50">📅 Mis planes</h2>
          <Link
            to="/coach/plans"
            className="text-sm font-medium text-primary hover:text-primary-hover"
          >
            Gestionar →
          </Link>
        </div>

        {topPlans.length === 0 ? (
          <EmptyState
            icon="📅"
            title="Sin planes todavía"
            description="Crea tu primer plan de entrenamiento desde la sección Planes."
          />
        ) : (
          <div className="space-y-3">
            {topPlans.map((p) => (
              <Card key={p.id} hover>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-50">{p.name}</h3>
                    {p.description && (
                      <p className="mt-1 text-sm text-slate-100">{p.description}</p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-slate-200">
                    Semana: {new Date(p.weekStart).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ── 4 · Mis ganancias ────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-50">💰 Mis ganancias</h2>
          <Link
            to="/coach/earnings"
            className="text-sm font-medium text-primary hover:text-primary-hover"
          >
            Ver historial →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total"
            value={`$${(earnings?.totalEarnings ?? 0).toLocaleString()}`}
            icon={DollarSign}
          />
          <StatCard
            title="Este mes"
            value={`$${earningStats.thisMonth.toLocaleString()}`}
            icon={DollarSign}
          />
          <StatCard
            title="Esta semana"
            value={`$${earningStats.thisWeek.toLocaleString()}`}
            icon={DollarSign}
          />
        </div>
      </section>
    </div>
  );
}
