# WolfGuard Site - Podman Deployment Guide

Complete guide for deploying WolfGuard static site using Podman, Buildah, and podman-compose.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Multi-Stage Build                        │
├─────────────────────────────────────────────────────────────┤
│  Stage 1: Builder (node:22-alpine)                          │
│  - Install dependencies                                      │
│  - Build React + Vite app                                    │
│  - Output: dist/ directory                                   │
├─────────────────────────────────────────────────────────────┤
│  Stage 2: Runtime (nginx:1.27-alpine)                       │
│  - Non-root user (uid 1001)                                  │
│  - Hardened security (read-only, dropped capabilities)       │
│  - Optimized Nginx config                                    │
│  - Port 8080 (non-privileged)                                │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

### Required Tools

```bash
# Podman (rootless container engine)
podman --version  # >= 4.0

# Buildah (container image builder)
buildah --version  # >= 1.28

# Skopeo (container image management)
skopeo --version  # >= 1.10

# podman-compose (Docker Compose alternative)
podman-compose --version  # >= 1.0

# crun (OCI runtime)
podman info | grep -A 1 "ociRuntime:"
```

### Installation (if needed)

**Oracle Linux / RHEL / Fedora:**
```bash
sudo dnf install -y podman buildah skopeo podman-compose
```

**Ubuntu / Debian:**
```bash
sudo apt update
sudo apt install -y podman buildah skopeo
pip3 install podman-compose
```

## Quick Start

### 1. Development Deployment (Local Testing)

```bash
# Clone repository (if not already)
cd /opt/projects/repositories/wolfguard-site

# Build and start
make deploy

# Verify
curl http://localhost:8080
curl http://localhost:8080/health

# View logs
make logs

# Stop
make stop
```

**Access:** http://localhost:8080

### 2. Production Deployment (with Traefik)

```bash
# Ensure Traefik network exists
podman network create traefik-public 2>/dev/null || true

# Build image
make build

# Start with production configuration
BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
GIT_COMMIT="$(git rev-parse --short HEAD)" \
podman-compose -f compose.prod.yaml up -d

# Verify
curl https://wolfguard.infra4.dev
curl https://wolfguard.infra4.dev/health
```

**Access:** https://wolfguard.infra4.dev (via Traefik)

## Makefile Commands

### Build Commands

```bash
make build              # Build container image
make build-no-cache     # Build without cache (clean build)
make up                 # Build and start containers
```

### Container Management

```bash
make start              # Start containers
make stop               # Stop containers
make restart            # Restart containers
make deploy             # Full deployment pipeline
```

### Monitoring

```bash
make logs               # Follow logs in real-time
make logs-tail          # View last 100 lines
make status             # Show container status
make health             # Check health status
make stats              # Show resource usage
```

### Cleanup

```bash
make clean              # Remove containers and images
make prune              # Prune unused resources
make clean-all          # Deep clean (everything)
```

### Development

```bash
make shell              # Open shell in container
make inspect            # Inspect container configuration
make test               # Run local tests
```

### Image Management

```bash
make images             # List project images
make save               # Save image to tar archive
make load               # Load image from tar archive
make push REGISTRY=...  # Push to registry
```

### Information

```bash
make help               # Display all commands
make info               # Show build information
make version            # Show version
```

## Configuration Files

### 1. Containerfile (Multi-stage)

**Location:** `/opt/projects/repositories/wolfguard-site/Containerfile`

**Features:**
- Stage 1: Build with Node.js 22
- Stage 2: Serve with Nginx 1.27-alpine
- Non-root user (uid 1001)
- Security hardening
- OCI labels for metadata
- Health check built-in

**Build:**
```bash
podman build -t localhost/wolfguard-site:latest .
```

### 2. compose.yaml (Development)

**Location:** `/opt/projects/repositories/wolfguard-site/compose.yaml`

**Features:**
- Port 8080 exposed to host
- Health checks
- Resource limits
- Security options
- Volume for logs

**Usage:**
```bash
podman-compose up -d
```

### 3. compose.prod.yaml (Production)

**Location:** `/opt/projects/repositories/wolfguard-site/compose.prod.yaml`

**Features:**
- Traefik integration (automatic HTTPS)
- No direct port exposure
- Enhanced resource limits
- Production logging
- Health checks for load balancer

