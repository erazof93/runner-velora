# Styling Guide - Runner Velora

## 🎨 Tailwind CSS v4

### Color Palette

**Primary (Velora Brand):**
- Primary: `#FF6B35` (Naranja)
- Primary Dark: `#E55A2B`
- Primary Light: `#FF8C5A`

**Secondary:**
- Accent: `#A23B72` (Magenta)
- Accent Light: `#C563A0`

**Neutrals:**
- Gray-50: `#F9FAFB`
- Gray-100: `#F3F4F6`
- Gray-900: `#111827`

**Status:**
- Success: `#10B981` (Verde)
- Warning: `#F59E0B` (Amarillo)
- Error: `#EF4444` (Rojo)
- Info: `#3B82F6` (Azul)

### Typography

```css
h1 {
  @apply text-4xl font-bold text-gray-900;
}

h2 {
  @apply text-2xl font-semibold text-gray-900;
}

h3 {
  @apply text-xl font-semibold text-gray-900;
}

body {
  @apply text-base text-gray-700;
}

small {
  @apply text-sm text-gray-600;
}
```

### Spacing System

Base 4px:
- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px
- `16` = 64px

### Components

**Button Primary**
```html
<button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
  Action
</button>
```

**Button Secondary**
```html
<button class="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300">
  Secondary
</button>
```

**Card**
```html
<div class="bg-white shadow rounded-lg p-6">
  Card content
</div>
```

**Input**
```html
<input class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
```

### Dark Mode

Usar prefijo `dark:`:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

### Responsive Design

Móvil primero:

```html
<div class="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px