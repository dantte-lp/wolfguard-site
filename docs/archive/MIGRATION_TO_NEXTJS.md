# Миграция с Vite на Next.js

Дата: 2025-10-30

## Причина миграции

Техническое задание (`docs/TECHNICAL_SPECIFICATIONS_FOR_WEBSITE_DEVELOPMENT.md` строка 60) требует использование **Next.js 15.x** как React Framework, а не Vite.

## Что изменилось

### Технический стек

**Было:**

- Vite 7.1.12 как build tool
- React Router для маршрутизации
- SPA архитектура

**Стало:**

- Next.js 15.1.6 как React Framework
- App Router (встроенный)
- SSR/SSG архитектура

### Обновленные файлы

#### 1. Техническое задание

**Файл:** `docs/TECHNICAL_SPECIFICATIONS_FOR_WEBSITE_DEVELOPMENT.md`

- Удалена строка с Vite
- Версия Next.js обновлена на 15.x (стабильная версия)

#### 2. SCRUM План

**Файл:** `SCRUM_PLAN.md`

- US-001: Порт изменен с 5173 на 3000
- US-002: Название изменено на "Next.js + React + TypeScript"
- US-002: Acceptance Criteria обновлены для Next.js App Router
- US-005: Название изменено на "Next.js Layout"
- US-005: Структура изменена на app/layout.tsx

#### 3. GitHub Issues

**Обновлено:**

- Issue #1 (US-001): Порт 3000 вместо 5173
- Issue #2 (US-002): Полностью переписан для Next.js
- Issue #5 (US-005): Обновлен для Next.js App Router

#### 4. README.md

**Изменения:**

- Tech Stack: добавлен Next.js 15.x
- Все упоминания порта 5173 заменены на 3000

#### 5. DEPENDENCIES_VERSIONS.md

**Изменения:**

- Next.js 15.1.6 добавлен вместо Vite
- React Router удален (не нужен)
- package.json обновлен с Next.js скриптами
- Добавлен eslint-config-next

#### 6. docker-compose.dev.yaml

**Изменения:**

- Порт: 5173 → 3000
- Environment variables: VITE\_\* → NEXT_TELEMETRY_DISABLED
- Health check URL обновлен

### Преимущества Next.js для WolfGuard

1. **SEO из коробки** - Server-Side Rendering для лучшей индексации
2. **Static Generation** - можно генерировать статические страницы
3. **Metadata API** - простое управление meta tags для SEO
4. **Image Optimization** - автоматическая оптимизация изображений
5. **App Router** - современная архитектура с Server Components
6. **Built-in Performance** - автоматический code splitting и prefetching

### Следующие шаги

1. Удалить старый Vite-based код
2. Инициализировать Next.js проект
3. Настроить App Router структуру
4. Интегрировать HeroUI с Next.js
5. Настроить Tailwind CSS 4.1 с Next.js
6. Создать базовый layout (app/layout.tsx)

### Структура проекта Next.js

```
wolfguard-site/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── about/
│   │   └── page.tsx
│   ├── installation/
│   │   └── page.tsx
│   ├── documentation/
│   │   └── page.tsx
│   ├── compatibility/
│   │   └── page.tsx
│   └── contribute/
│       └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── public/
│   └── assets/
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### Версии зависимостей

```json
{
  "dependencies": {
    "next": "15.1.6",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@heroui/react": "2.8.5",
    "framer-motion": "^12.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "15.1.6",
    "tailwindcss": "4.1.16",
    "typescript": "5.7.3"
  }
}
```

### Milestones в GitHub

Созданы 4 milestone:

- **Sprint 1: Foundation & Infrastructure** (до 13.11.2025)
- **Sprint 2: Core Pages & Animations** (до 27.11.2025)
- **Sprint 3: Documentation & Community** (до 11.12.2025)
- **Sprint 4: Polish & Production** (до 25.12.2025)

Все 39 User Stories привязаны к соответствующим milestones.

---

## Заключение

Миграция на Next.js приведет проект в соответствие с техническим заданием и предоставит лучшие возможности для SEO и производительности сайта WolfGuard.
