import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export function Sidebar() {
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
    { label: 'Perfil', path: '/settings/profile' },
    { label: 'Configuración', path: '/settings' },
  ];

  const navItems =
    user?.role === 'CLIENTE'
      ? athleteNavItems
      : user?.role === 'COACH'
        ? coachNavItems
        : [];

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (active: boolean) =>
    `block px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
      active ? 'bg-success text-black font-semibold' : 'text-slate-100 hover:bg-dark-700 hover:text-white'
    }`;

  return (
    <aside className="w-64 bg-dark-800 border-r border-dark-700 shadow-lg h-screen fixed left-0 top-16 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={linkClasses(isActive(item.path))}>
            {item.label}
          </Link>
        ))}

        <hr className="my-4 border-dark-700" />

        {commonItems.map((item) => (
          <Link key={item.path} to={item.path} className={linkClasses(isActive(item.path))}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
