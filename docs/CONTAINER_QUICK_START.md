# WolfGuard Site - Container Quick Start Guide

## Overview

This guide provides quick commands for working with the WolfGuard site containerized development environment using Podman.

## Prerequisites

- Podman installed
- podman-compose installed
- Working directory: `/opt/projects/repositories/wolfguard-site`

## Quick Commands

### Development Server

```bash
# Start development server (first time or after code changes)
make dev

# Build image and start (recommended after Containerfile changes)
make dev-build

# Clean restart (fixes any issues, recommended troubleshooting step)
make dev-restart

# Full rebuild from scratch
make dev-rebuild
```

### Container Management

```bash
# Stop development server (keeps volumes)
make dev-down

# Clean environment (removes volumes, forces fresh start)
make dev-clean

# View logs
make dev-logs

# Open shell in container
make dev-shell
```

### Monitoring

```bash
# Check container health
make health

# View resource usage
make stats

# List running containers
make ps

# List project images
make images

# Show project info
make info
```

### Production

```bash
# Build production image
make build

# Deploy production containers
make deploy

# Deploy with Traefik integration
make deploy-traefik

# Stop production containers
make deploy-down

# View production logs
make deploy-logs

# Restart production
make deploy-restart
```

### Maintenance

```bash
# Clean up all containers and volumes
make clean

# Deep clean (includes node_modules)
make clean-all

# Prune unused Podman resources
make prune
```

## Common Issues & Solutions

### Issue: 404 errors after restart

**Solution:**

```bash
make dev-restart
```

### Issue: Permission errors with .next directory

**Solution:** This has been fixed in the current setup. If you still encounter issues:

```bash
make dev-clean
make dev-build
```

### Issue: Container won't start

**Solution:**

```bash
# Check logs for errors
make dev-logs

# Try clean restart
make dev-clean
make dev-build
```

### Issue: Port already in use

**Solution:**

```bash
# Stop all containers
make dev-down

# Check what's using the port
podman ps -a

# Remove any stuck containers
podman rm -f wolfguard-site-dev
```

### Issue: Out of disk space

**Solution:**

```bash
# Clean project artifacts
make clean

# Prune system resources
make prune

# Deep clean if needed
make clean-all
```

## Development Workflow

### Daily Development

```bash
# 1. Start your day
make dev

# 2. Code, test, iterate
# (hot reload is enabled, changes appear automatically)

# 3. End your day
make dev-down
```

### After Pulling Changes

```bash
# If package.json changed
make dev-restart

# If Containerfile changed
make dev-build
```

### Testing Production Build Locally

```bash
# Build production image
make build

# Test it locally
podman run --rm -p 8080:8080 localhost/wolfguard-site:latest

# Access at http://localhost:8080
```

## Port Mapping

- **Development:** `http://localhost:3000`
- **Production (local):** `http://localhost:8080`
- **Production (Traefik):** `https://wolfguard.io`

## Container Architecture

### Development Container

- **Base:** node:22-trixie-slim
- **User:** node (UID 1000)
- **Volumes:**
  - Source code: Mounted from host (hot reload)
  - node_modules: Named volume (persisted)
  - .next: Named volume (isolated)
  - npm cache: Named volume (faster installs)

### Production Container

- **Base:** Multi-stage (Node.js for build, Nginx for serving)
- **User:** Non-root
- **Features:**
  - Static export
  - Optimized for size
  - Read-only filesystem
  - Health checks

## Environment Variables

### Development

- `NODE_ENV=development`
- `NEXT_TELEMETRY_DISABLED=1`
- `WATCHPACK_POLLING=false`
- `TZ=UTC`

### Production

- `TZ=UTC`
- `NGINX_ENTRYPOINT_QUIET_LOGS=1`

## Health Checks

Both development and production containers have health checks:

```bash
# View health status
make health

# Check specific container
podman inspect --format='{{.State.Health.Status}}' wolfguard-site-dev
```

## Network Integration

### Traefik Integration

The site is configured to work with Traefik reverse proxy:

- **Development:** `dev.wolfguard.io`
- **Production:** `wolfguard.io` and `www.wolfguard.io`

Ensure Traefik is running in the `traefik-public` network.

## Troubleshooting

### Container Logs

```bash
# Follow logs in real-time
make dev-logs

# View specific number of lines
podman logs --tail 100 wolfguard-site-dev

# View logs since specific time
podman logs --since 10m wolfguard-site-dev
```

### Container Shell Access

```bash
# Open shell in running container
make dev-shell

# Run specific command
podman exec wolfguard-site-dev npm run type-check
```

### Volume Inspection

```bash
# List volumes
podman volume ls --filter label=com.wolfguard.project=wolfguard-site

# Inspect specific volume
podman volume inspect wolfguard-dev_next-cache

# Remove specific volume
podman volume rm wolfguard-dev_next-cache
```

## Performance Tips

1. **Use named volumes** - They're faster than bind mounts
2. **Keep volumes** between restarts - Use `make dev-down` instead of `make dev-clean`
3. **Clean up regularly** - Run `make prune` weekly to reclaim disk space
4. **Monitor resources** - Use `make stats` to check resource usage

## Security Notes

- Containers run as non-root user (UID 1000)
- SELinux labels applied (`:Z` flag on volumes)
- Minimal privileges
- Security options enforced in production

## Additional Resources

- **Full Documentation:** `/opt/projects/repositories/wolfguard-site/docs/CONTAINERIZATION_FIX_SUMMARY.md`
- **Technical Specifications:** `/opt/projects/repositories/wolfguard-site/docs/TECHNICAL_SPECIFICATIONS_FOR_WEBSITE_DEVELOPMENT.md`
- **Makefile Reference:** Run `make help` for all available targets

## Getting Help

```bash
# Show all available commands
make help

# Check project info
make info

# View container status
make ps
```

---

Last updated: October 31, 2025
Podman version: Compatible with rootless Podman 4.0+
