# Traefik Integration for WolfGuard Site

This directory contains Traefik reverse proxy configuration files for deploying the WolfGuard website with SSL/TLS termination, security headers, and production-ready features.

## Overview

The WolfGuard site can be deployed with Traefik in two ways:

1. **Global Traefik Instance** (Recommended): Integrate with an existing Traefik instance managing multiple services
2. **Standalone Traefik**: Run a dedicated Traefik instance for the WolfGuard site only

## Directory Structure

```
deploy/traefik/
├── README.md                    # This file
├── dynamic/
│   └── wolfguard-site.yaml     # Dynamic Traefik configuration for WolfGuard
├── traefik-compose.yaml         # Standalone Traefik service (optional)
└── .env.example                 # Environment variables template
```

## Prerequisites

- Podman or Docker installed
- Domain name configured (e.g., `wolfguard.io`)
- DNS records pointing to your server
- Traefik network created: `podman network create traefik-public`

## Quick Start

### Option 1: Use Global Traefik Instance (Recommended)

If you already have a Traefik instance running (e.g., at `/opt/projects/repositories/traefik`):

1. **Add the dynamic configuration** to your global Traefik setup:

```bash
# Copy the dynamic configuration to your Traefik config directory
cp /opt/projects/repositories/wolfguard-site/deploy/traefik/dynamic/wolfguard-site.yaml \
   /opt/projects/repositories/traefik/config/dynamic-wolfguard.yaml
```

2. **Update Traefik to watch this file** (if not already configured):

Edit your global `traefik.yml` to include:

```yaml
providers:
  file:
    directory: /config
    watch: true
```

3. **Deploy the WolfGuard site**:

```bash
cd /opt/projects/repositories/wolfguard-site
podman-compose -f deploy/config/compose.prod.yaml up -d
```

The WolfGuard site will automatically be discovered by Traefik via Docker labels in `compose.prod.yaml`.

### Option 2: Standalone Traefik

If you don't have a global Traefik instance:

1. **Configure environment variables**:

```bash
cd /opt/projects/repositories/wolfguard-site/deploy/traefik
cp .env.example .env
# Edit .env with your settings (domain, email, etc.)
nano .env
```

2. **Start Traefik and WolfGuard site**:

```bash
# Start Traefik
podman-compose -f traefik-compose.yaml up -d

# Start WolfGuard site
cd /opt/projects/repositories/wolfguard-site
podman-compose -f deploy/config/compose.prod.yaml up -d
```

## Configuration Details

### Domain Configuration

The WolfGuard site is configured for:

- Primary domain: `wolfguard.io`
- Alternate domain: `www.wolfguard.io`

To use a different domain, update:

1. Traefik labels in `/opt/projects/repositories/wolfguard-site/deploy/config/compose.prod.yaml`
2. Dynamic configuration in `dynamic/wolfguard-site.yaml`

### SSL/TLS Certificates

The configuration supports multiple certificate resolvers:

**Let's Encrypt (HTTP Challenge)**:

```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@example.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: http
```

**Cloudflare DNS Challenge** (for wildcard certificates):

```yaml
certificatesResolvers:
  cloudflare:
    acme:
      email: admin@example.com
      storage: /letsencrypt/acme.json
      dnsChallenge:
        provider: cloudflare
environment:
  - CF_API_EMAIL=admin@example.com
  - CF_DNS_API_TOKEN=your_token_here
```

### Security Features

The configuration includes:

- **HTTPS Redirect**: All HTTP traffic automatically redirected to HTTPS
- **Security Headers**: HSTS, CSP, X-Frame-Options, etc.
- **TLS 1.2/1.3**: Modern cipher suites only
- **Rate Limiting**: DDoS protection (100 req/s standard)
- **Compression**: Gzip/Brotli for optimal performance
- **Health Checks**: Automatic service health monitoring

### Middleware Stack

The `web-standard@file` middleware chain includes:

- `security-headers`: OWASP-recommended security headers
- `compression`: Response compression for performance
- `rate-limit-standard`: DDoS protection (100 req/s average, 50 burst)

To use stricter middleware, change the label in `compose.prod.yaml`:

```yaml
- 'traefik.http.routers.wolfguard.middlewares=web-strict@file'
```

## Environment Variables

Create a `.env` file with the following variables:

