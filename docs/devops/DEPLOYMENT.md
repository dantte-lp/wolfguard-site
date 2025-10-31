# WolfGuard Website - Deployment Guide

Complete guide for deploying the WolfGuard website to production using Podman, Buildah, and Ansible.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Deployment](#development-deployment)
- [Production Deployment](#production-deployment)
- [Container Management](#container-management)
- [Traefik Integration](#traefik-integration)
- [Monitoring and Health Checks](#monitoring-and-health-checks)
- [Troubleshooting](#troubleshooting)

## Overview

The WolfGuard website is deployed as a containerized Next.js application using:

- **Podman** - Rootless container runtime
- **Buildah** - Container image builder
- **Skopeo** - Container image management
- **Ansible** - Deployment automation
- **Traefik** - Reverse proxy with automatic HTTPS
- **Next.js** - React framework with SSR/SSG

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Multi-Stage Build                        │
├─────────────────────────────────────────────────────────────┤
│  Stage 1: Dependencies (node:22-alpine)                     │
│  - Install production dependencies only                      │
├─────────────────────────────────────────────────────────────┤
│  Stage 2: Build (node:22-alpine)                            │
│  - Install all dependencies                                  │
│  - Build Next.js application                                 │
│  - Generate standalone output                                │
├─────────────────────────────────────────────────────────────┤
│  Stage 3: Runtime (node:22-alpine)                          │
│  - Copy standalone build                                     │
│  - Run as non-root user (nextjs:nodejs)                     │
│  - Port 3000                                                 │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

### Server Requirements

- **OS**: Oracle Linux 9, RHEL 9, Ubuntu 24.04 LTS or similar
- **RAM**: Minimum 2GB (4GB recommended)
- **CPU**: 2 cores minimum
- **Storage**: 20GB minimum
- **Network**: Public IPv4/IPv6 with ports 80/443 open

### Required Software

```bash
# Podman (container runtime)
podman --version  # >= 4.0

# Buildah (container builder)
buildah --version  # >= 1.28

# Skopeo (image management)
skopeo --version  # >= 1.10

# Ansible (deployment automation)
ansible --version  # >= 2.9

# Git
git --version
```

### Installation

**Oracle Linux / RHEL / Fedora:**

```bash
sudo dnf install -y podman buildah skopeo ansible git
```

**Ubuntu / Debian:**

```bash
sudo apt update
sudo apt install -y podman buildah skopeo ansible git
```

## Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/dantte-lp/wolfguard-site.git
cd wolfguard-site

# Install dependencies
npm ci

# Run development server
npm run dev

# Access: http://localhost:3000
```

### Container Development

```bash
# Build image
buildah bud -t wolfguard-site:dev .

# Run container
podman run -d --name wolfguard-site -p 3000:3000 wolfguard-site:dev

# View logs
podman logs -f wolfguard-site

# Stop container
podman stop wolfguard-site
```

## Development Deployment

For local testing with containers:

```bash
# Build development image
npm run build
buildah bud -t wolfguard-site:dev .

# Run with Podman
podman run -d \
  --name wolfguard-site-dev \
  -p 3000:3000 \
  --restart=always \
  wolfguard-site:dev

# Verify
curl http://localhost:3000
```

## Production Deployment

### Using Ansible (Recommended)

```bash
# Navigate to Ansible directory
cd deploy/ansible

# Deploy to production
ansible-playbook -i inventory.yml deploy.yml

# Deploy specific version
ansible-playbook -i inventory.yml deploy.yml \
  -e "container_image=ghcr.io/dantte-lp/wolfguard-site:v1.0.0"
```

### Using GitHub Actions (CI/CD)

The repository includes automated CI/CD pipelines:

**PR Validation (`.github/workflows/ci.yml`):**

- ESLint and Prettier checks
- TypeScript type checking
- npm security audit
- Production build test
- Bundle size analysis

**Deployment (`.github/workflows/cd.yml`):**

- Triggered on push to main/master
- Builds container with Buildah
- Pushes to GitHub Container Registry
- Deploys with Ansible
- Runs health checks

### Manual Deployment

```bash
# 1. Build production image
npm run build
buildah bud -t ghcr.io/dantte-lp/wolfguard-site:latest .

# 2. Push to registry
echo "${GITHUB_TOKEN}" | buildah login ghcr.io -u ${GITHUB_USER} --password-stdin
buildah push ghcr.io/dantte-lp/wolfguard-site:latest

# 3. Deploy on server
podman pull ghcr.io/dantte-lp/wolfguard-site:latest
podman stop wolfguard-site || true
podman rm wolfguard-site || true

podman run -d \
  --name wolfguard-site \
  --network traefik-network \
  -p 3000:3000 \
  --restart=always \
  --label "traefik.enable=true" \
  --label "traefik.http.routers.wolfguard-site.rule=Host(\`wolfguard.io\`)" \
  --label "traefik.http.routers.wolfguard-site.entrypoints=websecure" \
  --label "traefik.http.routers.wolfguard-site.tls=true" \
  --label "traefik.http.routers.wolfguard-site.tls.certresolver=letsencrypt" \
  ghcr.io/dantte-lp/wolfguard-site:latest
```

## Container Management

### Build Operations

```bash
# Build image
buildah bud -t wolfguard-site:latest .

# Build with metadata
buildah bud \
  --label "org.opencontainers.image.created=$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
  --label "org.opencontainers.image.revision=$(git rev-parse HEAD)" \
  -t wolfguard-site:latest .

# Inspect image
buildah images
skopeo inspect containers-storage:localhost/wolfguard-site:latest
```

### Runtime Operations

```bash
# List containers
podman ps -a

# View logs
podman logs -f wolfguard-site

# Execute command in container
podman exec -it wolfguard-site sh

# Restart container
podman restart wolfguard-site

# Stop and remove
podman stop wolfguard-site
podman rm wolfguard-site

# Clean up old images
podman image prune -f
```

## Traefik Integration

The website integrates with Traefik for automatic HTTPS and routing.

### Network Setup

```bash
# Create Traefik network
podman network create traefik-network

# Verify network
podman network ls | grep traefik-network
```

### Traefik Labels

The container is configured with these labels:

```yaml
labels:
  traefik.enable: 'true'
  traefik.http.routers.wolfguard-site.rule: 'Host(`wolfguard.io`)'
  traefik.http.routers.wolfguard-site.entrypoints: 'websecure'
  traefik.http.routers.wolfguard-site.tls: 'true'
  traefik.http.routers.wolfguard-site.tls.certresolver: 'letsencrypt'
  traefik.http.services.wolfguard-site.loadbalancer.server.port: '3000'
```

### DNS Configuration

Ensure DNS points to your server:

```bash
# Check DNS resolution
dig wolfguard.io +short
```

## Monitoring and Health Checks

### Container Health

```bash
# Check container status
podman ps | grep wolfguard-site

# View container stats
podman stats wolfguard-site

# Inspect container
podman inspect wolfguard-site
```

### Application Health

```bash
# HTTP health check
curl -f http://localhost:3000

# Full site check
curl -I https://wolfguard.io

# Check response time
time curl -s -o /dev/null https://wolfguard.io
```

### Logs

```bash
# View real-time logs
podman logs -f wolfguard-site

# Last 100 lines
podman logs --tail 100 wolfguard-site

# Since timestamp
podman logs --since 1h wolfguard-site
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs for errors
podman logs wolfguard-site

# Inspect container config
podman inspect wolfguard-site

# Verify image exists
podman images | grep wolfguard-site

# Test image manually
podman run --rm -it wolfguard-site:latest sh
```

### Port Already in Use

```bash
# Find process using port
sudo lsof -i :3000

# Use different port
podman run -d -p 3001:3000 wolfguard-site:latest
```

### Network Issues

```bash
# List networks
podman network ls

# Inspect network
podman network inspect traefik-network

# Reconnect container
podman network disconnect traefik-network wolfguard-site
podman network connect traefik-network wolfguard-site
```

### Image Build Failures

```bash
# Clean build cache
buildah rmi --all
podman image prune -a

# Rebuild with verbose output
buildah bud --layers=false -t wolfguard-site:latest .
```

### SSL/TLS Issues

```bash
# Check Traefik logs
podman logs traefik | grep wolfguard

# Verify certificate
echo | openssl s_client -connect wolfguard.io:443 -servername wolfguard.io

# Force certificate renewal
podman restart traefik
```

## Security Best Practices

1. **Run as non-root user** - Container runs as nextjs:nodejs (uid 1001)
2. **Read-only filesystem** - Root filesystem is read-only where possible
3. **Minimal base image** - Alpine Linux for small attack surface
4. **No unnecessary capabilities** - Dropped Linux capabilities
5. **Regular updates** - Keep base images and dependencies updated
6. **Secrets management** - Use environment variables, never commit secrets
7. **Network isolation** - Use dedicated networks for containers
8. **HTTPS only** - Enforce TLS with automatic certificate renewal

## Performance Optimization

1. **Multi-stage builds** - Minimal runtime image size
2. **Standalone output** - Next.js standalone mode for smaller builds
3. **Image caching** - Layer caching for faster builds
4. **Resource limits** - Set appropriate memory/CPU limits
5. **Static asset caching** - CDN and browser caching
6. **Gzip compression** - Enabled by default in Next.js

## Backup and Recovery

```bash
# Export container
podman export wolfguard-site > wolfguard-site-backup.tar

# Save image
podman save wolfguard-site:latest -o wolfguard-site-image.tar

# Restore from backup
podman import wolfguard-site-backup.tar wolfguard-site:restored
```

## References

- [Podman Documentation](https://docs.podman.io/)
- [Buildah Documentation](https://buildah.io/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Ansible Documentation](https://docs.ansible.com/)

## Support

For issues or questions:

- GitHub Issues: https://github.com/dantte-lp/wolfguard-site/issues
- Project Documentation: https://docs.wolfguard.io
