import { Moon, Sun } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export function ThemeToggle() {
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex size-9 items-center justify-center rounded-lg text-slate-100 transition-colors hover:bg-dark-700 hover:text-slate-50"
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
