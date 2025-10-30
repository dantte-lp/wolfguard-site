# WolfGuard Site - Podman Deployment Summary

**Generated:** 2025-10-29
**Repository:** /opt/projects/repositories/wolfguard-site
**Status:** ✅ Configuration Complete - Ready for Build

---

## 📋 Deliverables Overview

### Configuration Files Created (10 files)

| File                            | Size   | Purpose                                      |
| ------------------------------- | ------ | -------------------------------------------- |
| **Containerfile**               | 3.4 KB | Multi-stage OCI container build definition   |
| **nginx.conf**                  | 4.1 KB | Production-optimized Nginx web server config |
| **compose.yaml**                | 2.5 KB | Development deployment (localhost:8080)      |
| **compose.prod.yaml**           | 3.4 KB | Production deployment (Traefik integration)  |
| **Makefile**                    | 7.7 KB | Build automation (30+ commands)              |
| **.containerignore**            | 1.1 KB | Build exclusions (node_modules, .git, etc.)  |
| **.env.example**                | 511 B  | Environment variable templates               |
| **DEPLOYMENT.md**               | 14 KB  | Complete deployment guide                    |
| **SECURITY.md**                 | 17 KB  | Security architecture and hardening          |
| **CHEATSHEET.md**               | 8.6 KB | Quick reference for common tasks             |
| **PODMAN_DEPLOYMENT_README.md** | 17 KB  | Overview and quick start guide               |

**Total Configuration:** ~78 KB

---

## 🏗️ Architecture Summary

### Multi-Stage Build

```
┌──────────────────────────────────────────────────────┐
│ Stage 1: Builder (node:22-alpine)                    │
│ ────────────────────────────────────────────────     │
│ • npm ci (install dependencies)                      │
│ • npm run build (Vite build)                         │
│ • Output: dist/ directory (optimized static files)   │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│ Stage 2: Runtime (nginx:1.27-alpine)                 │
│ ────────────────────────────────────────────────     │
│ • Copy dist/ from builder stage                      │
│ • Non-root user (uid 1001, nginx-user)               │
│ • Read-only root filesystem                          │
│ • Dropped capabilities (cap_drop: ALL)               │
│ • Security headers (CSP, X-Frame-Options, etc.)      │
│ • Port 8080 (non-privileged)                         │
│ • Health check endpoint: /health                     │
└──────────────────────────────────────────────────────┘
```

### Deployment Options

```
Development (compose.yaml)         Production (compose.prod.yaml)
─────────────────────────────      ───────────────────────────────
• Port 8080 exposed                • No port exposure
• localhost access only            • Traefik reverse proxy
• Quick iteration                  • Automatic HTTPS/TLS
• Resource limits: 1 CPU, 256M     • Enhanced limits: 2 CPU, 512M
• Access: http://localhost:8080    • Access: https://wolfguard.infra4.dev
```

---

## 🚀 Build Commands

### Quick Start (30 seconds)

```bash
cd /opt/projects/repositories/wolfguard-site
make deploy
curl http://localhost:8080
```

### Step-by-Step Build

```bash
# 1. Build container image with Podman/Buildah
make build

# Equivalent to:
podman build \
  --file Containerfile \
  --tag localhost/wolfguard-site:latest \
  --build-arg BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
  --build-arg GIT_COMMIT="$(git rev-parse --short HEAD)" \
  --format oci \
  --runtime crun \
  --layers \
  .

# 2. Start container with podman-compose
make start

# Equivalent to:
BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
GIT_COMMIT="$(git rev-parse --short HEAD)" \
podman-compose -f compose.yaml up -d

# 3. Verify deployment
make verify

# Equivalent to:
curl http://localhost:8080/health
curl http://localhost:8080/
```

### Build Without Cache

```bash
make build-no-cache

# Equivalent to:
podman build \
  --no-cache \
  --file Containerfile \
  --tag localhost/wolfguard-site:latest \
  --format oci \
  --runtime crun \
  .
```

---

## 🎯 Deploy Commands

### Development Deployment

```bash
# Option 1: Full pipeline (build + start + verify)
make deploy

# Option 2: Manual steps
make build
make start
make logs

# Access
curl http://localhost:8080
open http://localhost:8080  # macOS
xdg-open http://localhost:8080  # Linux
```

