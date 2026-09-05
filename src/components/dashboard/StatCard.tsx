import { Card } from '@/components/common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: string;
  trend?: number;
}

export function StatCard({ title, value, unit, icon, trend }: StatCardProps) {
  const isPositive = trend !== undefined && trend > 0;

  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-slate-100">{title}</p>
        {icon && <span className="text-xl leading-none">{icon}</span>}
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-bold text-white">
          {value}
          {unit && <span className="text-base text-slate-200 ml-1">{unit}</span>}
        </span>
      </div>
      {trend !== undefined && (
        <p className={`text-xs font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
        </p>
      )}
    </Card>
  );
}
