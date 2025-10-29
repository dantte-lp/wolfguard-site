# Development Guide

Complete guide for developing the WolfGuard landing page locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 22** (LTS recommended)
- **npm 10+** (comes with Node.js)
- **Git** (for version control)
- **Podman 5+** (for container development)
- **Podman Compose** (for multi-container orchestration)

### Installing Node.js

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS (using Homebrew)
brew install node@22

# Verify installation
node --version  # Should show v22.x.x
npm --version   # Should show 10.x.x
```

### Installing Podman

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y podman podman-compose

# macOS (using Homebrew)
brew install podman podman-compose

# Verify installation
podman --version
podman-compose --version
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/wolfguard/wolfguard-site.git
cd wolfguard-site
```

### 2. Install Dependencies

```bash
# Clean install (recommended for first time)
npm ci

# Or regular install
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

This will start the Vite development server at `http://localhost:5173` with:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- ESLint warnings in console

### 4. Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

Build output will be in `dist/` directory.

## Project Commands

```bash
# Development
npm run dev              # Start dev server with HMR
npm run build            # Build production bundle
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking (if configured)

# Container Development
podman-compose -f compose.yaml build    # Build development container
podman-compose -f compose.yaml up       # Start development container
podman-compose -f compose.yaml down     # Stop development container

# Production Container
podman-compose -f compose.prod.yaml build --no-cache  # Build production container
podman-compose -f compose.prod.yaml up -d             # Start production container
podman-compose -f compose.prod.yaml down              # Stop production container
```

## Technology Stack Details

### React 19.2.0

Latest React version with:
- Concurrent rendering features
- Automatic batching improvements
- Server Components support (future-ready)
- Improved hydration and SSR

**Best Practices:**
- Use functional components with hooks
- Implement proper error boundaries
- Leverage React.memo for performance
- Use useCallback and useMemo appropriately

### TypeScript 5.9

Modern TypeScript features:
- Strict mode enabled
- Proper type inference
- No `any` types (use proper typing)
- Interface over type when possible

**Best Practices:**
- Always define proper types for props
- Use utility types (Partial, Pick, Omit, etc.)
- Leverage type guards for runtime checks
- Document complex types with JSDoc comments

### HeroUI 2.8.5

Modern React component library:
- Pre-built accessible components
- Dark/Light theme support out of the box
- Tailwind CSS integration
- Customizable with CSS variables

**Available Components:**
- Button, Card, Input, Modal, Dropdown
- Table, Pagination, Tabs, Switch
- Skeleton (loading states)
- And many more...

**Usage Example:**
```tsx
import { Button, Card, CardBody } from '@heroui/react';

<Card className="shadow-lg">
  <CardBody>
    <Button color="primary" size="lg">
      Get Started
    </Button>
  </CardBody>
</Card>
```

### Tailwind CSS 4.1.16

Latest Tailwind with:
- Performance improvements
- New utility classes
- Better dark mode support
- Improved customization

**Best Practices:**
- Use utility classes for styling
- Create custom components for repeated patterns
- Use `@apply` sparingly in component styles
- Leverage responsive prefixes (sm:, md:, lg:, xl:, 2xl:)

### Vite 7.1.12

Lightning-fast build tool:
- Instant server start
- Lightning-fast HMR
- Optimized production builds
- Built-in TypeScript support

**Configuration:**
- `vite.config.ts` - Main Vite configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS plugins

## Development Workflow

### 1. Creating New Components

```bash
# Create new component file
touch src/components/NewComponent.tsx
```

**Component Template:**
```tsx
import React from 'react';

interface NewComponentProps {
  title: string;
  description?: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({ title, description }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {description && <p className="text-lg">{description}</p>}
    </div>
  );
};
```

### 2. Styling Components

Use Tailwind utility classes:

```tsx
<div className="
  flex items-center justify-center
  min-h-screen
  bg-gradient-to-br from-blue-500 to-purple-600
  text-white
">
  <h1 className="text-4xl md:text-6xl font-bold">
    WolfGuard
  </h1>
</div>
```

### 3. Adding New Routes (if needed)

Currently a single-page application, but if routing is needed:

```bash
npm install react-router-dom@6
```

### 4. Testing Changes

1. Start dev server: `npm run dev`
2. Make changes in `src/`
3. Check browser automatically updates
4. Test on different screen sizes (responsive)
5. Check console for errors/warnings
6. Build production: `npm run build`
7. Preview: `npm run preview`

## Container Development

### Building Locally

```bash
# Development build (with hot reload)
podman-compose -f compose.yaml build
podman-compose -f compose.yaml up

# Production build (optimized)
BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
GIT_COMMIT="$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")" \
podman-compose -f compose.prod.yaml build --no-cache

# Start production container
BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
GIT_COMMIT="$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")" \
podman-compose -f compose.prod.yaml up -d
```

### Debugging Container

```bash
# View logs
podman logs -f wolfguard-site

# Execute shell in container
podman exec -it wolfguard-site sh

# Check container health
podman inspect wolfguard-site --format '{{.State.Health.Status}}'

# View container stats
podman stats wolfguard-site
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 5174
```

### Node Modules Issues

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build Failures

```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for ESLint issues
npm run lint
```

### Container Build Issues

```bash
# Clean all containers and images
podman-compose -f compose.prod.yaml down
podman system prune -af

# Rebuild from scratch
BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
GIT_COMMIT="$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")" \
podman-compose -f compose.prod.yaml build --no-cache
```

## Performance Optimization

### Code Splitting

Vite automatically code-splits on dynamic imports:

```tsx
const LazyComponent = React.lazy(() => import('./components/LazyComponent'));

<React.Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</React.Suspense>
```

### Asset Optimization

- Images automatically optimized by Vite
- Use WebP format when possible
- Lazy load images below the fold

### Bundle Analysis

```bash
npm run build -- --mode analyze
```

## VS Code Setup (Recommended)

### Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **ESLint**
- **Prettier - Code formatter**
- **TypeScript Vue Plugin (Volar)**

### Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Next Steps

- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Check [SECURITY.md](./SECURITY.md) for security best practices
- See [README.md](./README.md) for project overview
