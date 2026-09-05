import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from './Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/** Captura errores de render de todo el árbol y muestra un fallback usable. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md rounded-xl border border-dark-700 bg-dark-800 p-8 text-center">
          <div className="mb-4 text-5xl" aria-hidden="true">
            ⚠️
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-50">Algo salió mal</h1>
          <p className="mb-6 text-slate-100">
            {this.state.error?.message ?? 'Ocurrió un error inesperado.'}
          </p>
          <Button variant="primary" className="w-full" onClick={this.handleReload}>
            Recargar página
          </Button>
        </div>
      </div>
    );
  }
}
