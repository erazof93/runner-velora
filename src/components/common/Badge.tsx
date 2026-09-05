import type { ReactNode } from 'react';

export interface BadgeProps {
  status: 'active' | 'pending' | 'inactive';
  children?: ReactNode;
}

const statusMap = {
  active: { classes: 'bg-success/20 text-success', label: 'Active' },
  pending: { classes: 'bg-warning/20 text-warning', label: 'Pending' },
  inactive: { classes: 'bg-error/20 text-error', label: 'Inactive' },
} as const;

export function Badge({ status, children }: BadgeProps) {
  const config = statusMap[status];

  return (
    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${config.classes}`}>
      {children ?? config.label}
    </span>
  );
}
