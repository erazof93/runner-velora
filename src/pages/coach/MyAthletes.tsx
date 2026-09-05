import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { coachService } from '@/services/coachService';
import type { CoachAthlete } from '@/lib/api/types';

export function MyAthletes() {
  const [athletes, setAthletes] = useState<CoachAthlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await coachService.getMyAthletes();
        setAthletes(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Error cargando atletas');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-slate-100">Cargando atletas...</div>;
  }

  if (error) {
    return <div className="text-error py-12 text-center">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">👥 Mis Atletas</h1>

      {athletes.length === 0 ? (
        <p className="text-slate-100">No tienes atletas asignados todavía</p>
      ) : (
        <div className="space-y-3">
          {athletes.map((a) => (
            <Link key={a.id} to={`/coach/athletes/${a.athleteId}`}>
              <Card className="flex justify-between items-center hover:border-success transition-all">
                <div>
                  <h3 className="font-semibold text-white">{a.name}</h3>
                  <p className="text-sm text-slate-100">{a.email}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                      a.status === 'active'
                        ? 'bg-success/20 text-success'
                        : 'bg-dark-700 text-slate-100'
                    }`}
                  >
                    {a.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <span className="text-3xl">👤</span>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
