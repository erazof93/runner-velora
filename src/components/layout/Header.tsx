import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  /** Abre el drawer del sidebar en móvil. Ausente => no se muestra el botón. */
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuthStore();

  return (
    <header className="bg-dark-800/95 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            {onMenuClick && (
              <button
                type="button"
                onClick={onMenuClick}
                aria-label="Abrir menú"
                className="md:hidden -ml-2 rounded-lg p-2 text-slate-50 hover:bg-dark-700 transition-colors"
              >
                <Menu className="size-5" />
              </button>
            )}
            <Link to="/" className="flex items-center gap-3 group">
              <span className="text-2xl">🏃</span>
              <span className="text-lg font-bold text-primary group-hover:text-primary-hover transition-colors">
                Runner Velora
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {user && <ThemeToggle />}
            {user ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors duration-200 text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