### Production Deployment (Traefik)

```bash
# 1. Ensure Traefik network exists
podman network create traefik-public 2>/dev/null || true

# 2. Build image
make build

# 3. Deploy with production configuration
BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
GIT_COMMIT="$(git rev-parse --short HEAD)" \
podman-compose -f compose.prod.yaml up -d

# 4. Verify deployment
curl https://wolfguard.infra4.dev
curl https://wolfguard.infra4.dev/health

# 5. Check Traefik routing
curl -s https://tr-01.infra4.dev/api/http/routers | \
  python3 -m json.tool | \
  grep -A 10 wolfguard
```

### Alternative: Production with Makefile

```bash
# Create Makefile target for production
cat >> Makefile << 'EOF'

.PHONY: deploy-prod
deploy-prod: build ## Deploy to production with Traefik
	@echo "$(COLOR_INFO)Deploying to production...$(COLOR_RESET)"
	@podman network create traefik-public 2>/dev/null || true
	@BUILD_DATE="$(BUILD_DATE)" GIT_COMMIT="$(GIT_COMMIT)" \
		podman-compose -f compose.prod.yaml up -d
	@echo "$(COLOR_SUCCESS)Production deployment complete$(COLOR_RESET)"
	@echo "$(COLOR_INFO)Access: https://wolfguard.infra4.dev$(COLOR_RESET)"
EOF

# Then deploy
make deploy-prod
```

---

## 🔌 Port Mappings

| Environment     | Host Port | Container Port | Access URL                   |
| --------------- | --------- | -------------- | ---------------------------- |
| **Development** | 8080      | 8080           | http://localhost:8080        |
| **Production**  | None      | 8080           | https://wolfguard.infra4.dev |

**Notes:**

- Development: Direct port binding to localhost
- Production: No port exposure, access via Traefik reverse proxy
- Container always listens on port 8080 (non-privileged)
- Traefik handles TLS termination and routes to container

---

## 🛡️ Security Considerations

### Container Security Hardening

✅ **Non-root User**

- User: `nginx-user` (uid 1001, gid 1001)
- All processes run as non-root
- Verification: `podman exec wolfguard-site id`

✅ **Read-only Root Filesystem**

- Root filesystem mounted as read-only
- Writable directories: tmpfs mounts
  - `/var/cache/nginx`
  - `/var/run`
  - `/tmp`
- Verification: `podman exec wolfguard-site touch /test` (should fail)

✅ **Dropped Capabilities**

- Default: ALL capabilities dropped
- Granted: CHOWN, SETGID, SETUID, NET_BIND_SERVICE
- Verification: `podman inspect wolfguard-site --format '{{.EffectiveCaps}}'`

✅ **Security Options**

- `no-new-privileges:true` - prevents privilege escalation
- seccomp profile: default (blocks dangerous syscalls)

✅ **Resource Limits**

- CPU: 1.0 cores (dev), 2.0 cores (prod)
- Memory: 256M (dev), 512M (prod)
- Prevents resource exhaustion attacks

### Nginx Security Features

✅ **Security Headers**

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: [customizable]
```

✅ **Server Information**

- `server_tokens off` - hides Nginx version
- Reduces information disclosure

✅ **Compression**

- Gzip enabled (level 6)
- Optimizes bandwidth and performance

✅ **Cache Control**

- Static assets: 1 year cache (immutable)
- HTML: no-cache (force revalidation)

### Network Security

✅ **Development**

- Port binding: `127.0.0.1:8080:8080` (localhost only)
- Not exposed to external network

✅ **Production**

- No direct port exposure
- Access via Traefik reverse proxy
- Network isolation: `traefik-public` network
- Automatic HTTPS/TLS (Let's Encrypt)

### Verification Commands

```bash
# Check non-root user
podman exec wolfguard-site id

# Test read-only filesystem
podman exec wolfguard-site touch /test

# Verify security headers
curl -I http://localhost:8080 | grep -E "(X-Frame|X-Content|X-XSS)"

# Check capabilities
podman inspect wolfguard-site --format '{{.EffectiveCaps}}'

