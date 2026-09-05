import { ActivityCard } from '@/components/dashboard/ActivityCard';

const activities = [
  { id: '1', title: 'Morning Run', type: 'run' as const, distance: 5.2, duration: 1800, date: new Date().toISOString() },
  { id: '2', title: 'Evening Bike', type: 'bike' as const, distance: 15.5, duration: 2400, date: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', title: 'Swimming', type: 'swim' as const, distance: 2.0, duration: 1200, date: new Date(Date.now() - 172800000).toISOString() },
];

export function Activities() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">📋 Mis Actividades</h1>
        <p className="text-slate-100 mt-2">Total: {activities.length}</p>
      </div>
      <div className="space-y-3">
        {activities.map((a) => (
          <ActivityCard key={a.id} {...a} />
        ))}
      </div>
    </div>
  );
}
