# WolfGuard Site - Quick Reference Cheatsheet

## Quick Start (30 seconds)

```bash
cd /opt/projects/repositories/wolfguard-site
make deploy              # Build + Start
curl http://localhost:8080
```

## Essential Commands

### Build
```bash
make build               # Build image
make build-no-cache      # Build from scratch
```

### Start/Stop
```bash
make start               # Start container
make stop                # Stop container
make restart             # Restart container
```

### Logs
```bash
make logs                # Follow logs (Ctrl+C to exit)
make logs-tail           # Last 100 lines
```

### Status
```bash
make status              # Container status
make health              # Health check status
make stats               # Resource usage
```

### Cleanup
```bash
make clean               # Remove container + image
make prune               # Remove unused resources
```

## Port Mappings

**Development:**
- Host: `http://localhost:8080`
- Container: `8080`

**Production (via Traefik):**
- External: `https://wolfguard.infra4.dev`
- Container: `8080`

## File Locations

### Configuration Files
```
/opt/projects/repositories/wolfguard-site/
├── Containerfile              # Multi-stage build
├── nginx.conf                 # Nginx config
├── compose.yaml               # Dev deployment
├── compose.prod.yaml          # Production deployment
├── Makefile                   # Build automation
├── .containerignore           # Build exclusions
├── .env.example               # Environment variables
├── DEPLOYMENT.md              # Full deployment guide
├── SECURITY.md                # Security documentation
└── CHEATSHEET.md              # This file
```

## Common Tasks

### Deploy to Development
```bash
make deploy
```

### Deploy to Production
```bash
# Ensure Traefik network exists
podman network create traefik-public 2>/dev/null || true

# Build and deploy
make build
podman-compose -f compose.prod.yaml up -d

# Verify
curl https://wolfguard.infra4.dev
```

### Update Deployment
```bash
# Pull latest code
git pull

# Rebuild and restart
make restart
```

### View Container Shell
```bash
make shell
```

### Check Health
```bash
# Container health
make health

# HTTP health endpoint
curl http://localhost:8080/health

# Full verification
make verify
```

## Troubleshooting

### Container won't start
```bash
# Check logs
make logs

# Check port conflicts
lsof -i :8080

# Rebuild without cache
make build-no-cache
```

### Health check failing
```bash
# Test manually
curl -v http://localhost:8080/health
curl -v http://localhost:8080/

# Check Nginx config
podman exec wolfguard-site nginx -t

# View detailed health status
podman inspect wolfguard-site --format '{{json .State.Health}}' | python3 -m json.tool
```

### Cannot connect to container
```bash
# Check container is running
make status

# Check network
podman network inspect traefik-public

# Check Traefik routing (production)
curl https://tr-01.infra4.dev/api/http/routers | python3 -m json.tool | grep wolfguard
```

### High resource usage
```bash
# Monitor resources
make stats

# Check logs for errors
make logs-tail | grep -E "(error|warning)"

# Restart container
make restart
```

## Security Quick Checks

### Verify Non-Root User
```bash
podman exec wolfguard-site id
# Expected: uid=1001(nginx-user)
```

### Check Security Headers
```bash
curl -I http://localhost:8080 | grep -E "(X-Frame|X-Content|X-XSS|CSP)"
```

### Test Read-Only Filesystem
```bash
podman exec wolfguard-site touch /test
# Expected: Read-only file system error
```

### Verify TLS (Production)
```bash
curl -v https://wolfguard.infra4.dev 2>&1 | grep -E "(TLS|SSL)"
```

## Image Management

### List Images
```bash
make images
podman images | grep wolfguard
```

### Save/Load Image
```bash
# Save to tar
make save

# Load from tar
make load
```

### Push to Registry
```bash
make push REGISTRY=registry.example.com/wolfguard
```

### Remove All Images
```bash
make clean-all
```

## Networking

### Development (Direct Access)
```bash
# Access via localhost
http://localhost:8080
```

### Production (via Traefik)
```bash
# Check network connection
podman network inspect traefik-public | grep wolfguard

# Test via Traefik
curl https://wolfguard.infra4.dev

# Check Traefik dashboard
https://tr-01.infra4.dev
```

## Logging

### Real-time Logs
```bash
make logs
# or
podman logs -f wolfguard-site
```

### Last 100 Lines
```bash
make logs-tail
# or
podman logs --tail 100 wolfguard-site
```

### Nginx Access Logs
```bash
podman exec wolfguard-site cat /var/log/nginx/access.log
```

