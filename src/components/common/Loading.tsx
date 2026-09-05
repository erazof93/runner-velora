export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-success"></div>
        </div>
        <p className="text-slate-100 text-center">Cargando...</p>
      </div>
    </div>
  );
}
