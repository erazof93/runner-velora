# Setup Local - Runner Velora

## 📋 Prerequisites

- Node 20+
- pnpm 9+
- Git
- Backend corriendo en localhost:3000

## 🚀 Instalación

### 1. Clonar y navegar

```bash
cd runner-velora
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Crear archivo .env.local

```bash
cp .env.example .env.local
```

### 4. Editar .env.local

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Runner Velora
VITE_USE_MOCKS=false
```

### 5. Iniciar dev server

```bash
pnpm dev
```

La app se abre en: http://localhost:5173

## 🔗 URLs Importantes

| Servicio | URL | Puerto |
|----------|-----|--------|
| App Web | http://localhost:5173 | 5173 |
| Backend API | http://localhost:3000 | 3000 |
| Swagger Docs | http://localhost:3000/docs | 3000 |
| PostgreSQL | localhost:5433 | 5433 |

## 🔐 Login de Prueba

### Atleta (CLIENTE)

```
Email: cliente@velora.com
Password: Cliente123!
```

### Coach

```
Email: coach@velora.com
Password: Coach123!
```

## 🧪 Comandos Útiles

```bash
# Development
pnpm dev

# Build
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm type-check

# Linting
pnpm lint

# Format
pnpm format
```

## 🐛 Troubleshooting

### "Cannot reach API"

1. Verifica que backend corre: http://localhost:3000/health
2. Verifica VITE_API_URL en .env.local
3. Hard refresh: Ctrl+Shift+R

### CORS Error

Backend necesita CORS habilitado para localhost:5173

### Build fails

```bash
# Limpiar y reinstalar
rm -rf node_modules
pnpm install
pnpm build