import { Calendar, DollarSign, Star, Users } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card } from '@/components/common/Card';

export function CoachDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-50">¡Hola, Coach {user?.name}! 🏋️</h1>
        <p className="text-slate-100 mt-2">Gestiona tus atletas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Atletas" value={3} icon={Users} />
        <StatCard title="Sesiones" value={12} icon={Calendar} />
        <StatCard title="Ganancias" value="$2,450" icon={DollarSign} />
        <StatCard title="Rating" value="4.8" icon={Star} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Próximas Sesiones">
          <p className="text-sm text-slate-100">📅 Hoy 10:00 - Atleta 1</p>
          <p className="text-sm text-slate-100">📅 Mañana 14:00 - Atleta 2</p>
        </Card>
        <Card title="Mensajes">
          <p className="text-sm text-slate-100">
            <strong>Atleta 1:</strong> ¿A qué hora?
          </p>
          <p className="text-sm text-slate-100">
            <strong>Atleta 2:</strong> ¡Completé el plan!
          </p>
        </Card>
      </div>
    </div>
  );
}
