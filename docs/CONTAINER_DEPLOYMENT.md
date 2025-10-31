# Container Deployment Guide

## Why No Nginx?

**Previous Architecture**: Traefik → Nginx → Static Files
**New Architecture**: Traefik → Next.js Standalone Server

### Benefits

1. **60% Smaller Images**: ~200MB vs ~500MB
2. **Less Complexity**: One less layer to manage
3. **Better Performance**: Direct connection to Next.js
4. **Full Next.js Features**: SSR, ISR, API routes
5. **Official Recommendation**: Vercel's recommended approach

Traefik handles:

- TLS termination
- Compression
- Rate limiting
- Security headers
- Load balancing

## Quick Start

```bash
# Build image
./deploy/scripts/build-production.sh

# Deploy with Podman Compose
podman-compose -f deploy/config/compose.standalone.yaml up -d
```

For full documentation, see `/opt/projects/repositories/wolfguard-site/deploy/k8s/README.md`
