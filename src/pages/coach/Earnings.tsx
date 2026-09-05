import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { ListSkeleton } from '@/components/common/Skeleton';
import { StatCard } from '@/components/dashboard/StatCard';
import { coachService } from '@/services/coachService';
import type { CoachEarnings as CoachEarningsData } from '@/lib/api/types';

export function Earnings() {
  const [earnings, setEarnings] = useState<CoachEarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await coachService.getEarnings();
        setEarnings(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Error cargando ganancias');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const transactions = earnings?.transactions ?? [];
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const thisMonth = transactions
      .filter((t) => new Date(t.createdAt) >= startOfMonth)
      .reduce((sum, t) => sum + t.amount, 0);
    const thisWeek = transactions
      .filter((t) => new Date(t.createdAt) >= startOfWeek)
      .reduce((sum, t) => sum + t.amount, 0);
    const activeAthletes = new Set(transactions.map((t) => t.athleteId)).size;

    return { thisMonth, thisWeek, activeAthletes };
  }, [earnings]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">💰 Mis Ganancias</h1>
        <ListSkeleton count={4} />
      </div>
    );
  }

  if (error || !earnings) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">💰 Mis Ganancias</h1>
        <EmptyState
          icon="⚠️"
          title="No se pudieron cargar las ganancias"
          description={error ?? 'Inténtalo de nuevo más tarde.'}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">💰 Mis Ganancias</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total" value={`$${earnings.totalEarnings.toLocaleString()}`} icon="💰" />
        <StatCard title="Este Mes" value={`$${stats.thisMonth.toLocaleString()}`} icon="📅" />
        <StatCard title="Esta Semana" value={`$${stats.thisWeek.toLocaleString()}`} icon="📊" />
        <StatCard title="Atletas Activos" value={stats.activeAthletes} icon="👥" />
      </div>

      <Card title="Transacciones">
        {earnings.transactions.length === 0 ? (
          <EmptyState
            icon="🧾"
            title="Aún no hay ganancias"
            description="Cuando tus atletas contraten una suscripción verás aquí los ingresos."
          />
        ) : (
          <div className="space-y-3">
            {earnings.transactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between pb-3 border-b border-dark-700 last:border-0"
              >
                <div>
                  <p className="font-semibold text-white">{t.athleteName}</p>
                  <p className="text-xs text-slate-200">
                    {t.description} • {new Date(t.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <p className="font-bold text-success">
                  +${t.amount.toLocaleString()} {t.currency}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
