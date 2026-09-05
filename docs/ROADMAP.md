# Roadmap - Runner Velora

## 📅 FASE 1: MVP (Semana 1-2)

### Auth ✅
- Login
- Register
- JWT + Protected routes
- Logout

### Atleta Dashboard ✅
- Home page
- Log activity form
- My activities list
- Stats básicos
- Search coaches

### Coach Dashboard ✅
- Profile page
- Specialties list
- Appear in marketplace
- View athletes (read-only)

### Monetización ✅
- Upgrade PREMIUM button → Stripe
- Upgrade PRO_COACHING button → Stripe
- Show tier status

### Common ✅
- Header (nav, profile menu)
- Sidebar (navigation)
- Dark mode toggle
- Settings page
- Profile edit

## 📅 FASE 2: Coaching Features (Semana 3)

### Live Coaching ⏳
- WebRTC integration
- Video call interface
- Session scheduling
- Session history

### Coach-Athlete Relationship ⏳
- Accept athlete flow
- My athletes list
- Athlete management

### Training Plans ⏳
- Create custom plans
- Assign to athletes
- Plan tracking

## 📅 FASE 3: Advanced (Semana 4)

### Analytics ⏳
- Advanced metrics
- Charts and graphs
- Performance trends
- Comparatives (anonymized)

### Notifications ⏳
- Session reminders
- Messages
- In-app notifications
- Email notifications

### Mobile Responsiveness ⏳
- Full mobile optimization
- Touch-friendly UI
- Reduced animations for mobile

## 🎯 MVP Scope (Semana 1-2)

**Mínimo viable:**
- Usuarios pueden registrarse
- Atletas pueden buscar coaches
- Coaches pueden aparecer en marketplace
- Ambos pueden upgradar subscripción
- Todo funciona sin errores

**NO incluir (FASE 2+):**
- Video calls
- Training plans
- Advanced analytics
- Mobile app
```

---

## 🎯 Pasos Finales

Una vez descargues este archivo y copies el contenido:

### 1. Crear carpetas

```bash
cd D:\proyecto-running\runner-velora
mkdir docs
```

### 2. Copiar archivos

- Crea `.env.example` en raíz
- Crea `.gitignore` en raíz
- Crea 8 archivos `.md` en carpeta `docs/`

### 3. Inicializar Vite

```bash
pnpm create vite . --template react-ts
pnpm install
```

### 4. Agregar dependencias

```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpm add zustand axios react-router-dom zod
npx tailwindcss init -p
```

### 5. Git

```bash
git init
git add .
git commit -m "Initial commit: structure and docs"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/runner-velora.git
git push -u origin main
```

---

**¡Listo para empezar!** 🚀
