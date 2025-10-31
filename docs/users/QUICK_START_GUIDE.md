# WolfGuard Site - Quick Start Guide

**Last Updated:** October 31, 2025
**Environment:** Podman + Node.js 24 LTS + Next.js 15.5.6

---

## Prerequisites

- Podman 5.4.0 or newer
- podman-compose installed
- Git repository cloned
- Port 3000 available (development)

---

## Quick Commands

### Start Development Server

```bash
cd /opt/projects/repositories/wolfguard-site
make dev
```

Access at: http://localhost:3000

### Stop Development Server

```bash
make dev-down
```

### Rebuild from Scratch

```bash
make dev-rebuild
```

### View Logs

```bash
make dev-logs
```

### Open Container Shell

```bash
make dev-shell
```

---

## Common Tasks

### Fix "Module Not Found" Errors

```bash
# Stop container
make dev-down

# Clean everything
make dev-clean

# Rebuild
make dev-build
```

### Fix Permission Errors

```bash
# Fix lib directory
chmod -R 755 lib/
chmod 644 lib/*.ts

# Restart
make dev-restart
```

### Update Dependencies

```bash
# Inside container
make dev-shell
npm update
npm audit fix

# Or from host
podman exec wolfguard-site-dev npm update
```

### Clean Up Everything

```bash
# Remove containers and volumes
make clean

# Deep clean (including node_modules)
make clean-all

# Prune unused resources
make prune
```

---

## Production Build

### Build Production Image

```bash
make build
```

### Deploy Production

```bash
make deploy-traefik
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
podman logs wolfguard-site-dev

# Check permissions
ls -la lib/

# Rebuild
make dev-rebuild
```

### Site Not Accessible

```bash
# Check if running
podman ps

# Check port
curl http://localhost:3000

# Restart
make dev-restart
```

### Permission Denied Errors

```bash
# Fix all permissions
chmod -R 755 .
find . -type f -exec chmod 644 {} \;
chmod +x deploy/scripts/*.sh
```

---

## File Locations

- **Source Code:** `/opt/projects/repositories/wolfguard-site`
- **Containerfile (Dev):** `deploy/config/Containerfile.dev`
- **Containerfile (Prod):** `deploy/config/Containerfile`
- **Compose:** `docker-compose.dev.yaml`
- **Makefile:** `Makefile`

---

## Container Details

### Development Container

- **Name:** wolfguard-site-dev
- **Image:** localhost/wolfguard-dev_node-dev:latest
- **Port:** 3000:3000
- **User:** node (UID 1000)
- **Node:** 24.x LTS
- **npm:** 11.6.2

### Production Container

- **Name:** wolfguard-site
- **Image:** localhost/wolfguard-site:latest
- **Port:** 8080:8080
- **User:** nginx-user (UID 1001)
- **Size:** 549 MB

---

## Environment Variables

Development (in docker-compose.dev.yaml):

- `NODE_ENV=development`
- `NEXT_TELEMETRY_DISABLED=1`
- `WATCHPACK_POLLING=false`
- `TZ=UTC`
- `NPM_CONFIG_CACHE=/app/.npm`

---

## Network Configuration

### Traefik Integration

- **Network:** traefik-public
- **Domain:** dev.wolfguard.io
- **TLS:** Cloudflare resolver
- **Middleware:** web-development

### Local Access

- Development: http://localhost:3000
- Production: http://localhost:8080

---

## Health Checks

### Development

```bash
curl -f http://localhost:3000/ && echo "OK" || echo "FAIL"
```

### Container Health

```bash
podman inspect wolfguard-site-dev | grep -A 5 Health
```

---

## Makefile Targets

### Development

- `make dev` - Start development server
- `make dev-build` - Build and start
- `make dev-down` - Stop containers
- `make dev-clean` - Clean environment
- `make dev-restart` - Full restart
- `make dev-logs` - View logs
- `make dev-shell` - Open shell

### Production

- `make build` - Build production
- `make deploy` - Deploy production
- `make deploy-traefik` - Deploy with Traefik

### Testing

- `make test` - Run tests
- `make lint` - Run ESLint
- `make type-check` - TypeScript check

### Utilities

- `make clean` - Clean up
- `make prune` - Prune resources
- `make ps` - Show containers
- `make images` - Show images
- `make health` - Check health

---

## Git Workflow

### Check Status

```bash
git status
```

### Create Commit

```bash
git add .
git commit -m "Your message"
```

### Push Changes

```bash
git push
```

---

## Performance Tips

1. **Use Volume Caching**
   - node_modules in named volume
   - .next in dedicated volume
   - npm cache preserved

2. **Hot Reload**
   - Automatic on file changes
   - No manual restart needed

3. **Build Cache**
   - Layer caching enabled
   - Faster rebuilds

---

## Security Notes

- Containers run rootless
- Ports are non-privileged
- SELinux labels configured
- No secrets in code
- HTTPS via Traefik

---

## Getting Help

### View Documentation

```bash
ls docs/
cat docs/INFRASTRUCTURE_REBUILD_SUMMARY.md
```

### Check Logs

```bash
make dev-logs
podman logs --tail 100 wolfguard-site-dev
```

### Container Shell

```bash
make dev-shell
# Inside: node --version, npm --version, ls -la
```

---

## Quick Reference

| Command            | Purpose          |
| ------------------ | ---------------- |
| `make dev`         | Start dev server |
| `make dev-down`    | Stop dev server  |
| `make dev-restart` | Full restart     |
| `make dev-logs`    | View logs        |
| `make build`       | Build production |
| `make clean`       | Clean up         |

---

**For full documentation, see:**

- `docs/INFRASTRUCTURE_REBUILD_SUMMARY.md`
- `docs/TECHNICAL_SPECIFICATIONS_FOR_WEBSITE_DEVELOPMENT.md`
- `README.md`
