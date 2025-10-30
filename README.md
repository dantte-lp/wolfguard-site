# WolfGuard Website

Official website for **WolfGuard** - an open-source VPN server with TLS 1.3/DTLS 1.3 support and Cisco Secure Client compatibility.

## Tech Stack

- **Next.js** 15.x (React Framework with App Router)
- **React** 19.2.0
- **TypeScript** 5.7.3
- **Tailwind CSS** 4.1.16
- **HeroUI** 2.8.5 (NextUI successor)
- **Framer Motion** 12.10.0
- **Node.js** 22.12+

## Prerequisites

- **Docker** or **Podman** installed
- **Git** for version control
- No need to install Node.js locally - everything runs in containers!

## Quick Start (Development)

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/dantte-lp/wolfguard-site.git
cd wolfguard-site

# Start development server
docker compose -f docker-compose.dev.yaml up

# The site will be available at http://localhost:3000
```

### Option 2: Using Podman Compose

```bash
# Clone the repository
git clone https://github.com/dantte-lp/wolfguard-site.git
cd wolfguard-site

# Start development server
podman-compose -f docker-compose.dev.yaml up

# The site will be available at http://localhost:3000
```

### Option 3: Manual Development (requires Node.js 22.12+)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

All commands should be run inside the container:

```bash
# Development server with hot reload
docker compose -f docker-compose.dev.yaml exec node-dev npm run dev

# Type checking
docker compose -f docker-compose.dev.yaml exec node-dev npm run type-check

# Linting
docker compose -f docker-compose.dev.yaml exec node-dev npm run lint

# Format code
docker compose -f docker-compose.dev.yaml exec node-dev npm run format

# Build for production
docker compose -f docker-compose.dev.yaml exec node-dev npm run build

# Preview production build
docker compose -f docker-compose.dev.yaml exec node-dev npm run preview
```

## Project Structure

```
wolfguard-site/
├── config/                      # Configuration files
│   ├── compose/                 # Docker Compose configs
│   ├── docker/                  # Dockerfiles
│   └── nginx/                   # Nginx configuration
├── docs/                        # Documentation
│   └── TECHNICAL_SPECIFICATIONS_FOR_WEBSITE_DEVELOPMENT.md
├── public/                      # Static assets
│   └── assets/
├── src/                         # Source code
│   ├── assets/                  # Images, fonts, etc.
│   ├── components/              # React components
│   ├── hooks/                   # Custom React hooks
│   ├── pages/                   # Page components
│   ├── types/                   # TypeScript types
│   ├── utils/                   # Utility functions
│   ├── App.tsx                  # Main App component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── docker-compose.dev.yaml      # Dev environment
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind CSS config
├── vite.config.ts               # Vite config
└── README.md                    # This file
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit files in the `src/` directory. The development server will automatically reload.

### 3. Lint and Format

```bash
# Inside container
npm run lint
npm run format
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: your feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
# Create Pull Request on GitHub
```

## Building for Production

### Build Production Image

```bash
# Using Docker
docker build -f config/docker/Containerfile -t wolfguard-site:latest .

# Using Podman + Buildah
buildah bud -f config/docker/Containerfile -t wolfguard-site:latest .
```

### Run Production Container

```bash
# Using Docker
docker run -d -p 8080:8080 wolfguard-site:latest

# Using Podman
podman run -d -p 8080:8080 wolfguard-site:latest
```

### Deploy with Docker Compose (Production)

```bash
docker compose -f config/compose/compose.prod.yaml up -d
```

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
VITE_HOST=0.0.0.0
VITE_PORT=5173
```

## Troubleshooting

### Container won't start

```bash
# Check if port 5173 is already in use
lsof -i :5173

# Stop and remove containers
docker compose -f docker-compose.dev.yaml down

# Rebuild containers
docker compose -f docker-compose.dev.yaml up --build
```

### Hot reload not working

Make sure you're using the correct volume mounts in `docker-compose.dev.yaml`:

```yaml
volumes:
  - .:/app:rw
  - /app/node_modules
```

### Permission issues

```bash
# Fix permissions (inside container)
docker compose -f docker-compose.dev.yaml exec node-dev chown -R node-dev:node-dev /app
```

## Scrum Plan & GitHub Issues

- View the full Scrum plan: [SCRUM_PLAN.md](./SCRUM_PLAN.md)
- Track progress: [GitHub Issues](https://github.com/dantte-lp/wolfguard-site/issues)
- All 39 User Stories are created and labeled by sprint

## Documentation

- **Technical Specifications**: [docs/TECHNICAL_SPECIFICATIONS_FOR_WEBSITE_DEVELOPMENT.md](./docs/TECHNICAL_SPECIFICATIONS_FOR_WEBSITE_DEVELOPMENT.md)
- **Dependencies**: [DEPENDENCIES_VERSIONS.md](./DEPENDENCIES_VERSIONS.md)
- **Scrum Plan**: [SCRUM_PLAN.md](./SCRUM_PLAN.md)

## Contributing

1. Read the [Technical Specifications](./docs/TECHNICAL_SPECIFICATIONS_FOR_WEBSITE_DEVELOPMENT.md)
2. Check [open issues](https://github.com/dantte-lp/wolfguard-site/issues)
3. Create a feature branch
4. Follow the development workflow
5. Submit a Pull Request

## License

GPLv2 - See LICENSE file for details

## Links

- **Website**: [wolfguard.io](https://wolfguard.io)
- **Documentation**: [docs.wolfguard.io](https://docs.wolfguard.io)
- **GitHub**: [github.com/dantte-lp/wolfguard-site](https://github.com/dantte-lp/wolfguard-site)

---

Built with React, TypeScript, and Tailwind CSS by the WolfGuard Team
