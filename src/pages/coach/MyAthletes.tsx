import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

const athletes = [
  { id: '1', name: 'Atleta 1', email: 'athlete1@example.com', tier: 'PREMIUM', activities: 15 },
  { id: '2', name: 'Atleta 2', email: 'athlete2@example.com', tier: 'PREMIUM', activities: 22 },
  { id: '3', name: 'Atleta 3', email: 'athlete3@example.com', tier: 'FREE', activities: 8 },
];

export function MyAthletes() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">👥 Mis Atletas</h1>
      <div className="space-y-3">
        {athletes.map((a) => (
          <Card key={a.id} className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-white">{a.name}</h3>
              <p className="text-sm text-slate-100">{a.email}</p>
              <p className="text-xs text-slate-200">📊 {a.activities} actividades</p>
            </div>
            <Button variant="ghost">Ver</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