```bash
# Domain Configuration
DOMAIN=wolfguard.io
WWW_DOMAIN=www.wolfguard.io

# SSL Configuration
SSL_EMAIL=admin@wolfguard.io
CERT_RESOLVER=letsencrypt

# Cloudflare (if using DNS challenge)
CF_API_EMAIL=admin@example.com
CF_DNS_API_TOKEN=your_cloudflare_token

# Network
TRAEFIK_NETWORK=traefik-public

# Build Metadata
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
GIT_COMMIT=$(git rev-parse --short HEAD)
```

## Networking

### Traefik Network

Create the shared network (if not exists):

```bash
podman network create traefik-public
```

### Firewall Rules

Ensure ports are open:

```bash
# UFW
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## Monitoring & Logs

### View Traefik Dashboard

If dashboard is enabled, access at: `https://traefik.yourdomain.com/dashboard/`

### View Container Logs

```bash
# WolfGuard site logs
podman logs -f wolfguard-site

# Traefik logs
podman logs -f traefik
```

### Health Check

Test the health endpoint:

```bash
curl http://localhost:8080/health
# or via Traefik
curl https://wolfguard.io/health
```

## Troubleshooting

### Certificate Issues

```bash
# Check Traefik logs for ACME errors
podman logs traefik | grep -i acme

# Verify DNS records
dig wolfguard.io
dig www.wolfguard.io

# Check certificate file permissions
ls -la /path/to/letsencrypt/acme.json
# Should be 600
```

### Connection Issues

```bash
# Check if containers are on the same network
podman network inspect traefik-public

# Verify Traefik can reach the backend
podman exec traefik wget -O- http://wolfguard-site:8080/health

# Check Traefik routing
podman exec traefik traefik healthcheck
```

### Rate Limiting

If legitimate traffic is being rate-limited, adjust in `dynamic/wolfguard-site.yaml`:

```yaml
middlewares:
  rate-limit-custom:
    rateLimit:
      average: 200 # Increase from 100
      period: 1s
      burst: 100 # Increase from 50
```

## Production Checklist

- [ ] Domain DNS records configured (A/AAAA)
- [ ] Firewall rules allow ports 80, 443
- [ ] Traefik network created
- [ ] Environment variables configured (.env)
- [ ] SSL email address set correctly
- [ ] Health check endpoint responding
- [ ] Security headers validated
- [ ] HTTPS redirect working
- [ ] Certificate auto-renewal tested
- [ ] Monitoring/alerts configured
- [ ] Backup strategy in place

## Advanced Configuration

### Custom Middleware

Add custom middleware in `dynamic/wolfguard-site.yaml`:

```yaml
http:
  middlewares:
    custom-headers:
      headers:
        customResponseHeaders:
          X-Custom-Header: 'value'
```

Then reference in compose labels:

```yaml
- 'traefik.http.routers.wolfguard.middlewares=web-standard@file,custom-headers@file'
```

### Multiple Domains

To serve on additional domains:

```yaml
- 'traefik.http.routers.wolfguard.rule=Host(`wolfguard.io`) || Host(`www.wolfguard.io`) || Host(`wolfguard.com`)'
```

### IP Whitelisting

Restrict access to specific IPs:

```yaml
middlewares:
  ip-whitelist:
    ipWhiteList:
      sourceRange:
        - '192.168.1.0/24'
        - '10.0.0.0/8'
```

## Integration with CI/CD

Example GitHub Actions workflow excerpt:

```yaml
- name: Deploy to Production
  run: |
    ssh user@server << 'EOF'
      cd /opt/projects/repositories/wolfguard-site
      git pull
      podman-compose -f deploy/config/compose.prod.yaml build
      podman-compose -f deploy/config/compose.prod.yaml up -d
    EOF
```

## References

- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Let's Encrypt](https://letsencrypt.org/)
- [WolfGuard Technical Specs](/opt/projects/repositories/wolfguard-site/docs/TECHNICAL_SPECIFICATIONS_FOR_WEBSITE_DEVELOPMENT.md)
- [Deployment Guide](/opt/projects/repositories/wolfguard-site/docs/DEPLOYMENT.md)

## Support

For issues specific to WolfGuard site deployment:

- GitHub Issues: https://github.com/dantte-lp/wolfguard-site/issues
- Documentation: https://docs.wolfguard.io

For Traefik-specific issues:

- Traefik Community: https://community.traefik.io/
- Traefik Documentation: https://doc.traefik.io/
