# Production Deployment Guide - WolfGuard Site

## Overview

This guide covers deploying the WolfGuard landing page to production using Traefik reverse proxy with automatic HTTPS via Let's Encrypt.

## Prerequisites

- Traefik instance running with Docker/Podman provider enabled
- Cloudflare DNS configured for `wolfguard.io`
- Network `traefik-public` created
- DNS A/AAAA records pointing to your server:
  - `wolfguard.io` → Server IP
  - `www.wolfguard.io` → Server IP

## DNS Configuration

### Cloudflare DNS Records

Add the following records in Cloudflare:

| Type | Name | Content | Proxy Status | TTL |
|------|------|---------|--------------|-----|
| A | @ | YOUR_SERVER_IP | Proxied (Orange) | Auto |
| CNAME | www | wolfguard.io | Proxied (Orange) | Auto |

**Note:** If using Cloudflare proxy, Traefik must use Cloudflare DNS challenge for Let's Encrypt.

## Deployment Steps

### 1. Verify Traefik Network

```bash
podman network ls | grep traefik-public
```

If not exists:
```bash
podman network create traefik-public
```

### 2. Build Production Image

```bash
cd /opt/projects/repositories/wolfguard-site

# Set build metadata
export BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
export GIT_COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "dev")

# Build image
make build
```

### 3. Deploy with Traefik

```bash
# Deploy using production compose
podman-compose -f compose.prod.yaml up -d
```

Or use Makefile:
```bash
make deploy-prod
```

### 4. Verify Deployment

```bash
# Check container status
podman ps | grep wolfguard-site

# Check container logs
podman logs wolfguard-site

# Check health
podman inspect wolfguard-site | jq '.[0].State.Health'
```

### 5. Verify Traefik Integration

```bash
# Check Traefik dashboard (if enabled)
# Look for wolfguard service

# Test HTTP redirect
curl -I http://wolfguard.io
# Should return 301/302 redirect to HTTPS

# Test HTTPS
curl -I https://wolfguard.io
# Should return 200 OK

# Test www subdomain
curl -I https://www.wolfguard.io
# Should return 200 OK
```

### 6. Verify SSL Certificate

```bash
# Check certificate
openssl s_client -connect wolfguard.io:443 -servername wolfguard.io < /dev/null 2>/dev/null | openssl x509 -noout -text | grep -A 2 "Subject Alternative Name"

# Should show:
# DNS:wolfguard.io, DNS:www.wolfguard.io
```

## Traefik Configuration

### Labels Applied (compose.prod.yaml)

```yaml
labels:
  # Enable Traefik
  - "traefik.enable=true"
  - "traefik.docker.network=traefik-public"

  # HTTP → HTTPS redirect
  - "traefik.http.routers.wolfguard-http.rule=Host(`wolfguard.io`) || Host(`www.wolfguard.io`)"
  - "traefik.http.routers.wolfguard-http.entrypoints=http"
  - "traefik.http.routers.wolfguard-http.middlewares=https-redirect@file"

  # HTTPS Router
  - "traefik.http.routers.wolfguard.rule=Host(`wolfguard.io`) || Host(`www.wolfguard.io`)"
  - "traefik.http.routers.wolfguard.entrypoints=https"
  - "traefik.http.routers.wolfguard.tls.certresolver=cloudflare"
  - "traefik.http.routers.wolfguard.tls.domains[0].main=wolfguard.io"
  - "traefik.http.routers.wolfguard.tls.domains[0].sans=www.wolfguard.io"
  - "traefik.http.routers.wolfguard.middlewares=web-standard@file"

  # Service configuration
  - "traefik.http.services.wolfguard.loadbalancer.server.port=8080"
  - "traefik.http.services.wolfguard.loadbalancer.healthcheck.path=/health"
  - "traefik.http.services.wolfguard.loadbalancer.healthcheck.interval=30s"
```

### Middleware Applied

From `/opt/projects/repositories/traefik/config/dynamic.yml`:

- **web-standard**:
  - Security headers (HSTS, X-Frame-Options, CSP, etc.)
  - Compression (gzip)
  - Rate limiting (100 req/s, burst 50)

## Monitoring

### Container Status

```bash
# View container status
podman ps -a | grep wolfguard

# View logs (last 100 lines)
podman logs --tail=100 wolfguard-site

# Follow logs
podman logs -f wolfguard-site

# View container stats
podman stats wolfguard-site
```

### Health Checks

```bash
# Internal health check
podman exec wolfguard-site wget -qO- http://localhost:8080/health

# External health check
curl https://wolfguard.io/health
```

