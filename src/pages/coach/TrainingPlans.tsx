import { useEffect, useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { PlanForm } from '@/components/coach/PlanForm';
import { coachService } from '@/services/coachService';
import type { CreateTrainingPlanDto, TrainingPlan } from '@/lib/api/types';

export function TrainingPlans() {
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TrainingPlan | null>(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await coachService.getMyPlans();
        setPlans(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Error cargando planes');
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  const handleCreate = async (data: CreateTrainingPlanDto) => {
    const newPlan = await coachService.createPlan(data);
    setPlans((prev) => [newPlan, ...prev]);
    setFormOpen(false);
  };

  const handleUpdate = async (data: CreateTrainingPlanDto) => {
    if (!editingPlan) return;
    const updated = await coachService.updatePlan(editingPlan.id, data);
    setPlans((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingPlan(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este plan?')) return;
    try {
      await coachService.deletePlan(id);
      setPlans((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Error eliminando plan');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">📅 Planes</h1>
        {!formOpen && !editingPlan && (
          <Button variant="primary" onClick={() => setFormOpen(true)}>
            ➕ Nuevo
          </Button>
        )}
      </div>

      {formOpen && <PlanForm onSubmit={handleCreate} onCancel={() => setFormOpen(false)} />}
      {editingPlan && (
        <PlanForm
          key={editingPlan.id}
          initialData={editingPlan}
          onSubmit={handleUpdate}
          onCancel={() => setEditingPlan(null)}
        />
      )}

      {loading && <div className="text-center py-12 text-slate-100">Cargando planes...</div>}
      {error && <div className="text-error text-center py-12">{error}</div>}

      {!loading && !error && (
        <div className="space-y-3">
          {plans.length === 0 ? (
            <p className="text-slate-100">No hay planes aún</p>
          ) : (
            plans.map((p) => (
              <Card key={p.id} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white">{p.name}</h3>
                    {p.description && <p className="text-sm text-slate-100 mt-1">{p.description}</p>}
                    <p className="text-xs text-slate-200 mt-1">
                      Semana: {new Date(p.weekStart).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setEditingPlan(p)}>
                      Editar
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