### Nginx Error Logs
```bash
podman exec wolfguard-site cat /var/log/nginx/error.log
```

### Search Logs for Errors
```bash
podman logs wolfguard-site | grep -E "(error|ERROR|warning|WARNING)"
```

## Resource Monitoring

### Container Stats
```bash
make stats
# or
podman stats wolfguard-site
```

### Resource Limits
```bash
# View current limits
podman inspect wolfguard-site --format '{{json .HostConfig.Resources}}' | python3 -m json.tool
```

### Process List
```bash
podman top wolfguard-site
```

## Development Workflow

### 1. Local Development
```bash
# Build and test locally
make build
make start
curl http://localhost:8080

# View logs
make logs

# Stop when done
make stop
```

### 2. Testing Changes
```bash
# Make changes to code
vim src/App.tsx

# Rebuild and restart
make restart

# Verify changes
curl http://localhost:8080
```

### 3. Deploy to Production
```bash
# Ensure tests pass
make test

# Build production image
make build

# Deploy with Traefik
podman-compose -f compose.prod.yaml up -d

# Verify
curl https://wolfguard.infra4.dev
```

## Emergency Procedures

### Rollback Deployment
```bash
# Stop current container
make stop

# Load previous image
podman load -i wolfguard-site-<previous-commit>.tar

# Start with previous image
make start
```

### Force Restart
```bash
# Hard stop and start
podman stop -t 0 wolfguard-site
podman start wolfguard-site
```

### Clear Everything and Redeploy
```bash
make clean-all
git pull
make deploy
```

### Export Container for Debugging
```bash
podman export wolfguard-site -o debug-$(date +%Y%m%d-%H%M%S).tar
```

## Performance Optimization

### Check Response Times
```bash
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8080

# curl-format.txt:
# time_total: %{time_total}s
# time_connect: %{time_connect}s
# time_starttransfer: %{time_starttransfer}s
```

### Monitor Resource Usage Over Time
```bash
watch -n 2 'podman stats --no-stream wolfguard-site'
```

### Check Nginx Performance
```bash
# Requests per second (rough estimate from logs)
podman exec wolfguard-site sh -c 'tail -1000 /var/log/nginx/access.log | wc -l'
```

## Useful Aliases

Add to `~/.bashrc` or `~/.zshrc`:

```bash
# WolfGuard aliases
alias wg-start='cd /opt/projects/repositories/wolfguard-site && make start'
alias wg-stop='cd /opt/projects/repositories/wolfguard-site && make stop'
alias wg-logs='cd /opt/projects/repositories/wolfguard-site && make logs'
alias wg-status='cd /opt/projects/repositories/wolfguard-site && make status'
alias wg-deploy='cd /opt/projects/repositories/wolfguard-site && make deploy'
alias wg-health='curl -s http://localhost:8080/health && echo'
```

## Environment Variables

### Development (.env)
```bash
GIT_COMMIT=$(git rev-parse --short HEAD)
BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
TZ=UTC
NODE_ENV=production
```

### Production
```bash
TRAEFIK_DOMAIN=wolfguard.infra4.dev
CPU_LIMIT=2.0
MEMORY_LIMIT=512M
```

## Health Checks

### Quick Health Check
```bash
curl http://localhost:8080/health
# Expected: healthy
```

### Detailed Health Status
```bash
podman inspect wolfguard-site --format '{{.State.Health.Status}}'
# Expected: healthy
```

### Full Verification
```bash
make verify
```

## Information Commands

### System Information
```bash
make info
```

### Version Information
```bash
make version
```

### Container Inspection
```bash
make inspect
```

### Image Details
```bash
make inspect-image
```

## Help

### Show All Makefile Targets
```bash
make help
```

### Documentation
- Full Deployment Guide: `DEPLOYMENT.md`
- Security Documentation: `SECURITY.md`
- This Cheatsheet: `CHEATSHEET.md`

### Online Resources
- Podman Docs: https://docs.podman.io/
- Nginx Docs: https://nginx.org/en/docs/
- Compose Spec: https://github.com/compose-spec/compose-spec

## Support Checklist

When asking for help, provide:
- [ ] Output of `make status`
- [ ] Last 100 lines of logs: `make logs-tail`
- [ ] Container inspection: `make inspect`
- [ ] Resource usage: `make stats`
- [ ] Health status: `make health`
- [ ] Podman version: `podman --version`
- [ ] OS version: `cat /etc/os-release`
