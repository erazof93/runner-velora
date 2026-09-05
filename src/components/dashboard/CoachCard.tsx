import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

interface CoachCardProps {
  name: string;
  bio?: string;
  specialties?: string[];
  rating?: number;
  reviews?: number;
  athleteCount?: number;
  planCount?: number;
}

export function CoachCard({
  name,
  bio,
  specialties,
  rating,
  reviews,
  athleteCount,
  planCount,
}: CoachCardProps) {
  return (
    <Card className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        {bio && <p className="text-sm text-slate-100 mt-1">{bio}</p>}
      </div>
      {specialties && specialties.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {specialties.map((s) => (
            <span key={s} className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
              {s}
            </span>
          ))}
        </div>
      )}
      {rating !== undefined && (
        <p className="text-sm text-slate-100">
          ⭐ {rating.toFixed(1)} ({reviews ?? 0})
        </p>
      )}
      {((athleteCount ?? 0) > 0 || (planCount ?? 0) > 0) && (
        <div className="flex gap-4 text-xs text-slate-100">
          {(athleteCount ?? 0) > 0 && <span>👥 {athleteCount} atletas</span>}
          {(planCount ?? 0) > 0 && <span>📅 {planCount} planes</span>}
        </div>
      )}
      <Button variant="primary" className="w-full">
        Ver Perfil
      </Button>
    </Card>
  );
}
