import { useAuthStore } from '@/store/authStore';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActivityCard } from '@/components/dashboard/ActivityCard';
import { ActivityForm } from '@/components/dashboard/ActivityForm';
import { CoachCard } from '@/components/dashboard/CoachCard';

const activities = [
  { id: '1', title: 'Morning Run', type: 'run' as const, distance: 5.2, duration: 1800, date: new Date().toISOString() },
  { id: '2', title: 'Evening Bike', type: 'bike' as const, distance: 15.5, duration: 2400, date: new Date(Date.now() - 86400000).toISOString() },
];

const coaches = [
  { id: '1', name: 'Coach Juan', bio: 'Especialista en 5K', specialties: ['5K', 'Marathon'], rating: 4.8, reviews: 42 },
  { id: '2', name: 'Coach Maria', bio: 'Entrenadora triatlón', specialties: ['Triathlon', 'Swimming'], rating: 4.9, reviews: 28 },
];

export function AthleteDashboard() {
  const { user } = useAuthStore();

  const totalDistance = activities.reduce((sum, a) => sum + a.distance, 0);
  const totalMinutes = Math.round(activities.reduce((sum, a) => sum + a.duration, 0) / 60);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">¡Hola, {user?.name}! 🏃</h1>
        <p className="text-slate-100 mt-2">Continúa tu entrenamiento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Actividades" value={activities.length} icon="📊" trend={10} />
        <StatCard title="Distancia" value={totalDistance.toFixed(1)} unit="km" icon="📍" />
        <StatCard title="Tiempo" value={totalMinutes} unit="min" icon="⏱️" />
        <StatCard title="Suscripción" value={user?.tier ?? 'FREE'} icon="⭐" />
      </div>

      <ActivityForm />

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">📋 Mis Actividades</h2>
        <div className="space-y-3">
          {activities.map((a) => (
            <ActivityCard key={a.id} {...a} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">🏋️ Encuentra tu Coach</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coaches.map((c) => (
            <CoachCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}
