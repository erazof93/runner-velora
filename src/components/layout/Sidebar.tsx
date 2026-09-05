import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export function Sidebar() {
  const { user } = useAuthStore();
  const location = useLocation();

  const athleteNavItems = [
    { label: 'Dashboard', path: '/athlete' },
    { label: 'Actividades', path: '/athlete/activities' },
    { label: 'Buscar Coach', path: '/athlete/find-coach' },
  ];

  const coachNavItems = [
    { label: 'Dashboard', path: '/coach' },
    { label: 'Mis Atletas', path: '/coach/athletes' },
    { label: 'Planes', path: '/coach/plans' },
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

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow h-screen fixed left-0 top-16">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-orange-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {item.label}
          </Link>
        ))}

        <hr className="my-4 dark:border-gray-700" />

        {commonItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-orange-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
