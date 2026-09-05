import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/lib/hooks/useToast';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

export function LoginForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const { login, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);

      // Leer el estado recién actualizado directamente del store,
      // en vez de la variable `user` capturada en este render.
      const loggedInUser = useAuthStore.getState().user;
      toast.success(`¡Bienvenido, ${loggedInUser?.name ?? ''}!`.trim());
      if (loggedInUser?.role === 'CLIENTE') {
        navigate('/athlete');
      } else if (loggedInUser?.role === 'COACH') {
        navigate('/coach');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Login falló. Revisa tu email y contraseña.';
      setFormError(message);
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-900">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">🏃 Runner Velora</h1>
          <p className="text-slate-100 mt-2">Inicia sesión para continuar</p>
        </div>

        {(error || formError) && (
          <div className="mb-4 p-3 bg-error/20 border border-error rounded-lg">
            <p className="text-error text-sm">{error || formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
            disabled={isLoading}
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={isLoading}
          />

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue/10 border border-blue/30 rounded-lg">
          <p className="text-sm text-slate-100 mb-2">
            <strong>Credenciales de prueba:</strong>
          </p>
          <p className="text-xs text-slate-100">
            <strong>Atleta:</strong> cliente@velora.com / Cliente123!
          </p>
          <p className="text-xs text-slate-100">
            <strong>Coach:</strong> coach@velora.com / Coach123!
          </p>
        </div>
      </Card>
    </div>
  );
}
