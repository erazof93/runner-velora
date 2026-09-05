import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-800 border border-dark-700 rounded-xl shadow-lg max-w-md w-full mx-4">
        {title && (
          <div className="px-6 py-4 border-b border-dark-700">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        <div className="px-6 py-4 border-t border-dark-700 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
