import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-slate-50">404</h1>
        <p className="text-xl text-slate-100">Página no encontrada</p>
        <Link to="/">
          <Button>Ir al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
