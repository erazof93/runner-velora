import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

const plans = [
  { id: '1', name: '5K Plan', athlete: 'Atleta 1', progress: 50 },
  { id: '2', name: 'Marathon Plan', athlete: 'Atleta 2', progress: 75 },
  { id: '3', name: 'Cardio Plan', athlete: 'Atleta 3', progress: 0 },
];

export function TrainingPlans() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">📅 Planes</h1>
        <Button variant="primary">➕ Nuevo</Button>
      </div>

      <div className="space-y-3">
        {plans.map((p) => (
          <Card key={p.id} className="space-y-3">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-white">{p.name}</h3>
                <p className="text-sm text-slate-100">{p.athlete}</p>
              </div>
            </div>
            <div className="w-full bg-dark-700 rounded h-2">
              <div className="bg-success h-2 rounded" style={{ width: `${p.progress}%` }} />
            </div>
            <p className="text-xs text-slate-100">{p.progress}% completado</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
