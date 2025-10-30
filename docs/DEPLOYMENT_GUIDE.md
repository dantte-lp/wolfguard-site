# Production Deployment Guide

Complete guide for deploying the WolfGuard landing page to production with Podman, Nginx, and Traefik.

## Overview

This deployment uses:

- **Podman** - Rootless container runtime
- **Podman Compose** - Multi-container orchestration
- **Traefik** - Reverse proxy with automatic SSL/TLS (Let's Encrypt)
- **Nginx** - Static file server inside container
- **Cloudflare** - DNS and CDN (optional but recommended)

## Prerequisites

### Server Requirements

- **OS**: Ubuntu 24.04 LTS or similar (Rocky Linux, Debian, etc.)
- **RAM**: Minimum 2GB (4GB recommended)
- **CPU**: 2 cores minimum
- **Storage**: 20GB minimum
- **Network**: Public IPv4/IPv6 address with ports 80/443 open

### Software Requirements

- Podman 5.0+
- Podman Compose 1.0+
- Git
- Traefik 3.0+ (configured separately)
- Domain name pointing to server IP

## Pre-Deployment Setup

### 1. Install Podman and Dependencies

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y podman podman-compose git

# Rocky Linux/RHEL
sudo dnf install -y podman podman-compose git

# Verify installation
podman --version
podman-compose --version
```

### 2. Configure Podman

```bash
# Enable rootless mode
loginctl enable-linger $USER

# Create Podman networks (if not exists)
podman network create traefik-public 2>/dev/null || true

# Verify network
podman network ls | grep traefik-public
```

### 3. Set Up DNS

Point your domain to server IP:

```
A     wolfguard.io      -> YOUR_SERVER_IP
A     www.wolfguard.io  -> YOUR_SERVER_IP
```

Wait for DNS propagation (check with `dig wolfguard.io`).

## Deployment Steps

### 1. Clone Repository

```bash
# Create projects directory
mkdir -p /opt/projects/repositories
cd /opt/projects/repositories

# Clone repository
git clone https://github.com/wolfguard/wolfguard-site.git
cd wolfguard-site
```

### 2. Configure Environment

```bash
# Set build variables
export BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
export GIT_COMMIT="$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")"

# Verify environment
echo "Build Date: $BUILD_DATE"
echo "Git Commit: $GIT_COMMIT"
```

### 3. Build Container Image

```bash
# Build with no cache for clean build
BUILD_DATE="$BUILD_DATE" \
GIT_COMMIT="$GIT_COMMIT" \
podman-compose -f compose.prod.yaml build --no-cache

# Verify image created
podman images | grep wolfguard-site
```

Expected output:

```
localhost/wolfguard-site  latest  <IMAGE_ID>  X minutes ago  87.2 MB
```

### 4. Deploy Container

```bash
# Start container in detached mode
BUILD_DATE="$BUILD_DATE" \
GIT_COMMIT="$GIT_COMMIT" \
podman-compose -f compose.prod.yaml up -d

# Verify container is running
podman ps --filter "name=wolfguard-site"
```

### 5. Verify Deployment

```bash
# Check container health
podman inspect wolfguard-site --format '{{.State.Health.Status}}'
# Should output: healthy

# Check logs
podman logs --tail=50 wolfguard-site

# Test internal access
podman exec wolfguard-site wget -qO- http://localhost:8080/

# Test external access (via Traefik)
curl -sI https://wolfguard.io/ | head -10
```

### 6. Verify React App Rendering

```bash
# Check HTML structure
curl -s https://wolfguard.io/ | grep "root"
# Should see: <div id="root"></div>

# Check assets loading
curl -sI https://wolfguard.io/assets/index-*.js
# Should return 200 OK

# Check in browser
# Visit: https://wolfguard.io
# Should see WolfGuard landing page with:
# - Header with logo
# - Hero section
# - Features section
# - Quick start guide
# - Links section
# - Footer
```

## Traefik Configuration

Ensure Traefik is configured to route traffic to the container.

### Traefik Labels (in compose.prod.yaml)

```yaml
labels:
  - 'traefik.enable=true'
  - 'traefik.docker.network=traefik-public'

  # HTTP to HTTPS redirect
  - 'traefik.http.routers.wolfguard-http.rule=Host(`wolfguard.io`) || Host(`www.wolfguard.io`)'
  - 'traefik.http.routers.wolfguard-http.entrypoints=http'
  - 'traefik.http.routers.wolfguard-http.middlewares=https-redirect@file'

  # HTTPS router
  - 'traefik.http.routers.wolfguard.rule=Host(`wolfguard.io`) || Host(`www.wolfguard.io`)'
  - 'traefik.http.routers.wolfguard.entrypoints=https'
  - 'traefik.http.routers.wolfguard.tls.certresolver=cloudflare'
  - 'traefik.http.routers.wolfguard.tls.domains[0].main=wolfguard.io'
  - 'traefik.http.routers.wolfguard.tls.domains[0].sans=www.wolfguard.io'

  # Service configuration
  - 'traefik.http.services.wolfguard.loadbalancer.server.port=8080'
```

## Post-Deployment Tasks

### 1. Set Up Monitoring

```bash
# Check container stats
podman stats wolfguard-site

# Set up log rotation (if needed)
# Logs are already configured in compose.prod.yaml with max-size: 50m, max-file: 5
```

### 2. Create Systemd Service (Optional)

For auto-start on boot:

```bash
# Generate systemd service
cd /opt/projects/repositories/wolfguard-site
podman generate systemd --new --name wolfguard-site > /etc/systemd/system/wolfguard-site.service