**Usage:**
```bash
podman-compose -f compose.prod.yaml up -d
```

### 4. nginx.conf

**Location:** `/opt/projects/repositories/wolfguard-site/nginx.conf`

**Features:**
- Non-root user configuration
- Gzip compression
- Security headers (CSP, X-Frame-Options, etc.)
- SPA routing support
- Cache control for assets
- Health check endpoint

**Key Settings:**
- Listen port: 8080 (non-privileged)
- SPA routing: `try_files $uri $uri/ /index.html`
- Asset caching: 1 year for static files
- HTML: no-cache for dynamic updates

### 5. .containerignore

**Location:** `/opt/projects/repositories/wolfguard-site/.containerignore`

**Excludes:**
- node_modules/
- .git/
- IDE files
- Documentation
- Test files

## Security Hardening

### Container Security

**Non-root User:**
```yaml
USER nginx-user  # uid 1001, gid 1001
```

**Dropped Capabilities:**
```yaml
cap_drop:
  - ALL
cap_add:
  - CHOWN
  - SETGID
  - SETUID
  - NET_BIND_SERVICE
```

**Read-only Filesystem:**
```yaml
read_only: true
tmpfs:
  - /var/cache/nginx:uid=1001,gid=1001,mode=1777
  - /var/run:uid=1001,gid=1001,mode=1777
  - /tmp:uid=1001,gid=1001,mode=1777
```

**Security Options:**
```yaml
security_opt:
  - no-new-privileges:true
```

### Nginx Security Headers

**Applied Headers:**
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- `Content-Security-Policy: ...` (customize as needed)

**Test Security:**
```bash
curl -I http://localhost:8080 | grep -E "(X-Frame|X-Content|X-XSS|Referrer|CSP)"
```

## Resource Management

### Default Limits (Development)

```yaml
resources:
  limits:
    cpus: '1.0'
    memory: 256M
  reservations:
    cpus: '0.25'
    memory: 64M
```

### Production Limits (Recommended)

```yaml
resources:
  limits:
    cpus: '2.0'
    memory: 512M
  reservations:
    cpus: '0.5'
    memory: 128M
```

**Adjust based on:**
- Server capacity
- Traffic volume
- Number of concurrent users

## Networking

### Development (Direct Access)

```yaml
ports:
  - "8080:8080"
```

**Access:** http://localhost:8080

### Production (via Traefik)

```yaml
networks:
  - traefik-public
```

**Traefik labels:**
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.wolfguard.rule=Host(`wolfguard.infra4.dev`)"
  - "traefik.http.routers.wolfguard.entrypoints=https"
  - "traefik.http.routers.wolfguard.tls.certresolver=cloudflare"
```

**Access:** https://wolfguard.infra4.dev

### Network Setup

```bash
# Create Traefik network (if not exists)
podman network create traefik-public

# Verify network
podman network inspect traefik-public

# List containers on network
podman network inspect traefik-public --format '{{range .Containers}}{{.Name}} {{end}}'
```

## Health Checks

### Container Health Check

**Defined in Containerfile:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1
```

**Check health status:**
```bash
podman inspect wolfguard-site --format '{{.State.Health.Status}}'
```

**View health log:**
```bash
podman inspect wolfguard-site --format '{{json .State.Health}}' | python3 -m json.tool
```

### Compose Health Check

**Defined in compose.yaml:**
```yaml
healthcheck:
  test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8080/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 10s
```

### Nginx Health Endpoint

**Endpoint:** `/health`

**Test:**
```bash
curl http://localhost:8080/health
# Output: healthy
```

## Logging

### View Logs

```bash
# Follow logs
make logs

# View last 100 lines
make logs-tail

# Podman logs directly
podman logs wolfguard-site -f

# Podman compose logs
podman-compose logs -f wolfguard-site
```

### Log Configuration

**Development:**
```yaml
logging:
  driver: json-file
  options:
    max-size: "10m"
    max-file: "3"
```

**Production:**
```yaml
logging:
  driver: json-file
  options:
    max-size: "50m"
    max-file: "5"
```

### Log Locations

**Container logs:**
```bash
podman logs wolfguard-site
```

**Nginx access logs:**
```bash
podman exec wolfguard-site cat /var/log/nginx/access.log
```

