import { useState } from 'react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

export interface ActivityFormData {
  title: string;
  activityType: 'run' | 'bike' | 'swim';
  distance: string;
  duration: string;
  notes: string;
}

interface ActivityFormProps {
  onSubmit?: (data: ActivityFormData) => Promise<void>;
}

const emptyForm: ActivityFormData = {
  title: '',
  activityType: 'run',
  distance: '',
  duration: '',
  notes: '',
};

export function ActivityForm({ onSubmit }: ActivityFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ActivityFormData>(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (onSubmit) await onSubmit(formData);
      setFormData(emptyForm);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="primary" className="w-full">
        ➕ Log Activity
      </Button>
    );
  }

  return (
    <Card title="Log New Activity" className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Morning Run"
          required
        />
        <div>
          <label className="block text-sm font-semibold text-slate-100 mb-2">Type</label>
          <select
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border-2 border-dark-700 rounded-lg bg-dark-800 text-white focus:border-primary focus:outline-none"
          >
            <option value="run">🏃 Run</option>
            <option value="bike">🚴 Bike</option>
            <option value="swim">🏊 Swim</option>
          </select>
        </div>
        <Input
          label="Distance (km)"
          name="distance"
          type="number"
          step="0.1"
          value={formData.distance}
          onChange={handleChange}
          required
        />
        <Input
          label="Duration (sec)"
          name="duration"
          type="number"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <div className="flex gap-2">
          <Button type="submit" variant="primary" isLoading={isLoading} className="flex-1">
            Save
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