# Verify TLS (production)
curl -v https://wolfguard.infra4.dev 2>&1 | grep -E "(TLS|SSL)"
```

---

## ⚙️ Recommended Production Settings

### Resource Limits

**Default (Development):**

```yaml
resources:
  limits:
    cpus: '1.0'
    memory: 256M
  reservations:
    cpus: '0.25'
    memory: 64M
```

**Recommended (Production):**

```yaml
resources:
  limits:
    cpus: '2.0' # Increase for high traffic
    memory: 512M # Increase if needed
  reservations:
    cpus: '0.5'
    memory: 128M
```

**Adjust based on:**

- Server capacity
- Expected traffic volume
- Number of concurrent users
- Monitoring data (use `make stats`)

### Traefik Configuration

**Minimal (already configured):**

```yaml
labels:
  - 'traefik.enable=true'
  - 'traefik.http.routers.wolfguard.rule=Host(`wolfguard.infra4.dev`)'
  - 'traefik.http.routers.wolfguard.entrypoints=https'
  - 'traefik.http.routers.wolfguard.tls.certresolver=cloudflare'
  - 'traefik.http.services.wolfguard.loadbalancer.server.port=8080'
```

**Enhanced (recommended for production):**

```yaml
labels:
  # Basic configuration
  - 'traefik.enable=true'
  - 'traefik.docker.network=traefik-public'

  # HTTP -> HTTPS redirect
  - 'traefik.http.routers.wolfguard-http.rule=Host(`wolfguard.infra4.dev`)'
  - 'traefik.http.routers.wolfguard-http.entrypoints=http'
  - 'traefik.http.routers.wolfguard-http.middlewares=https-redirect@file'

  # HTTPS router
  - 'traefik.http.routers.wolfguard.rule=Host(`wolfguard.infra4.dev`)'
  - 'traefik.http.routers.wolfguard.entrypoints=https'
  - 'traefik.http.routers.wolfguard.tls.certresolver=cloudflare'
  - 'traefik.http.routers.wolfguard.middlewares=web-standard@file'

  # Service configuration
  - 'traefik.http.services.wolfguard.loadbalancer.server.port=8080'
  - 'traefik.http.services.wolfguard.loadbalancer.healthcheck.path=/health'
  - 'traefik.http.services.wolfguard.loadbalancer.healthcheck.interval=30s'
```

### Logging Configuration

**Development:**

```yaml
logging:
  driver: json-file
  options:
    max-size: '10m'
    max-file: '3'
```

**Production:**

```yaml
logging:
  driver: json-file
  options:
    max-size: '50m'
    max-file: '5'
    tag: 'wolfguard-site-prod'
    labels: 'com.wolfguard.project,com.wolfguard.environment'
```

### Health Check Configuration

**Current (optimal for most cases):**

```yaml
healthcheck:
  test: ['CMD', 'wget', '--no-verbose', '--tries=1', '--spider', 'http://localhost:8080/health']
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 10s
```

**Aggressive (for critical services):**

```yaml
healthcheck:
  test: ['CMD', 'wget', '--no-verbose', '--tries=1', '--spider', 'http://localhost:8080/health']
  interval: 10s # Check every 10 seconds
  timeout: 5s
  retries: 3
  start_period: 5s
```

### Nginx Optimization

**Already configured in nginx.conf:**

- ✅ Worker processes: auto (detects CPU cores)
- ✅ Gzip compression: enabled (level 6)
- ✅ Sendfile: enabled
- ✅ TCP optimizations: nopush, nodelay
- ✅ Keep-alive: 65 seconds

**Additional tuning (if needed):**

```nginx
# Increase worker connections (high traffic)
events {
    worker_connections 2048;  # Default: 1024
}

# Increase client body size (large uploads)
http {
    client_max_body_size 20M;  # Default: 10M
}
```

---

## 📊 Monitoring Commands

### Real-time Monitoring

```bash
# Follow logs
make logs

# Container stats
make stats

# Health status
make health

# Container status
make status
```

### Detailed Monitoring

```bash
# View last 100 lines of logs
make logs-tail

# Check resource usage
podman stats --no-stream wolfguard-site

# Health check details
podman inspect wolfguard-site --format '{{json .State.Health}}' | python3 -m json.tool

