import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: number;
}

export function StatCard({ title, value, unit, icon: Icon, trend }: StatCardProps) {
  const isPositive = trend !== undefined && trend > 0;

  return (
    <Card className="flex items-center gap-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-100">{title}</p>
        <p className="truncate text-2xl font-bold text-slate-50">
          {value}
          {unit && <span className="text-base text-slate-200 ml-1">{unit}</span>}
        </p>
        {trend !== undefined && (
          <p className={`text-xs font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
          </p>
        )}
      </div>
    </Card>
  );
}
