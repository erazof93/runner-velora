import { toast } from 'sonner';

/**
 * Wrapper fino sobre `sonner` para no acoplar las páginas a la librería
 * directamente y mantener una API estable (success / error / warning / ...).
 */
export function useToast() {
  return {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    warning: (message: string) => toast.warning(message),
    info: (message: string) => toast(message),
    loading: (message: string) => toast.loading(message),
    dismiss: (id?: string | number) => toast.dismiss(id),
  };
}