# Process list
podman top wolfguard-site

# Network information
podman inspect wolfguard-site --format '{{json .NetworkSettings}}' | python3 -m json.tool
```

### Performance Metrics

```bash
# Nginx access log stats (last 1000 requests)
podman exec wolfguard-site sh -c 'tail -1000 /var/log/nginx/access.log | wc -l'

# Response time testing
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8080

# Create curl-format.txt:
cat > curl-format.txt << 'EOF'
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
   time_pretransfer:  %{time_pretransfer}\n
      time_redirect:  %{time_redirect}\n
 time_starttransfer:  %{time_starttransfer}\n
                    ----------\n
         time_total:  %{time_total}\n
EOF
```

---

## 🔧 Maintenance Commands

### Update Deployment

```bash
# Pull latest code
git pull

# Rebuild and restart
make restart

# Verify
curl http://localhost:8080
```

### Clean Rebuild

```bash
# Stop and remove everything
make clean

# Rebuild from scratch
make build-no-cache

# Start fresh
make start
```

### Image Management

```bash
# List project images
make images

# Save image to tar
make save

# Load image from tar
make load

# Push to registry
make push REGISTRY=registry.example.com/wolfguard
```

### Backup

```bash
# Backup image
make save
cp wolfguard-site-*.tar /backup/

# Backup Nginx logs volume
podman volume export nginx-logs -o nginx-logs-backup.tar

# Backup configuration
tar -czf wolfguard-config-$(date +%Y%m%d).tar.gz \
  Containerfile nginx.conf compose*.yaml Makefile .containerignore
```

### System Cleanup

```bash
# Remove project containers and images
make clean

# Prune unused resources
make prune

# Deep clean (all unused resources)
make clean-all

# Full Podman cleanup
podman system prune -af --volumes
```

---

## 🐛 Troubleshooting Quick Reference

### Container won't start

```bash
# Check logs
make logs

# Check port conflicts
lsof -i :8080

# Rebuild without cache
make build-no-cache

# Check Podman status
podman ps -a | grep wolfguard
```

### Health check failing

```bash
# Test health endpoint
curl -v http://localhost:8080/health

# Test root endpoint
curl -v http://localhost:8080/

# Check Nginx config
podman exec wolfguard-site nginx -t

# View health log
podman inspect wolfguard-site --format '{{json .State.Health}}' | python3 -m json.tool
```

### Cannot access site

```bash
# Check container is running
make status

# Check port binding
podman port wolfguard-site

# Check firewall
sudo firewall-cmd --list-ports

# Test locally in container
podman exec wolfguard-site wget -O- http://localhost:8080/health
```

### Traefik not routing (production)

```bash
# Check network connection
podman network inspect traefik-public | grep wolfguard

# Check Traefik labels
podman inspect wolfguard-site --format '{{json .Config.Labels}}' | python3 -m json.tool | grep traefik

# Check DNS record
dig wolfguard.infra4.dev

# Check Traefik dashboard
https://tr-01.infra4.dev

# Check Traefik API
curl -s https://tr-01.infra4.dev/api/http/routers | python3 -m json.tool | grep wolfguard
```

### High resource usage

```bash
# Monitor resources
make stats

# Check for errors
make logs-tail | grep -E "(error|warning)"

# Check Nginx access log for unusual patterns
podman exec wolfguard-site tail -100 /var/log/nginx/access.log

# Restart container
make restart
```

---

## 📚 Documentation Index

### Quick Start

- **PODMAN_DEPLOYMENT_README.md** - Overview and quick start guide (17 KB)
- **CHEATSHEET.md** - Common commands and workflows (8.6 KB)

### Complete Guide

- **DEPLOYMENT.md** - Full deployment guide with troubleshooting (14 KB)
- **SECURITY.md** - Security architecture and best practices (17 KB)

### Summary

- **DEPLOYMENT_SUMMARY.md** - This file - complete reference

### Configuration Reference

- **Containerfile** - Multi-stage build definition
- **nginx.conf** - Nginx configuration
- **compose.yaml** - Development deployment
- **compose.prod.yaml** - Production deployment
- **Makefile** - Build automation (30+ commands)

---

## ✅ Pre-Deployment Checklist

### Prerequisites

- [ ] Podman installed (>= 4.0)
- [ ] Buildah installed (>= 1.28)
- [ ] Skopeo installed (>= 1.10)
- [ ] podman-compose installed (>= 1.0)
- [ ] crun runtime available

### Development Deployment

- [ ] Review `compose.yaml` configuration
- [ ] Customize resource limits if needed
- [ ] Run `make build` to build image
- [ ] Run `make start` to start container
- [ ] Verify: `curl http://localhost:8080`
- [ ] Check health: `make health`
- [ ] Monitor logs: `make logs`

