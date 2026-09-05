import { useState } from 'react';
import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useTheme } from '@/lib/hooks/useTheme';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  useTheme();
  const { isAuthenticated } = useAuthStore();
  const sidebarExpanded = useUIStore((s) => s.sidebarOpen);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900">
      <Header onMenuClick={isAuthenticated ? () => setMobileOpen(true) : undefined} />
      {isAuthenticated && <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />}
      <main
        className={
          isAuthenticated
            ? `transition-all duration-300 ${sidebarExpanded ? 'md:pl-[280px]' : 'md:pl-[76px]'}`
            : ''
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
          {isAuthenticated && <Breadcrumbs />}
          {children}
        </div>
      </main>
    </div>
  );
}