### Traefik Dashboard

If Traefik dashboard is enabled, check:
- Service status: `wolfguard`
- Router status: `wolfguard`, `wolfguard-http`
- Certificate status: `wolfguard.io`

## Updating

### Update Code and Redeploy

```bash
cd /opt/projects/repositories/wolfguard-site

# Pull latest changes
git pull origin master

# Rebuild and redeploy
export BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
export GIT_COMMIT=$(git rev-parse --short HEAD)

podman-compose -f compose.prod.yaml build
podman-compose -f compose.prod.yaml up -d

# Verify deployment
curl -I https://wolfguard.io
```

### Zero-Downtime Update

```bash
# Build new image first
make build

# Update with pull policy
podman-compose -f compose.prod.yaml up -d --force-recreate
```

## Troubleshooting

### Issue: Container not accessible via Traefik

**Check:**
1. Container is connected to `traefik-public` network:
   ```bash
   podman inspect wolfguard-site | jq '.[0].NetworkSettings.Networks'
   ```

2. Traefik can see the container:
   ```bash
   podman exec traefik wget -qO- http://wolfguard-site:8080/health
   ```

3. Traefik logs for errors:
   ```bash
   podman logs traefik | grep wolfguard
   ```

### Issue: SSL certificate not issued

**Check:**
1. Cloudflare DNS challenge configured in Traefik
2. Cloudflare API token has correct permissions
3. DNS records exist and are correct
4. Check Traefik logs:
   ```bash
   podman logs traefik | grep -i "wolfguard\|acme\|certificate"
   ```

### Issue: 502 Bad Gateway

**Check:**
1. Container is running and healthy:
   ```bash
   podman ps | grep wolfguard-site
   podman inspect wolfguard-site | jq '.[0].State'
   ```

2. Nginx is responding:
   ```bash
   podman exec wolfguard-site wget -qO- http://localhost:8080/
   ```

3. Network connectivity:
   ```bash
   podman exec traefik ping -c 3 wolfguard-site
   ```

### Issue: HTTP redirect not working

**Check:**
1. Middleware `https-redirect@file` exists in `dynamic.yml`
2. HTTP router is configured correctly
3. Test direct connection:
   ```bash
   curl -v http://wolfguard.io 2>&1 | grep -i location
   ```

## Rollback

### Rollback to Previous Version

```bash
# Stop current deployment
podman-compose -f compose.prod.yaml down

# Checkout previous version
git checkout HEAD~1

# Rebuild and deploy
export BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
export GIT_COMMIT=$(git rev-parse --short HEAD)

podman-compose -f compose.prod.yaml build
podman-compose -f compose.prod.yaml up -d
```

## Maintenance

### Log Rotation

Logs are automatically rotated:
- **Max size**: 50MB per file
- **Max files**: 5
- **Total storage**: ~250MB

### Container Updates

```bash
# Check for image updates
podman images | grep wolfguard-site

# Rebuild with latest packages
make build-no-cache
```

### Clean Up Old Resources

```bash
# Remove unused images
podman image prune -a

# Remove unused volumes
podman volume prune

# Remove unused networks
podman network prune
```

## Security Considerations

### Applied Security Measures

- **Container**: Non-root user (uid 1001), read-only filesystem
- **Capabilities**: All dropped except CHOWN, SETGID, SETUID, NET_BIND_SERVICE
- **Resources**: CPU limit 2.0, Memory limit 512M
- **Headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- **Rate limiting**: 100 req/s, burst 50
- **TLS**: TLS 1.2+ only, modern cipher suites

### Additional Recommendations

1. **Firewall**: Only allow ports 80, 443 externally
2. **Fail2ban**: Monitor Nginx logs for attacks
3. **Monitoring**: Set up alerts for container restarts
4. **Backups**: Backup configuration files regularly

## Performance Tuning

### Nginx Optimization

Already applied in `nginx.conf`:
- Gzip compression (level 6)
- Static file caching (1 year)
- Worker processes optimized
- Keepalive connections

### Container Resources

Adjust in `compose.prod.yaml` if needed:

```yaml
deploy:
  resources:
    limits:
      cpus: '4.0'      # Increase for high traffic
      memory: 1024M    # Increase if OOM errors
    reservations:
      cpus: '1.0'
      memory: 256M
```

## URLs

- **Production**: https://wolfguard.io
- **www**: https://www.wolfguard.io
- **GitHub**: https://github.com/dantte-lp/wolfguard-site
- **Main Project**: https://github.com/dantte-lp/wolfguard

---

**Last Updated**: 2025-10-29
**Maintainer**: WolfGuard Team