### Production Deployment

- [ ] Traefik network created: `podman network create traefik-public`
- [ ] Traefik running and accessible
- [ ] DNS record configured for `wolfguard.infra4.dev`
- [ ] Review `compose.prod.yaml` configuration
- [ ] Customize Traefik domain/labels
- [ ] Adjust resource limits for production
- [ ] Build image: `make build`
- [ ] Deploy: `podman-compose -f compose.prod.yaml up -d`
- [ ] Verify HTTPS: `curl https://wolfguard.infra4.dev`
- [ ] Check Traefik dashboard for router
- [ ] Test security headers: `curl -I https://wolfguard.infra4.dev`
- [ ] Monitor logs: `make logs`

---

## 🎓 Learning Resources

### Official Documentation

- **Podman:** https://docs.podman.io/en/latest/
- **Buildah:** https://buildah.io/
- **Compose Spec:** https://github.com/compose-spec/compose-spec
- **Nginx:** https://nginx.org/en/docs/

### Security Resources

- **OWASP:** https://owasp.org/
- **CIS Benchmarks:** https://www.cisecurity.org/cis-benchmarks/
- **NIST 800-190:** https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-190.pdf

### Tools

- **Trivy (vulnerability scanning):** https://github.com/aquasecurity/trivy
- **Falco (runtime security):** https://falco.org/

---

## 📞 Support

### Quick Help

```bash
# Show all Makefile commands
make help

# Show system information
make info

# Show version
make version
```

### Documentation

1. **Quick Start:** Read `PODMAN_DEPLOYMENT_README.md`
2. **Common Tasks:** Check `CHEATSHEET.md`
3. **Full Guide:** Review `DEPLOYMENT.md`
4. **Security:** Study `SECURITY.md`

### Troubleshooting Steps

1. Check logs: `make logs`
2. Check status: `make status`
3. Check health: `make health`
4. Review documentation
5. Verify prerequisites
6. Try clean rebuild: `make clean && make deploy`

---

## 🎉 Next Steps

### Immediate Actions

1. **Review Configuration Files**
   - Read through `Containerfile` to understand build process
   - Review `nginx.conf` for web server configuration
   - Check `compose.yaml` for deployment settings

2. **Test Local Deployment**

   ```bash
   cd /opt/projects/repositories/wolfguard-site
   make deploy
   curl http://localhost:8080
   ```

3. **Review Documentation**
   - Quick reference: `CHEATSHEET.md`
   - Full guide: `DEPLOYMENT.md`
   - Security: `SECURITY.md`

### After Frontend Complete

1. **Verify Build**

   ```bash
   # Ensure dist/ directory is created by frontend build
   npm run build
   ls -la dist/
   ```

2. **Test Container Build**

   ```bash
   make build
   ```

3. **Deploy and Test**

   ```bash
   make start
   curl http://localhost:8080
   ```

4. **Deploy to Production**
   ```bash
   make build
   podman-compose -f compose.prod.yaml up -d
   curl https://wolfguard.infra4.dev
   ```

---

## 📈 Status

**Configuration Status:** ✅ Complete

**Files Created:** 11 configuration files + 3 documentation files

**Total Size:** ~78 KB

**Ready for:**

- ✅ Build and testing (after frontend agent completes)
- ✅ Local development deployment
- ✅ Production deployment with Traefik

**Awaiting:**

- Frontend agent to complete React app structure
- `package.json` with build script
- Source files in `src/` directory

**Next Command (after frontend ready):**

```bash
make deploy
```

---

**Configuration Complete** | **Generated:** 2025-10-29 | **Repository:** /opt/projects/repositories/wolfguard-site
