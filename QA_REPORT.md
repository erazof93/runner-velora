# QA Testing Report — runner-velora

- **Fecha:** 2026-09-05
- **Ejecutado por:** Claude Code (automatización de navegador + revisión de código)
- **Commit probado:** `b4c0366` (design refine) sobre `36c1d34` (polish)
- **Entorno:** dev local (`npm run dev`, Vite) apuntando al **backend de producción**
  (`.env.local` → `https://backend-running-production.up.railway.app/api/v1`).
  Es decir: el frontend es local pero **todas las llamadas de red van al backend real de Railway**.
- **Herramientas usadas:** Chrome (automatizado), `npm run build`, `tsc -b --noEmit`, `oxlint`.
- **No cubierto en este pase:** viewport móvil real (el viewport del navegador no se
  redimensiona en este entorno — evaluado por código), Lighthouse (sin herramienta),
  lector de pantalla, modo offline real, throttling Slow-3G visual.

---

## Resumen ejecutivo

| Área | Estado |
|---|---|
| Build / type-check / lint | ✅ Verde |
| Auth (login OK, redirect por rol, logout) | ✅ Funciona |
| Coach: Planes CRUD contra prod (crear / listar / borrar) | ✅ Funciona |
| Perfil: editar (`PUT /users/:id`) | ✅ Funciona |
| Seguir coach (`POST /users/:id/follow`) | ✅ Funciona |
| Toasts (sonner) | ✅ Funciona |
| ConfirmDialog (Escape, backdrop, confirmar) | ✅ Funciona |
| EmptyState en listados vacíos | ✅ Funciona |
| Errores de consola durante la navegación | ✅ Ninguno |
| **Refresco / deep-link en ruta protegida** | ❌ **Bug (alto)** |
| **Feedback de error en login fallido** | ❌ **Bug (alto)** |
| **Responsive móvil con sesión iniciada** | ❌ **Bug (alto)** |
| Coach Dashboard / Actividades del atleta | ⚠️ Datos hardcodeados (mock) |
| Pills de CoachDetail | ⚠️ Texto invisible (Tailwind v3→v4) |

**Veredicto:** el núcleo funcional (auth, CRUD de planes, perfil, toasts, modales,
empty states) funciona de punta a punta contra el backend real. **No está listo para
producción** por 3 defectos de alto impacto (refresco de rutas protegidas, login sin
feedback de error, no usable en móvil autenticado) y varias páginas todavía con datos
simulados.

---

## Resultados por fase

### FASE 1 — Build / tooling
| Check | Resultado |
|---|---|
| `npm run build` | ✅ OK (216 módulos; `index` 403 kB / 126 kB gzip; un chunk por ruta vía `lazy()`) |
| `tsc -b --noEmit` | ✅ Sin errores |
| `oxlint` | ✅ Sin errores |
| Bundle total | ✅ ~430 kB sin gzip, muy por debajo de 1 MB |

