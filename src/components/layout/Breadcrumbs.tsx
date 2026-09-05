import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ALL_NAV_ITEMS } from './Navigation';

function extraLabel(pathname: string): string | null {
  if (pathname.startsWith('/coach/athletes/')) return 'Detalle de Atleta';
  if (pathname.startsWith('/athlete/coach/')) return 'Perfil del Coach';
  return null;
}

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  if (!user) return null;

  const homePath = user.role === 'CLIENTE' ? '/athlete' : user.role === 'COACH' ? '/coach' : '/';
  const atHome = pathname === homePath;
  const label = ALL_NAV_ITEMS.find((item) => item.path === pathname)?.label ?? extraLabel(pathname);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-slate-100">
      <Link to={homePath} className="transition-colors hover:text-slate-50">
        Inicio
      </Link>
      {!atHome && label && (
        <>
          <ChevronRight className="size-4" />
          <span className="text-slate-50">{label}</span>
        </>
      )}
    </nav>
  );
}
