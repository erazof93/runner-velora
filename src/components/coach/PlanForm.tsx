import { useState } from 'react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import type { CreateTrainingPlanDto, TrainingPlan } from '@/lib/api/types';

interface PlanFormProps {
  onSubmit: (data: CreateTrainingPlanDto) => Promise<void>;
  onCancel: () => void;
  initialData?: TrainingPlan;
}

function toFormData(plan?: TrainingPlan): CreateTrainingPlanDto {
  if (!plan) {
    return {
      name: '',
      weekStart: new Date().toISOString().slice(0, 10),
      description: '',
      exercises: [],
    };
  }
  return {
    name: plan.name,
    weekStart: plan.weekStart.slice(0, 10),
    description: plan.description ?? '',
    exercises: plan.exercises,
  };
}

export function PlanForm({ onSubmit, onCancel, initialData }: PlanFormProps) {
  const [formData, setFormData] = useState<CreateTrainingPlanDto>(() => toFormData(initialData));
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title={initialData ? 'Editar Plan' : 'Crear Nuevo Plan'} className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre del Plan"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Ej: Plan Base 8 semanas"
          required
        />
        <Input
          label="Semana de inicio"
          type="date"
          value={formData.weekStart}
          onChange={(e) => setFormData((prev) => ({ ...prev, weekStart: e.target.value }))}
          required
        />
        <Input
          label="Descripción"
          value={formData.description ?? ''}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Ej: Plan enfocado en resistencia"
        />
        <div className="flex gap-2">
          <Button type="submit" variant="primary" isLoading={isLoading} className="flex-1">
            {initialData ? 'Guardar cambios' : 'Crear Plan'}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
}
