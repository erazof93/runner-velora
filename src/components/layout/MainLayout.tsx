import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/store/authStore';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className={isAuthenticated ? 'pl-64' : ''}>
        <div className="max-w-7xl mx-auto p-8 min-h-screen">{children}</div>
      </main>
    </div>
  );
}
