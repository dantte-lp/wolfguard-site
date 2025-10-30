# Проверенные стабильные версии зависимостей

Дата проверки: 2025-10-30

## Основные зависимости

| Пакет            | Текущая стабильная версия | Источник                                              | Примечания                                                 |
| ---------------- | ------------------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| **Node.js**      | 22.12+                    | Next.js требует                                       | Next.js 15 требует Node.js 18.18+ или выше                 |
| **Next.js**      | 15.1.6                    | [nextjs.org](https://nextjs.org/docs)                 | Релиз 15.x с App Router, RSC, Server Actions               |
| **React**        | 19.2.0                    | [react.dev](https://react.dev/versions)               | Релиз от 01.10.2025, включает новый `<Activity>` компонент |
| **ReactDOM**     | 19.2.0                    | [react.dev](https://react.dev/versions)               | Синхронно с React                                          |
| **TypeScript**   | 5.7.3                     | [typescriptlang.org](https://www.typescriptlang.org/) | Релиз от 22.11.2024, патч 5.7.3                            |
| **Tailwind CSS** | 4.1.16                    | [tailwindcss.com](https://tailwindcss.com/)           | Релиз 5 дней назад, v4.1 от апреля 2025                    |
| **HeroUI**       | 2.8.5                     | [heroui.com](https://www.heroui.com/)                 | Релиз 25 дней назад, поддержка Tailwind v4                 |

## Дополнительные зависимости

| Пакет             | Рекомендуемая версия | Цель               |
| ----------------- | -------------------- | ------------------ |
| **Framer Motion** | Последняя v12.x      | Анимации           |
| **ESLint**        | Последняя v9.x       | Линтинг            |
| **Prettier**      | Последняя v3.x       | Форматирование     |
| **Husky**         | Последняя v9.x       | Git hooks          |
| **lint-staged**   | Последняя v15.x      | Pre-commit линтинг |

## Инструменты контейнеризации

| Инструмент        | Версия | Примечания                 |
| ----------------- | ------ | -------------------------- |
| **Docker/Podman** | Latest | Для dev и prod контейнеров |
| **Buildah**       | Latest | Сборка образов             |
| **Skopeo**        | Latest | Управление образами        |
| **crun**          | Latest | Container runtime          |

## package.json (примерная структура)

```json
{
  "name": "wolfguard-site",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit"
  },
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
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "15.1.6",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0",
    "tailwindcss": "4.1.16",
    "typescript": "5.7.3"
  }
}
```

## Важные замечания

1. **Все версии ТОЧНЫЕ (без ^ и ~)** в dependencies для production стабильности
2. **devDependencies могут использовать ^** для получения совместимых обновлений
3. **Node.js 22.12+** рекомендован для оптимальной производительности
4. **Next.js 15.1.6** использует App Router (по умолчанию)
5. **HeroUI 2.8.5** полностью совместим с Tailwind CSS 4.1
6. **TypeScript 5.7.3** поддерживает все новые фичи React 19.2

## Следующий шаг

Создать Dockerfile.dev и docker-compose.dev.yaml для контейнеризованной разработки.
