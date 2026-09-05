import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { usersService } from '@/services/usersService';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

export function SettingsProfile() {
  const { user, setUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    bio: user?.bio ?? '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSaving(true);
      setError(null);
      const updated = await usersService.updateProfile(user.id, formData);
      setUser({ ...user, ...updated });
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error guardando cambios');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-4xl font-bold text-white">Mi Perfil</h1>
        <p className="text-slate-100 mt-2">Gestiona tu información personal</p>
      </div>

      <Card className="p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-dark-700 rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-slate-100 mt-1">{user?.email}</p>
            <p className="text-slate-100 text-sm mt-1">
              Rol: <span className="font-semibold">{user?.role}</span>
            </p>
          </div>
        </div>

        {!isEditing ? (
          <Button variant="primary" onClick={() => setIsEditing(true)} className="w-full">
            Editar Perfil
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nombre"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              label="Biografía"
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
              placeholder="Cuéntanos sobre ti..."
            />

            {error && <p className="text-error text-sm">{error}</p>}

            <div className="flex gap-4">
              <Button type="submit" variant="primary" isLoading={isSaving} className="flex-1">
                Guardar Cambios
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>

            {saved && (
              <p className="text-success text-center font-semibold">✅ Cambios guardados</p>
            )}
          </form>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Suscripción</h2>
        <p className="text-slate-100">Plan Actual</p>
        <p className="text-2xl font-bold text-success mt-2">{user?.tier}</p>
      </Card>

      <Button variant="ghost" className="w-full" onClick={handleLogout}>
        🚪 Cerrar sesión
      </Button>
    </div>
  );
}
