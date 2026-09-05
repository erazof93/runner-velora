import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BarChart3, Clock, MapPin, Users } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActivityCard } from '@/components/dashboard/ActivityCard';
import { coachService } from '@/services/coachService';
import { activitiesService } from '@/services/activitiesService';
import type { Activity, AthleteProfile } from '@/lib/api/types';

export function AthleteDetail() {
  const { athleteId } = useParams<{ athleteId: string }>();
  const [profile, setProfile] = useState<AthleteProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!athleteId) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [profileData, activitiesData] = await Promise.all([
          coachService.getAthleteProfile(athleteId),
          activitiesService.getByUser(athleteId),
        ]);
        setProfile(profileData);
        setActivities(activitiesData);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Error cargando el atleta');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [athleteId]);

  if (loading) {
    return <div className="text-center py-12 text-slate-100">Cargando atleta...</div>;
  }

  if (error || !profile) {
    return <div className="text-error py-12 text-center">{error || 'Atleta no encontrado'}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/coach/athletes" className="text-sm text-primary hover:text-primary-hover">
          ← Volver a Mis Atletas
        </Link>
        <h1 className="text-3xl font-bold text-slate-50 mt-2">{profile.name}</h1>
        <p className="text-slate-100 mt-1">{profile.email}</p>
        {profile.bio && <p className="text-slate-100 mt-2 text-sm">{profile.bio}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Actividades" value={profile.activityCount} icon={BarChart3} />
        <StatCard title="Distancia" value={profile.totalDistance.toFixed(1)} unit="km" icon={MapPin} />
        <StatCard title="Tiempo" value={Math.round(profile.totalDuration / 60)} unit="min" icon={Clock} />
        <StatCard title="Seguidores" value={profile.followerCount} icon={Users} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-50 mb-4">📋 Actividades</h2>
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((a) => (
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
          <Card>
            <p className="text-slate-100">No hay actividades registradas todavía</p>
          </Card>
        )}
      </div>
    </div>
  );
}
