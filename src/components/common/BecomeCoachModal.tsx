import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { useToast } from '@/lib/hooks/useToast';
import { coachService } from '@/services/coachService';
import type { CoachApplication } from '@/lib/api/types';

interface BecomeCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function errorText(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response;
    if (res?.data?.message) return res.data.message;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export function BecomeCoachModal({ isOpen, onClose }: BecomeCoachModalProps) {
  const toast = useToast();
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [existing, setExisting] = useState<CoachApplication | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ phone: '', experience: '', bio: '' });

  useEffect(() => {
    if (!isOpen) return;
    let alive = true;
    // `loadingStatus` arranca en true; el padre remonta el modal en cada apertura
    // (prop `key`), así que no hace falta re-ponerlo a true aquí.
    coachService
      .getMyApplication()
      .then((app) => alive && setExisting(app))
      .catch(() => alive && setExisting(null))
      .finally(() => alive && setLoadingStatus(false));
    return () => {
      alive = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const app = await coachService.submitApplication({
        phone: form.phone.trim(),
        experience: form.experience.trim(),
        bio: form.bio.trim() || undefined,
      });
      setExisting(app);
      toast.success('¡Solicitud enviada! Un administrador la revisará pronto.');
      setForm({ phone: '', experience: '', bio: '' });
    } catch (err) {
      toast.error(errorText(err, 'No se pudo enviar la solicitud'));
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit =
    form.phone.trim().length >= 6 && form.experience.trim().length >= 10;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="become-coach-title"
        className="w-full max-w-lg rounded-xl border border-dark-700 bg-dark-800 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-dark-700 px-6 py-4">
          <h2 id="become-coach-title" className="text-lg font-semibold text-slate-50">
            🏋️ Quiero ser Coach
          </h2>
        </div>

        <div className="px-6 py-4">
          {loadingStatus ? (
            <p className="text-sm text-slate-100">Cargando…</p>
          ) : existing?.status === 'pending' ? (
            <div className="space-y-2 text-sm text-slate-100">
              <p className="font-medium text-slate-50">Solicitud pendiente</p>
              <p>
                Ya enviaste una solicitud el{' '}
                {new Date(existing.createdAt).toLocaleDateString('es-ES')}. Un
                administrador la revisará pronto.
              </p>
            </div>
          ) : existing?.status === 'approved' ? (
            <div className="space-y-2 text-sm text-slate-100">
              <p className="font-medium text-success">¡Solicitud aprobada!</p>
              <p>Vuelve a iniciar sesión para acceder al panel de coach.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {existing?.status === 'rejected' && (
                <div className="rounded-lg border border-error/40 bg-error/10 p-3 text-sm text-slate-100">
                  Tu solicitud anterior fue rechazada
                  {existing.reviewNote ? `: ${existing.reviewNote}` : '.'} Puedes
                  volver a enviarla.
                </div>
              )}
              <Input
                label="Teléfono de contacto"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+34 600 123 456"
                required
              />
              <div className="w-full">
                <label
                  htmlFor="coach-experience"
                  className="block text-sm font-semibold text-slate-100 mb-2"
                >
                  Experiencia en coaching
                </label>
                <textarea
                  id="coach-experience"
                  value={form.experience}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, experience: e.target.value }))
                  }
                  placeholder="Años entrenando, titulaciones, tipo de atletas…"
                  rows={4}
                  required
                  className="w-full rounded-lg border-2 border-dark-700 bg-dark-800 px-4 py-2.5 text-base text-slate-50 placeholder-slate-200 shadow-sm transition-all duration-200 focus:border-primary focus:bg-dark-700/40 focus:outline-none"
                />
              </div>
              <Input
                label="Bio pública (opcional)"
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                placeholder="Cómo te presentarás en el marketplace"
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={submitting}
                  disabled={!canSubmit}
                >
                  Enviar solicitud
                </Button>
              </div>
            </form>
          )}

          {!loadingStatus && existing && existing.status !== 'rejected' && (
            <div className="mt-4 flex justify-end">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
