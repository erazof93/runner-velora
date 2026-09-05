import { useEffect, useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { EmptyState } from '@/components/common/EmptyState';
import { ListSkeleton } from '@/components/common/Skeleton';
import { PlanForm } from '@/components/coach/PlanForm';
import { coachService } from '@/services/coachService';
import { useToast } from '@/lib/hooks/useToast';
import type { CreateTrainingPlanDto, TrainingPlan } from '@/lib/api/types';

function errorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response;
    if (res?.data?.message) return res.data.message;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export function TrainingPlans() {
  const toast = useToast();
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TrainingPlan | null>(null);
  const [deletingPlan, setDeletingPlan] = useState<TrainingPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await coachService.getMyPlans();
        setPlans(data);
      } catch (err: unknown) {
        setError(errorMessage(err, 'Error cargando planes'));
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  const handleCreate = async (data: CreateTrainingPlanDto) => {
    try {
      const newPlan = await coachService.createPlan(data);
      setPlans((prev) => [newPlan, ...prev]);
      setFormOpen(false);
      toast.success('Plan creado');
    } catch (err: unknown) {
      toast.error(errorMessage(err, 'Error creando plan'));
    }
  };

  const handleUpdate = async (data: CreateTrainingPlanDto) => {
    if (!editingPlan) return;
    try {
      const updated = await coachService.updatePlan(editingPlan.id, data);
      setPlans((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setEditingPlan(null);
      toast.success('Plan actualizado');
    } catch (err: unknown) {
      toast.error(errorMessage(err, 'Error actualizando plan'));
    }
  };

  const handleDelete = async () => {
    if (!deletingPlan) return;
    try {
      setIsDeleting(true);
      await coachService.deletePlan(deletingPlan.id);
      setPlans((prev) => prev.filter((p) => p.id !== deletingPlan.id));
      toast.success('Plan eliminado');
      setDeletingPlan(null);
    } catch (err: unknown) {
      toast.error(errorMessage(err, 'Error eliminando plan'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-50">📅 Planes</h1>
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

      {loading && <ListSkeleton />}

      {!loading && error && (
        <EmptyState icon="⚠️" title="No se pudieron cargar los planes" description={error} />
      )}

      {!loading && !error && plans.length === 0 && (
        <EmptyState
          icon="📅"
          title="Sin planes todavía"
          description="Crea tu primer plan de entrenamiento para tus atletas."
          action={formOpen ? undefined : { label: 'Nuevo plan', onClick: () => setFormOpen(true) }}
        />
      )}

      {!loading && !error && plans.length > 0 && (
        <div className="space-y-3">
          {plans.map((p) => (
            <Card key={p.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-50">{p.name}</h3>
                  {p.description && (
                    <p className="mt-1 text-sm text-slate-100">{p.description}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-200">
                    Semana: {new Date(p.weekStart).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setEditingPlan(p)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => setDeletingPlan(p)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deletingPlan !== null}
        title="Eliminar plan"
        danger
        confirmLabel="Eliminar"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeletingPlan(null)}
      >
        ¿Seguro que quieres eliminar <strong className="text-slate-50">{deletingPlan?.name}</strong>?
        Esta acción no se puede deshacer.
      </ConfirmDialog>
    </div>
  );
}
