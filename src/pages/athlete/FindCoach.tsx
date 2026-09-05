import { useState } from 'react';
import { Input } from '@/components/common/Input';
import { CoachCard } from '@/components/dashboard/CoachCard';

const coaches = [
  { id: '1', name: 'Coach Juan', bio: '5K specialist', specialties: ['5K', 'Marathon'], rating: 4.8, reviews: 42 },
  { id: '2', name: 'Coach Maria', bio: 'Triathlon expert', specialties: ['Triathlon', 'Swimming'], rating: 4.9, reviews: 28 },
  { id: '3', name: 'Coach Carlos', bio: 'Speed training', specialties: ['Speed', 'Endurance'], rating: 4.7, reviews: 35 },
];

export function FindCoach() {
  const [search, setSearch] = useState('');

  const filtered = coaches.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">🏋️ Encuentra tu Coach</h1>
        <p className="text-slate-100 mt-2">Conecta con coaches certificados</p>
      </div>
      <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((c) => (
          <CoachCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
