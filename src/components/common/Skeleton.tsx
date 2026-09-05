interface SkeletonProps {
  className?: string;
}

/** Bloque gris con pulso. Usar para reservar el espacio del contenido real. */
export function Skeleton({ className = 'h-4 w-full' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-dark-700 ${className}`} aria-hidden="true" />;
}

/** Placeholder con la forma aproximada de una Card de la app. */
export function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-dark-700 bg-dark-800 p-4">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

interface ListSkeletonProps {
  count?: number;
}

/** Lista de CardSkeleton para estados de carga de páginas con listados. */
export function ListSkeleton({ count = 3 }: ListSkeletonProps) {
  return (
    <div className="space-y-3" role="status" aria-label="Cargando contenido">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
      <span className="sr-only">Cargando…</span>
    </div>
  );
}
