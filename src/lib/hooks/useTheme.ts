import { useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';

/** Sincroniza el tema del store con la clase `dark` en <html>. */
export function useTheme() {
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  return { theme, toggleTheme };
}