# Enable service
sudo systemctl daemon-reload
sudo systemctl enable wolfguard-site.service
sudo systemctl start wolfguard-site.service

# Check status
sudo systemctl status wolfguard-site.service
```

### 3. Configure Backups

```bash
# Backup script example
cat > /opt/backups/backup-wolfguard-site.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/wolfguard-site"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"

# Export container image
podman save localhost/wolfguard-site:latest | gzip > "$BACKUP_DIR/wolfguard-site-$DATE.tar.gz"

# Keep only last 7 backups
ls -t "$BACKUP_DIR"/wolfguard-site-*.tar.gz | tail -n +8 | xargs -r rm

echo "Backup completed: $BACKUP_DIR/wolfguard-site-$DATE.tar.gz"
EOF

chmod +x /opt/backups/backup-wolfguard-site.sh

# Add to cron (daily backup at 3 AM)
echo "0 3 * * * /opt/backups/backup-wolfguard-site.sh" | crontab -
```

## Updating Deployment

### Method 1: Quick Update (Recommended)

```bash
cd /opt/projects/repositories/wolfguard-site

# Pull latest changes
git pull origin main

# Rebuild and redeploy
BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
GIT_COMMIT="$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")" \
podman-compose -f compose.prod.yaml up -d --build --force-recreate

# Verify new container is healthy
podman ps --filter "name=wolfguard-site"
podman logs --tail=30 wolfguard-site
```

### Method 2: Blue-Green Deployment

```bash
# Build new image with tag
BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
GIT_COMMIT="$(git rev-parse --short HEAD)" \
podman build -t localhost/wolfguard-site:$GIT_COMMIT -f config/docker/Containerfile .

# Test new image
podman run -d --name wolfguard-site-test \
  -p 8081:8080 \
  localhost/wolfguard-site:$GIT_COMMIT

# Test access
curl -sI http://localhost:8081/

# If successful, switch to new version
podman-compose -f compose.prod.yaml down
podman tag localhost/wolfguard-site:$GIT_COMMIT localhost/wolfguard-site:latest
podman-compose -f compose.prod.yaml up -d

# Clean up test container
podman rm -f wolfguard-site-test
```

## Rolling Back

If issues occur, rollback to previous version:

```bash
# List available images
podman images | grep wolfguard-site

# Tag previous working version as latest
podman tag localhost/wolfguard-site:<OLD_COMMIT> localhost/wolfguard-site:latest

# Restart container
podman-compose -f compose.prod.yaml up -d --force-recreate
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
podman logs wolfguard-site

# Check health status
podman inspect wolfguard-site --format '{{.State.Health}}'

# Verify network connectivity
podman network inspect traefik-public

# Test nginx config
podman run --rm -v $(pwd)/config/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
  nginx:1.27-alpine nginx -t
```

### Site Not Accessible

```bash
# Check Traefik is running
podman ps | grep traefik

# Check Traefik logs
podman logs traefik

# Verify DNS resolution
dig wolfguard.io
nslookup wolfguard.io

# Test direct container access
podman exec wolfguard-site wget -qO- http://localhost:8080/
```

### SSL/TLS Issues

```bash
# Check certificate
echo | openssl s_client -connect wolfguard.io:443 -servername wolfguard.io

# Check Traefik certificate resolver
podman exec traefik cat /letsencrypt/acme.json | grep wolfguard.io
```

### Performance Issues

```bash
# Check resource usage
podman stats wolfguard-site

# Check nginx access logs
podman logs wolfguard-site | grep "GET"

# Increase resource limits in compose.prod.yaml
# deploy.resources.limits.cpus: '4.0'
# deploy.resources.limits.memory: 1G
```

## Security Checklist

- [ ] Container runs as non-root user (nginx-user)
- [ ] Read-only root filesystem enabled
- [ ] Minimal capabilities (no CAP_SYS_ADMIN, etc.)
- [ ] Security updates applied (apt upgrade in Containerfile)
- [ ] SSL/TLS certificates valid and auto-renewing
- [ ] Firewall configured (only ports 80/443 open)
- [ ] Rate limiting enabled in Traefik
- [ ] Security headers configured in Nginx
- [ ] Logs monitored for suspicious activity

## Performance Optimization

### Nginx Tuning

Edit `config/nginx/nginx.conf`:

```nginx
# Increase worker processes
worker_processes auto;

# Enable gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;

# Enable HTTP/2
listen 8080 http2;

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Cloudflare Optimization

- Enable Cloudflare CDN
- Configure caching rules
- Enable Brotli compression
- Use Cloudflare Polish for image optimization

## Monitoring and Alerting

### Prometheus Metrics (Optional)

```bash
# Add prometheus nginx exporter
podman run -d --name nginx-exporter \
  --network traefik-public \
  -p 9113:9113 \
  nginx/nginx-prometheus-exporter:latest \
  -nginx.scrape-uri=http://wolfguard-site:8080/stub_status
```

### Uptime Monitoring

Use external services:

- UptimeRobot (free tier)
- Pingdom
- StatusCake
- Healthchecks.io

## Support

For deployment issues:

- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Review logs: `podman logs wolfguard-site`
- Open issue: [GitHub Issues](https://github.com/wolfguard/wolfguard-site/issues)
