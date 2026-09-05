import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Modal de confirmación (confirmar / cancelar) con estilo de acción peligrosa
 * opcional. Cierra con Escape o clic en el fondo.
 */
export function ConfirmDialog({
  isOpen,
  title,
  children,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md rounded-xl border border-dark-700 bg-dark-800 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-dark-700 px-6 py-4">
          <h2 id="confirm-dialog-title" className="text-lg font-semibold text-white">
            {title}
          </h2>
        </div>
        {children && <div className="px-6 py-4 text-sm text-slate-100">{children}</div>}
        <div className="flex justify-end gap-3 border-t border-dark-700 px-6 py-4">
          <Button variant="ghost" onClick={onCancel} autoFocus>
            {cancelLabel}
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