### FASE 2 — Auth & Routing
| Test | Resultado | Nota |
|---|---|---|
| `/` sin sesión | ⚠️ Muestra `Dashboard` genérico | **No** redirige a `/login`; la ruta `/` no está protegida |
| Login OK (`cliente@velora.com` / `Cliente123!`) | ✅ | Redirige a `/athlete`, header muestra el nombre |
| Login OK (`coach@velora.com` / `Coach123!`) | ✅ | Redirige a `/coach` |
| Toast de bienvenida tras login | ❌ | No existe (ver Bug #8) |
| Login fallido (credenciales inválidas) | ❌ | **Sin mensaje de error** (ver Bug #2) |
| Ruta protegida sin sesión (`/coach` directo) | ✅ | Redirige a `/login` |
| Refresco (F5 / deep-link) estando autenticado | ❌ | **Expulsa a `/login`** (ver Bug #1) |

### FASE 3 — Rol ATLETA (`cliente@velora.com`)
| Test | Resultado | Nota |
|---|---|---|
| Dashboard atleta | ✅ | 4 stat cards (0 / 0.0 km / 0 min / FREE), datos reales de prod (vacío) |
| Estado de carga del dashboard | ⚠️ | Texto "Cargando…", no `ListSkeleton` |
| "Mis Actividades" (dashboard) vacío | ⚠️ | `<p>` plano, no `EmptyState` |
| Página **Actividades** (`/athlete/activities`) | ❌ | **100 % datos hardcodeados** (3 actividades falsas), sin llamada API |
| Buscar Coach (`/athlete/find-coach`) | ✅ | `GET /coach/marketplace` 200 → 1 coach ("Coach Test"); input con `aria-label` |
| CoachCard del dashboard atleta | ❌ | Botón "Ver Perfil" **muerto** (no envuelto en `<Link>`, ver Bug #7) |
| CoachDetail (`/athlete/coach/:id`) | ⚠️ | Carga; pills "👥 0 atletas / 📅 0 planes" con **texto invisible** (Bug #4) |
| Seguir coach | ✅ | `POST /users/:id/follow` 200 → botón pasa a "✅ Siguiendo" (deshabilitado). Error path usa `alert()` (Bug #10) |
| Perfil: ver datos | ✅ | Nombre, email, rol, tier correctos |
| Perfil: editar nombre → Guardar | ✅ | `PUT /users/:id` 200 → **toast "Perfil actualizado"**, se refleja en card y header |
| Logout (Perfil) → ConfirmDialog → Escape | ✅ | Cierra el modal |
| Logout → confirmar | ✅ | **toast "Sesión cerrada"** → redirige a `/login` |

### FASE 4 — Rol COACH (`coach@velora.com`)
| Test | Resultado | Nota |
|---|---|---|
| Dashboard coach | ❌ | **100 % hardcodeado**: "Atletas 3", "$2,450", "Rating 4.8", sesiones y mensajes falsos. El coach real tiene 0/0/$0 |
| Saludo | ⚠️ | "¡Hola, **Coach Coach Test**!" — duplica "Coach" (Bug #13) |
| Mis Atletas (`/coach/athletes`) | ✅ | `GET /coach/athletes` 200 → `[]` → **`EmptyState` "Sin atletas asignados"** |
| Planes (`/coach/plans`) vacío | ✅ | `GET /coach/plans` 200 → `[]` → **`EmptyState` "Sin planes todavía"** con botón "Nuevo plan" |
| Crear plan | ✅ | Form → `POST /coach/plans` 201 → **toast "Plan creado"** → card aparece en la lista |
| Fecha del plan en la card | ⚠️ | Off-by-one: se ingresó 05/09/2026, muestra "Semana: 4/9/2026" (TZ, Bug #11) |
| Eliminar plan → ConfirmDialog | ✅ | Modal "¿Seguro que quieres eliminar **QA Test Plan**?…" |
| Eliminar plan → confirmar | ✅ | `DELETE /coach/plans/:id` 200 → **toast "Plan eliminado"** → vuelve a `EmptyState` |
| Ganancias (`/coach/earnings`) | ✅ | `GET /coach/earnings` 200 → 4 KPIs ($0/$0/$0/0) + card "Transacciones" con `EmptyState` anidado |
| `GET /coach/earnings/stats` | — | **No existe** ese endpoint; los KPIs se calculan en cliente desde `/coach/earnings` (el checklist original estaba equivocado) |

### FASE 5 — Edge cases
| Test | Resultado | Nota |
|---|---|---|
| Empty states | ✅ | Verificados en vivo: Planes, Mis Atletas, Ganancias (datos reales vacíos de prod) |
| ConfirmDialog: cancelar / Escape / confirmar | ✅ | Los tres caminos funcionan |
| Toasts éxito | ✅ | Perfil, crear plan, borrar plan, logout — todos con `sonner` (`richColors`, `closeButton`) |
| Validación de formulario (crear plan sin campos) | ⚠️ | Solo `required` nativo del navegador; sin mensajes de error propios ni botón deshabilitado |
| Errores de red / offline | — | No probado (no se pudo forzar offline en el entorno) |
| Skeletons con Slow-3G | — | No probado visualmente; `ListSkeleton` está en el bundle y se usa en TrainingPlans/FindCoach/MyAthletes/Earnings |
| Responsive móvil | ❌ | Ver Bug #3 (evaluado por código: sin breakpoints, sidebar `fixed 280px`) |

### FASE 6 — Performance
| Test | Resultado |
|---|---|
| Code-splitting por ruta | ✅ `lazy()` + `<Suspense>`; cada página es su propio chunk (0.4–4 kB) |
| Bundle principal | ✅ 403 kB (126 kB gzip) — React 19 + router + axios + zustand + zod + sonner |
| Lighthouse | — No ejecutado (sin herramienta en este entorno) |

### FASE 7 — Seguridad (básica)
| Test | Resultado | Nota |
|---|---|---|
| Almacenamiento del JWT | ⚠️ | `localStorage` (`accessToken`, `refreshToken`, `user`). Patrón SPA común pero expuesto a XSS; no hay cookie `httpOnly` |
| Envío del token | ✅ | `Authorization: Bearer …` vía interceptor de axios |
| Manejo de 401 | ⚠️ | Interceptor hace `logout()` + `window.location.href='/login'`. Correcto para sesión expirada, **pero se dispara también en el login fallido** (causa el Bug #2) |
| Credenciales hardcodeadas | ✅ | Solo el texto de ayuda del login (intencional) |
| XSS | ✅ | React escapa por defecto; no se encontró `dangerouslySetInnerHTML` |
| Password en la red | ✅ | Solo en el body de `POST /auth/login` (HTTPS) |

### FASE 8 — Accesibilidad (básica)
| Test | Resultado | Nota |
|---|---|---|
| Anillo de foco visible | ✅ | `:focus-visible { outline: 2px solid … }` global (añadido en `b4c0366`) |
| Escape cierra el modal | ✅ | `ConfirmDialog` |
| `role="dialog"` + `aria-modal` en el modal | ✅ | `ConfirmDialog` |
| `role="status"` en skeletons | ✅ | `ListSkeleton` + texto `sr-only` |
| `aria-label` en inputs sin `<label>` | ✅ | Buscador de coach |
| Contraste de texto | ⚠️ | General OK (emerald + texto negro ≈ 6.5:1; `slate-100` sobre `dark-800` ≈ 9:1). **Falla** en las pills de CoachDetail (Bug #4) |
| Distinción de los dos grupos de nav del sidebar | ⚠️ | Sin `aria-label` que los diferencie (menor) |

---

## Bugs encontrados

### 🔴 Alto

**#1 — Refrescar (o abrir por deep-link) cualquier ruta protegida expulsa a `/login`**
`restoreSession()` se ejecuta en un `useEffect` de `App` *después* del primer render.
En ese primer render `isAuthenticated` es `false`, así que `ProtectedRoute` hace
`<Navigate to="/login">` antes de que se hidrate la sesión. El header luego sí muestra
al usuario (la sesión se restauró), pero la vista se queda atascada en `/login`.
Rompe F5, "abrir en pestaña nueva" y cualquier enlace directo a `/athlete/*` o `/coach/*`.
*Fix sugerido:* llamar a `restoreSession()` de forma síncrona antes del primer render
(en el inicializador del store o en `main.tsx`), o añadir un flag `hydrated` y no
redirigir hasta que sea `true`.
Archivos: `src/App.tsx`, `src/store/authStore.ts`, `src/components/auth/ProtectedRoute.tsx`.

**#2 — Login con credenciales incorrectas: no se muestra ningún error**
El interceptor de respuesta en `src/lib/api/client.ts` hace
`if (error.response?.status === 401) { logout(); window.location.href = '/login' }`
para **cualquier** 401 — incluido el 401 de un intento de login fallido. La recarga
dura de `/login` ocurre antes de que `LoginForm` pinte su banner de error, así que el
usuario ve el formulario limpio y "no pasa nada". El manejo de error de `LoginForm`
es, en la práctica, código muerto para el caso más común.
*Fix sugerido:* excluir la ruta `/auth/login` del redirect del interceptor (o solo
redirigir si había sesión previa).

**#3 — No es usable en móvil con la sesión iniciada**
`MainLayout` renderiza `<Sidebar>` con `position: fixed; width: 280px` y `<main>` con
`padding-left: 280px`, **sin ningún breakpoint ni menú hamburguesa**. En una pantalla
de 390 px el sidebar ocupa el 72 % y el contenido queda con ~110 px útiles. La página
de login (sin sidebar) sí se ve bien. El checklist original ("navbar colapsa /
hamburger menu") no se cumple: no hay hamburguesa ni media query.
Archivos: `src/components/layout/MainLayout.tsx`, `src/components/layout/Sidebar.tsx`.

### 🟠 Medio

**#4 — CoachDetail: las pills de estadísticas tienen el texto invisible**
`src/pages/athlete/CoachDetail.tsx` usa `bg-success bg-opacity-20 text-success` (y la
variante azul). `bg-opacity-*` es una utilidad de **Tailwind v3 eliminada en v4**, así
que no hace nada → queda `bg-success` sólido con `text-success` encima (verde sobre
verde). "0 atletas" / "0 planes" no se leen.
*Fix:* `bg-success/20` y `bg-blue/20`.

**#5 — Coach Dashboard: datos 100 % hardcodeados**
`src/pages/coach/Dashboard.tsx` no hace ninguna llamada API. Muestra "Atletas 3",
"Ganancias $2,450", "Rating 4.8" y sesiones/mensajes ficticios. Un coach real ve
números falsos.

**#6 — Página "Actividades" del atleta: datos 100 % hardcodeados**
`src/pages/athlete/Activities.tsx` renderiza 3 actividades falsas fijas; no llama a la
API ni refleja el estado real/vacío. (El endpoint correcto es
`GET /activities/user/:userId`, no `/activities/me`.)

**#7 — Botón "Ver Perfil" muerto en el dashboard del atleta**
En `AthleteDashboard` el `<CoachCard>` no está envuelto en `<Link>` (a diferencia de
`FindCoach`), así que su botón "Ver Perfil" no navega a ninguna parte.

### 🟡 Bajo

- **#8** — Login correcto no muestra toast de bienvenida (nunca se implementó; `LoginForm` solo tiene banner de error inline).
- **#9** — Páginas que aún muestran "Cargando…" en vez de `<ListSkeleton>`: Athlete Dashboard, CoachDetail, AthleteDetail (el pase de *polish* cubrió TrainingPlans/FindCoach/MyAthletes/Earnings).
- **#10** — `CoachDetail` usa `alert()` en el error de "Seguir" (inconsistente con los toasts del resto).
- **#11** — Fecha de la semana del plan con off-by-one al mostrarla (`new Date(weekStart).toLocaleDateString` interpreta la medianoche UTC y en TZ local retrocede un día).
- **#12** — La ruta `/` (`Dashboard`) no está protegida: muestra una página genérica a usuarios sin sesión en lugar de redirigir a `/login`.
- **#13** — Saludo del coach: "¡Hola, Coach Coach Test!" (duplica "Coach": etiqueta + nombre).
- **#14** — Grupos de navegación del sidebar sin `aria-label` que los distinga.

---

## Nota sobre el backend de producción (Railway)

El backend está **arriba** (`/health` → `{status:"ok", db:"up"}`) pero la base de datos
de prod tiene un **seed antiguo**, distinto de `prisma/seed.ts` de este repo:

- Usuarios existentes: `cliente@velora.com` / `Cliente123!` (name "Cliente Test") y
  `coach@velora.com` / `Coach123!` (name "Coach Test"). Coinciden con el texto de
  ayuda del login.
- **No existen** `athlete@velora.com`, `admin@velora.com` ni `superadmin@velora.com`
  (los de `prisma/seed.ts`).
- Sin datos relacionales: `/coach/athletes`, `/coach/plans`, `/coach/earnings` y
  `/activities/user/:id` devuelven vacío. `/coach/marketplace` devuelve 1 coach.
- El seed enriquecido (commit `ca4061d` del repo backend) **no se ha ejecutado** en
  Railway (`start:prod` solo corre `prisma migrate deploy`, no el seed).

Para que las pantallas con listas muestren datos reales hay que ejecutar el seed en
Railway (`npx prisma db seed` desde el shell del servicio).

---

## Testing en producción (Vercel)

No se ejecutó un pase separado sobre `https://runner-velora.vercel.app`. Dado que este
pase local ya apunta al backend de producción, los resultados **funcionales** (auth,
CRUD, red) son representativos de producción. Lo que faltaría verificar específicamente
en la URL de Vercel: variables de entorno del deploy, headers/CSP, y el propio bundle
servido por Vercel. Los 3 bugs de alto impacto (#1, #2, #3) son de frontend y se
reproducirán igual en Vercel.
