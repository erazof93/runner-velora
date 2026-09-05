import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, UserRound } from 'lucide-react';
import { Dropdown } from '@/components/common/Dropdown';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/lib/hooks/useToast';
import type { UserRole } from '@/types/user';

const ROLE_LABELS: Record<UserRole, string> = {
  CLIENTE: 'Atleta',
  COACH: 'Coach',
  ADMIN: 'Admin',
  SUPERADMIN: 'Superadmin',
};

export function UserMenu() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();
  const [confirmLogout, setConfirmLogout] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setConfirmLogout(false);
    toast.success('Sesión cerrada');
    navigate('/login');
  };

  const roleLabel = ROLE_LABELS[user.role] ?? user.role;

  return (
    <>
      <Dropdown
        align="end"
        items={[
          { label: user.email, disabled: true },
          { label: `Rol: ${roleLabel}`, disabled: true },
          { divider: true, label: 'sep' },
          {
            label: 'Cerrar sesión',
            icon: <LogOut className="size-4" />,
            danger: true,
            onClick: () => setConfirmLogout(true),
          },
        ]}
        trigger={
          <span className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-50 transition-colors hover:bg-dark-700">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <UserRound className="size-4" />
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block font-medium">{user.name}</span>
              <span className="block text-xs text-primary">{roleLabel}</span>
            </span>
            <ChevronDown className="size-4 text-slate-100" />
          </span>
        }
      />

      <ConfirmDialog
        isOpen={confirmLogout}
        title="Cerrar sesión"
        danger
        confirmLabel="Cerrar sesión"
        onConfirm={handleLogout}
        onCancel={() => setConfirmLogout(false)}
      >
        ¿Seguro que quieres cerrar sesión?
      </ConfirmDialog>
    </>
  );
}