**Nginx error logs:**
```bash
podman exec wolfguard-site cat /var/log/nginx/error.log
```

## Troubleshooting

### Container won't start

**Check logs:**
```bash
podman logs wolfguard-site
```

**Common issues:**
1. Port already in use
   ```bash
   lsof -i :8080
   # Change port in compose.yaml
   ```

2. Build failed
   ```bash
   make build-no-cache
   ```

3. Permission issues
   ```bash
   # Check SELinux context
   ls -Z /opt/projects/repositories/wolfguard-site
   ```

### Health check failing

**Test manually:**
```bash
curl -v http://localhost:8080/health
curl -v http://localhost:8080/
```

**Check Nginx config:**
```bash
podman exec wolfguard-site nginx -t
```

**Inspect health status:**
```bash
podman inspect wolfguard-site --format '{{json .State.Health}}' | python3 -m json.tool
```

### Traefik not routing

**Checklist:**
1. Container on traefik-public network?
   ```bash
   podman network inspect traefik-public | grep wolfguard
   ```

2. Labels correct?
   ```bash
   podman inspect wolfguard-site --format '{{json .Config.Labels}}' | python3 -m json.tool | grep traefik
   ```

3. DNS record exists?
   ```bash
   dig wolfguard.infra4.dev
   ```

4. Check Traefik dashboard:
   ```
   https://tr-01.infra4.dev
   ```

### Build cache issues

**Clear build cache:**
```bash
podman system prune -af
buildah rm --all
make build-no-cache
```

### Permission denied errors

**SELinux context:**
```bash
# If using volumes with SELinux
sudo chcon -R -t container_file_t /path/to/volume
```

**Rootless Podman:**
```bash
# Check subuid/subgid
grep $USER /etc/subuid /etc/subgid
```

## Performance Tuning

### Nginx Optimization

**Already configured in nginx.conf:**
- Gzip compression
- Sendfile enabled
- TCP optimizations (nopush, nodelay)
- Keep-alive connections
- Worker processes: auto-detect CPUs

### Container Resources

**Monitor resource usage:**
```bash
make stats
podman stats wolfguard-site
```

**Adjust limits in compose.yaml:**
```yaml
deploy:
  resources:
    limits:
      cpus: '2.0'      # Increase if needed
      memory: 512M     # Increase if needed
```

### Caching Strategy

**Static assets (CSS, JS, images):**
- Cache-Control: public, immutable
- Expires: 1 year

**HTML files:**
- Cache-Control: no-cache
- Forces revalidation on each request

## CI/CD Integration

### GitLab CI Example

```yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - make build
    - make test

deploy:
  stage: deploy
  script:
    - make deploy
  only:
    - main
```

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and deploy
        run: |
          make build
          make deploy
```

## Backup and Recovery

### Image Backup

```bash
# Save image
make save
# Creates: wolfguard-site-<commit>.tar

# Load image
make load
```

### Volume Backup

```bash
# Backup Nginx logs volume
podman volume export nginx-logs -o nginx-logs-backup.tar

# Restore
podman volume import nginx-logs nginx-logs-backup.tar
```

## Production Checklist

- [ ] Build image: `make build`
- [ ] Test locally: `make test`
- [ ] Verify health checks: `make health`
- [ ] Check resource limits in compose.prod.yaml
- [ ] Configure Traefik labels (domain, TLS)
- [ ] Create traefik-public network
- [ ] Deploy: `podman-compose -f compose.prod.yaml up -d`
- [ ] Verify HTTPS: `curl https://wolfguard.infra4.dev`
- [ ] Check Traefik dashboard for router
- [ ] Test security headers: `curl -I https://wolfguard.infra4.dev`
- [ ] Monitor logs: `make logs`
- [ ] Set up log rotation (if needed)
- [ ] Configure backups (image + volumes)

## Additional Resources

**Official Documentation:**
- Podman: https://docs.podman.io/en/latest/
- Buildah: https://buildah.io/
- Compose Spec: https://github.com/compose-spec/compose-spec
- Nginx: https://nginx.org/en/docs/

**WolfGuard Infrastructure:**
- Traefik Dashboard: https://tr-01.infra4.dev
- Production Site: https://wolfguard.infra4.dev

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review logs: `make logs`
3. Inspect container: `make inspect`
4. Check Podman docs: https://docs.podman.io/
