import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/lib/hooks/useToast';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

export function Header() {
  const { user, logout } = useAuthStore();
  const toast = useToast();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    logout();
    setConfirmLogout(false);
    toast.success('Sesión cerrada');
  };

  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-2xl">🏃</span>
            <span className="text-lg font-bold text-success group-hover:text-success-hover transition-colors">
              Runner Velora
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-white font-medium text-sm">{user.name}</p>
                  <p className="text-slate-200 text-xs">{user.role}</p>
                </div>
                <button
                  onClick={() => setConfirmLogout(true)}
                  className="px-4 py-2 bg-error hover:bg-error-hover text-white rounded-lg font-semibold transition-colors duration-200 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-success hover:bg-success-hover text-black rounded-lg font-semibold transition-colors duration-200 text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmLogout}
        title="Cerrar sesión"
        danger
        confirmLabel="Cerrar sesión"
        onConfirm={handleLogout}
        onCancel={() => setConfirmLogout(false)}
      >
        ¿Seguro que quieres cerrar sesión?
      </ConfirmDialog>
    </header>
  );
}
