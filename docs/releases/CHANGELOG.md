# Changelog

All notable changes to the WolfGuard website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- iOS App Store and Google Play badges on compatibility page for mobile clients
- Archive directory for historical documentation

### Changed

- Standardized Node.js version references to node:lts-trixie-slim across all documentation
- Moved SCRUM_PLAN.md to docs/ directory for better organization
- Updated DEPLOYMENT.md and SECURITY.md with accurate container base images

### Removed

- Outdated nginx.conf (replaced by Next.js standalone server)
- Old Containerfile using nginx (replaced by Containerfile.prod)
- Obsolete compose.yaml and compose.prod.yaml files
- Moved MIGRATION_TO_NEXTJS.md and IMPLEMENTATION_SUMMARY.md to archive

## [1.0.0] - 2025-10-31

### Added

- GitHub Actions CI/CD pipelines
- Ansible deployment automation
- Comprehensive documentation structure
- Issue and PR templates
- Security policy and contributing guidelines
- Initial release of WolfGuard website
- Next.js 15.5 with App Router
- React 19.2 with TypeScript 5.9
- Tailwind CSS 4.1 styling
- HeroUI 2.8.5 component library
- Responsive design for all devices
- Dark/light theme support
- SEO optimization
- Containerized deployment with Podman
- Production-ready infrastructure

### Changed

- Restructured documentation into organized directories
- Updated README with badges and improved structure

### Features

- Hero section with animated background
- Feature showcase sections
- About page with project overview
- Installation guide for multiple platforms
- Documentation integration
- Compatibility information
- Blog system (planned)
- Contribution guidelines

### Technical

- Multi-stage container builds
- Traefik integration for HTTPS
- Ansible deployment playbooks
- GitHub Actions workflows
- Self-hosted runner support
- Security hardening
- Performance optimization

### Documentation

- Technical specifications
- Development guide
- Deployment guide
- Infrastructure guide
- Contributing guidelines
- Security policy

[Unreleased]: https://github.com/dantte-lp/wolfguard-site/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/dantte-lp/wolfguard-site/releases/tag/v1.0.0
