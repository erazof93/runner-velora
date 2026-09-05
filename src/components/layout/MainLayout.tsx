import { useState } from 'react';
import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/store/authStore';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900">
      <Header onMenuClick={isAuthenticated ? () => setSidebarOpen(true) : undefined} />
      {isAuthenticated && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <main className={isAuthenticated ? 'md:pl-[280px]' : ''}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
