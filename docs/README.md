# WolfGuard Landing Page

Modern, responsive landing page for WolfGuard - a high-performance OpenConnect VPN Server built with cutting-edge technologies.

## Overview

This is the official landing page for WolfGuard, showcasing the project's features, documentation links, and quick start guides. Built with the latest web technologies to ensure maximum performance and user experience.

## Tech Stack

### Frontend Framework

- **React 19.2.0** - Latest React with concurrent features and improved performance
- **TypeScript 5.9** - Strict type checking and modern language features
- **Vite 7.1.12** - Lightning-fast build tool with HMR

### UI Components & Styling

- **HeroUI 2.8.5** - Modern React component library with beautiful defaults
- **Tailwind CSS 4.1.16** - Utility-first CSS framework with latest features
- **Framer Motion 11.15.0** - Production-ready animation library

### Production Runtime

- **Nginx 1.27** - High-performance web server (Alpine Linux)
- **Node 22 Trixie-slim** - Build environment

### Container Platform

- **Podman** - Rootless container management
- **Podman Compose** - Multi-container orchestration
- **Traefik** - Reverse proxy with automatic SSL/TLS

## Project Structure

```
wolfguard-site/
├── docs/                          # Documentation
│   ├── README.md                  # This file
│   ├── DEVELOPMENT.md             # Development guide
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── DEPLOYMENT_SUMMARY.md      # Deployment summary
│   ├── PODMAN_DEPLOYMENT_README.md # Podman deployment details
│   ├── PRODUCTION_DEPLOY.md       # Production deployment
│   ├── PROJECT_SUMMARY.md         # Project overview
│   ├── QUICK_START.md             # Quick start guide
│   └── SECURITY.md                # Security documentation
├── src/                           # Source code
│   ├── components/                # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── QuickStart.tsx
│   │   ├── Links.tsx
│   │   └── Footer.tsx
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
│   ├── logo-*.png                 # WolfGuard logos (various sizes)
│   ├── favicon-*.png              # Favicons
│   └── icon-*.png                 # App icons
├── config/                        # Configuration files
│   ├── nginx/
│   │   └── nginx.conf             # Nginx configuration
│   ├── docker/
│   │   └── Containerfile          # Multi-stage container build
│   └── compose/
│       ├── compose.yaml           # Development compose
│       └── compose.prod.yaml      # Production compose with Traefik
├── scripts/                       # Utility scripts
│   ├── crop-logos.sh              # Logo processing
│   └── process-logos.sh           # Logo generation
├── package.json                   # Node dependencies
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite build configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.js               # ESLint configuration
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML entry point
├── compose.yaml -> config/compose/compose.yaml           # Symlink to dev compose
└── compose.prod.yaml -> config/compose/compose.prod.yaml # Symlink to prod compose
```

## Key Features

- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Dark/Light Theme** - Automatic theme detection with manual toggle
- **Fast Loading** - Optimized bundle size and lazy loading
- **SEO Optimized** - Proper meta tags, structured data, and semantic HTML
- **Accessible** - WCAG 2.1 AA compliant
- **Production Ready** - Containerized with security hardening
- **CI/CD Ready** - Easy integration with GitHub Actions or GitLab CI

## Quick Links

- **Development Guide**: [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Security Documentation**: [SECURITY.md](./SECURITY.md)
- **Quick Start**: [QUICK_START.md](./QUICK_START.md)

## Live Site

Visit the live site at: [https://wolfguard.io](https://wolfguard.io)

## License

This project is part of the WolfGuard ecosystem. See LICENSE file for details.

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting pull requests.

## Support

For issues, questions, or contributions, please visit:

- GitHub Issues: [wolfguard/wolfguard-site](https://github.com/wolfguard/wolfguard-site/issues)
- Documentation: [docs.wolfguard.io](https://docs.wolfguard.io)

## Acknowledgments

Built with love using:

- React Team for React 19
- HeroUI Team for the beautiful component library
- Tailwind Labs for Tailwind CSS 4
- Vite Team for the amazing build tool
