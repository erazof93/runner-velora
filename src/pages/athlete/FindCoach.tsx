import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/common/Input';
import { EmptyState } from '@/components/common/EmptyState';
import { ListSkeleton } from '@/components/common/Skeleton';
import { CoachCard } from '@/components/dashboard/CoachCard';
import { coachService } from '@/services/coachService';
import type { CoachSummary } from '@/lib/api/types';

export function FindCoach() {
  const [search, setSearch] = useState('');
  const [coaches, setCoaches] = useState<CoachSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await coachService.getMarketplace();
        setCoaches(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Error cargando coaches');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filtered = coaches.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">🏋️ Encuentra tu Coach</h1>
        <p className="text-slate-100 mt-2">Conecta con coaches certificados</p>
      </div>

      <Input
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Buscar coach por nombre"
      />

      {loading && <ListSkeleton />}

      {!loading && error && (
        <EmptyState icon="⚠️" title="No se pudieron cargar los coaches" description={error} />
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          icon="🔍"
          title={search ? 'Sin resultados' : 'No hay coaches disponibles'}
          description={
            search ? `Ningún coach coincide con "${search}".` : 'Vuelve a intentarlo más tarde.'
          }
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <Link key={c.id} to={`/athlete/coach/${c.id}`} state={{ coach: c }}>
              <CoachCard
                name={c.name}
                bio={c.bio ?? undefined}
                athleteCount={c.athleteCount}
                planCount={c.planCount}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
