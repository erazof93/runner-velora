import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { ATHLETE_NAV_ITEMS, COACH_NAV_ITEMS, COMMON_NAV_ITEMS, type NavItem } from './Navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuthStore();
  const location = useLocation();
  const expanded = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const navItems =
    user?.role === 'CLIENTE' ? ATHLETE_NAV_ITEMS : user?.role === 'COACH' ? COACH_NAV_ITEMS : [];

  const isActive = (path: string) => location.pathname === path;

  const renderLink = ({ label, path, icon: Icon }: NavItem) => (
    <Link
      key={path}
      to={path}
      onClick={onClose}
      title={label}
      className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        !expanded ? 'md:justify-center md:px-0' : ''
      } ${
        isActive(path)
          ? 'bg-primary/15 text-primary font-semibold'
          : 'text-slate-100 hover:bg-dark-700 hover:text-slate-50'
      }`}
    >
      <Icon className="size-5 shrink-0" />
      <span className={!expanded ? 'md:hidden' : ''}>{label}</span>
    </Link>
  );

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
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-[280px] ${
          expanded ? 'md:w-[280px]' : 'md:w-[76px]'
        } bg-dark-800 border-r border-dark-700 overflow-y-auto px-4 py-6 transition-all duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className={`text-lg font-bold text-primary ${!expanded ? 'md:hidden' : ''}`}>
            🏃 Runner
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden md:inline-flex size-8 items-center justify-center rounded-lg text-slate-100 hover:bg-dark-700 hover:text-slate-50"
            aria-label={expanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
          >
            <ChevronLeft className={`size-5 transition-transform ${!expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="space-y-1 mb-6">{navItems.map(renderLink)}</nav>

        <hr className="my-4 border-dark-700" />

        <nav className="space-y-1">{COMMON_NAV_ITEMS.map(renderLink)}</nav>
      </aside>
    </>
  );
}
