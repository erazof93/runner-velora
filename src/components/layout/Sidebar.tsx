import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuthStore();
  const location = useLocation();

  const athleteNavItems = [
    { label: '📊 Dashboard', path: '/athlete' },
    { label: '📋 Actividades', path: '/athlete/activities' },
    { label: '🏋️ Buscar Coach', path: '/athlete/find-coach' },
  ];

  const coachNavItems = [
    { label: '📊 Dashboard', path: '/coach' },
    { label: '👥 Mis Atletas', path: '/coach/athletes' },
    { label: '📅 Planes', path: '/coach/plans' },
    { label: '💰 Ganancias', path: '/coach/earnings' },
  ];

  const commonItems = [
    { label: '👤 Perfil', path: '/settings/profile' },
    { label: '⚙️ Configuración', path: '/settings' },
  ];

  const navItems =
    user?.role === 'CLIENTE'
      ? athleteNavItems
      : user?.role === 'COACH'
        ? coachNavItems
        : [];

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (active: boolean) =>
    `block px-4 py-3 rounded-[10px] transition-all duration-200 text-sm font-medium ${
      active
        ? 'bg-primary/15 text-primary font-semibold'
        : 'text-slate-100 hover:bg-dark-700 hover:text-white'
    }`;

  return (
    <>
      {/* Backdrop: solo en móvil, cuando el drawer está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          role="presentation"
        />
      )}

      <aside
        className={`w-[280px] bg-dark-800 border-r border-dark-700 h-screen fixed left-0 top-16 z-40 overflow-y-auto px-4 py-6 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="text-lg font-bold text-primary mb-8">🏃 Runner</div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={linkClasses(isActive(item.path))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <hr className="my-4 border-dark-700" />

        <nav className="space-y-2">
          {commonItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={linkClasses(isActive(item.path))}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
