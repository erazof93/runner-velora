# Deployment - Runner Velora

Auto-deploy a Vercel en push a `main`.

## 🚀 Primera Deploy

### 1. Crear repo en GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<user>/runner-velora.git
git branch -M main
git push -u origin main
```

### 2. Conectar a Vercel

1. Vercel.com → New Project
2. Seleccionar repo: runner-velora
3. Framework: Vite (auto-detectado)
4. Build Command: `pnpm build`
5. Output Directory: `dist`
6. Environment Variables:

```
VITE_API_URL=https://backend-running-production.up.railway.app/api/v1
VITE_APP_NAME=Runner Velora
```

7. Click Deploy

### 3. Esperar deployment

~2-3 minutos. Cuando esté verde: ✅ LIVE

## 🔄 Auto Deploy

Cada push a main:
- Vercel detecta cambio
- Build automático
- Deploy automático (~2 min)

## 📊 Monitoreo

### Analytics
Vercel → Project → Analytics
- Page load times
- Core Web Vitals
- Error rate

### Logs

Vercel → Deployments → [latest] → Logs

Ver errores de build y runtime.

## 🌐 URL

**Production:** https://runner-velora.vercel.app

## 🔧 Variables de Entorno

Actualizar en Vercel → Settings → Environment Variables

**No commitear secretos a GitHub** ⚠️

## 🆘 Troubleshooting

### Build fails

```
Error: Cannot find module 'X'
```

Solución:
```bash
pnpm install
pnpm build
```

### API returns 404

Verificar VITE_API_URL en Vercel env vars.

### CORS error

Backend CORS debe permitir:
- Production: https://runner-velora.vercel.app
- Development: http://localhost:5173