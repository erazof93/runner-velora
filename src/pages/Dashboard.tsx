import { Card } from '@/components/common/Card';

export function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
      <Card title="Bienvenido">
        <p className="text-gray-600 dark:text-gray-400">Selecciona una sección del menú para comenzar.</p>
      </Card>
    </div>
  );
}
