# Runner Velora - Web App para Atletas y Coaches

Plataforma web para conectar atletas corredores con coaches personalizados.

## 🎯 Propósito

**Para Atletas (CLIENTE):**
- Log de actividades de running
- Buscar y contratar coaches
- Sesiones de coaching en vivo
- Planes de entrenamiento personalizados
- Análisis avanzado de performance

**Para Coaches:**
- Gestionar atletas
- Crear planes de entrenamiento
- Sesiones en vivo
- Ganar dinero (70% de fees)
- Dashboard de ganancias

## 🛠️ Stack Técnico

- **Framework:** React 19 + Vite
- **Lenguaje:** TypeScript
- **Styling:** Tailwind CSS v4
- **State:** Zustand
- **API:** Axios + React Query
- **Routing:** React Router v6
- **Validación:** Zod

## 🚀 Quick Start

```bash
# Instalar dependencias
pnpm install

# Crear archivo .env.local
cp .env.example .env.local

# Iniciar dev server
pnpm dev
```

URLs:
- **App:** http://localhost:5173
- **Backend:** http://localhost:3000
- **Swagger:** http://localhost:3000/docs

## 📚 Documentación

- [Setup Local](./SETUP.md) - Instalación y configuración
- [Arquitectura](./ARCHITECTURE.md) - Estructura del proyecto
- [API Endpoints](./API_ENDPOINTS.md) - Endpoints que consume
- [Features por Rol](./FEATURES.md) - Qué puede cada rol
- [Styling Guide](./STYLING.md) - Guía de estilos
- [Deployment](./DEPLOYMENT.md) - Deploy a Vercel
- [Roadmap](./ROADMAP.md) - Fases de desarrollo

## 🔐 Login de Prueba

**Atleta:**
```
Email: cliente@velora.com
Password: Cliente123!
```

**Coach:**
```
Email: coach@velora.com
Password: Coach123!
```

## 📦 Estructura de Carpetas

```
src/
├── components/     Componentes reutilizables
├── pages/          Páginas por ruta
├── hooks/          Custom React hooks
├── store/          Zustand stores
├── lib/            Utilidades, API, constantes
├── types/          TypeScript interfaces
└── styles/         Tailwind config
```

## 🔄 Deploy

Auto-deploy a Vercel en push a `main`.

**URL:** https://runner-velora.vercel.app

## 📖 Ver más

Consulta la documentación en `/docs` para más detalles.