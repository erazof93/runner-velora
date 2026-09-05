import type { ReactNode } from 'react';

export type BadgeType = 'easy' | 'tempo' | 'interval' | 'hill' | 'long' | 'race';

const badgeStyles: Record<BadgeType, string> = {
  easy: 'bg-warning/20 text-warning',
  tempo: 'bg-secondary/20 text-secondary',
  interval: 'bg-error/20 text-error',
  hill: 'bg-purple/20 text-purple',
  long: 'bg-success/20 text-success',
  race: 'bg-error/20 text-error',
};

export interface BadgeProps {
  type: BadgeType;
  children: ReactNode;
}

export function Badge({ type, children }: BadgeProps) {
  return (
    <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold ${badgeStyles[type]}`}>
      {children}
    </span>
  );
}
