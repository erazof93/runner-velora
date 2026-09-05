import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { coachService } from '@/services/coachService';
import { usersService } from '@/services/usersService';
import type { CoachSummary } from '@/lib/api/types';

export function CoachDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const stateCoach = (location.state as { coach?: CoachSummary } | null)?.coach;

  const [coach, setCoach] = useState<CoachSummary | null>(stateCoach ?? null);
  const [loading, setLoading] = useState(!stateCoach);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (stateCoach || !id) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const coaches = await coachService.getMarketplace();
        const found = coaches.find((c) => c.id === id);
        if (!found) throw new Error('Coach no encontrado');
        setCoach(found);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Error cargando coach');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, stateCoach]);

  const handleFollow = async () => {
    if (!id) return;
    try {
      setIsFollowing(true);
      await usersService.follow(id);
      setFollowed(true);
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Error al seguir al coach');
    } finally {
      setIsFollowing(false);
    }
  };

  if (loading) return <div className="text-center py-12 text-slate-100">Cargando...</div>;
  if (error || !coach) {
    return <div className="text-error text-center py-12">{error || 'Coach no encontrado'}</div>;
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" onClick={() => navigate('/athlete/find-coach')}>
        ← Volver a Coaches
      </Button>

      <Card className="p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white">{coach.name}</h1>
            <p className="text-slate-100 mt-2">{coach.bio || 'Coach profesional'}</p>
            <div className="flex gap-2 mt-4">
              <span className="bg-success bg-opacity-20 text-success px-3 py-1 rounded-lg text-sm font-semibold">
                👥 {coach.athleteCount} atletas
              </span>
              <span className="bg-blue bg-opacity-20 text-blue px-3 py-1 rounded-lg text-sm font-semibold">
                📅 {coach.planCount} planes
              </span>
            </div>
          </div>
          <span className="text-6xl">🏋️</span>
        </div>
      </Card>

      <Button
        variant="primary"
        className="w-full text-lg py-3"
        onClick={handleFollow}
        isLoading={isFollowing}
        disabled={followed}
      >
        {followed ? '✅ Siguiendo' : 'Seguir a este Coach'}
      </Button>
    </div>
  );
}
