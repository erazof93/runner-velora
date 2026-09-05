import { Card } from '@/components/common/Card';

interface ActivityCardProps {
  title: string;
  type: 'run' | 'bike' | 'swim';
  distance: number;
  duration: number;
  date: string;
}

const typeEmoji: Record<ActivityCardProps['type'], string> = {
  run: '🏃',
  bike: '🚴',
  swim: '🏊',
};

export function ActivityCard({ title, type, distance, duration, date }: ActivityCardProps) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <Card className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeEmoji[type]}</span>
          <h3 className="font-semibold text-slate-50">{title}</h3>
        </div>
        <p className="text-sm text-slate-200 mt-1">
          {new Date(date).toLocaleDateString('es-ES')}
        </p>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg text-slate-50">{distance.toFixed(2)} km</p>
        <p className="text-sm text-slate-200">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </p>
      </div>
    </Card>
  );
}
