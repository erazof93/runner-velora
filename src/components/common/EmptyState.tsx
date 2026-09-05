import type { ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/** Estado vacío / de error reutilizable para listados sin datos. */
export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 text-5xl" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-slate-100">{description}</p>}
      {action && (
        <Button variant="primary" className="mt-5" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
