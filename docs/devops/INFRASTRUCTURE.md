# WolfGuard Website - Infrastructure Guide

Complete infrastructure documentation for the WolfGuard website deployment.

## Infrastructure Overview

The WolfGuard website infrastructure uses modern container technology and automation:

- **Container Runtime**: Podman (rootless, daemonless)
- **Container Builder**: Buildah
- **Image Registry**: GitHub Container Registry (GHCR)
- **Reverse Proxy**: Traefik v3.0+
- **Deployment Automation**: Ansible
- **CI/CD**: GitHub Actions with self-hosted runners
- **Monitoring**: Podman stats, container logs

## Server Configuration

### Production Server

- **Hostname**: wolfguard.io
- **OS**: Oracle Linux 9 / RHEL 9
- **Location**: /opt/projects/repositories/wolfguard-site
- **Container Name**: wolfguard-site
- **Network**: traefik-network
- **Port**: 3000 (internal)
- **Domain**: wolfguard.io (HTTPS via Traefik)

### System Requirements

- **CPU**: 2 cores minimum, 4 cores recommended
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 20GB minimum, 50GB recommended
- **Network**: Public IPv4/IPv6, ports 80/443 open

## Network Architecture

```
Internet
    ↓
[Firewall: 80/443]
    ↓
[Traefik Reverse Proxy]
    ├── Let's Encrypt (HTTPS)
    ├── Load Balancing
    └── Service Discovery
        ↓
[traefik-network]
    ↓
[wolfguard-site container]
    └── Next.js (Port 3000)
```

### Network Configuration

```bash
# Create Traefik network
podman network create traefik-network

# List networks
podman network ls

# Inspect network
podman network inspect traefik-network
```

## Container Registry

### GitHub Container Registry (GHCR)

Images are stored in GitHub Container Registry:

- **Registry**: ghcr.io
- **Repository**: ghcr.io/dantte-lp/wolfguard-site
- **Tags**: latest, git commit SHA, version tags

### Authentication

```bash
# Login to GHCR
echo "${GITHUB_TOKEN}" | buildah login ghcr.io -u ${GITHUB_USER} --password-stdin

# Verify login
podman login ghcr.io
```

### Image Management

```bash
# Pull image
podman pull ghcr.io/dantte-lp/wolfguard-site:latest

# List local images
podman images | grep wolfguard-site

# Remove old images
podman image prune -f

# Tag image
podman tag wolfguard-site:latest ghcr.io/dantte-lp/wolfguard-site:v1.0.0

# Push image
podman push ghcr.io/dantte-lp/wolfguard-site:v1.0.0
```

## Traefik Configuration

### Traefik Location

Traefik is running in: `/opt/projects/repositories/traefik`

### Service Discovery

The container uses Traefik labels for automatic configuration:

```yaml
labels:
  # Enable Traefik
  traefik.enable: 'true'

  # Router configuration
  traefik.http.routers.wolfguard-site.rule: 'Host(`wolfguard.io`)'
  traefik.http.routers.wolfguard-site.entrypoints: 'websecure'

  # TLS configuration
  traefik.http.routers.wolfguard-site.tls: 'true'
  traefik.http.routers.wolfguard-site.tls.certresolver: 'letsencrypt'

  # Service configuration
  traefik.http.services.wolfguard-site.loadbalancer.server.port: '3000'
```

### Certificate Management

Traefik automatically manages Let's Encrypt certificates:

- **Provider**: Let's Encrypt
- **Challenge**: HTTP-01 or TLS-ALPN-01
- **Auto-renewal**: Yes
- **Certificate storage**: Traefik acme.json

## CI/CD Pipeline

### GitHub Actions Workflows

#### CI Workflow (`.github/workflows/ci.yml`)

Runs on every pull request:

1. Code quality checks (ESLint, Prettier, TypeScript)
2. Security audit (npm audit)
3. Production build test
4. Bundle size analysis

#### CD Workflow (`.github/workflows/cd.yml`)

Runs on push to main/master:

1. Build production bundle
2. Build container with Buildah
3. Push to GitHub Container Registry
4. Deploy with Ansible
5. Health checks
6. Deployment notification

### Self-Hosted Runners

Runners are located in: `/opt/projects/repositories/self-hosted-runners`

```bash
# Check runner status
cd /opt/projects/repositories/self-hosted-runners
./check-runners.sh

# View runner logs
journalctl -u github-runner -f
```

## Deployment Automation

### Ansible Playbooks

Located in: `deploy/ansible/`

- **deploy.yml** - Main deployment playbook
- **inventory.yml** - Server inventory
- **README.md** - Deployment documentation

### Deployment Process

```bash
# Manual deployment
cd deploy/ansible
ansible-playbook -i inventory.yml deploy.yml

# Deploy specific version
ansible-playbook -i inventory.yml deploy.yml \
  -e "container_image=ghcr.io/dantte-lp/wolfguard-site:v1.0.0"
```

### Deployment Steps (Automated)

1. Ensure Podman is installed
2. Login to container registry
3. Pull latest image
4. Stop existing container
5. Remove old container
6. Create/verify Traefik network
7. Deploy new container
8. Wait for container readiness
9. Verify container status
10. Clean up old images

## Monitoring and Logging

### Container Monitoring

```bash
# Container status
podman ps | grep wolfguard-site

# Resource usage
podman stats wolfguard-site

# Container health
podman healthcheck run wolfguard-site

# Detailed inspection
podman inspect wolfguard-site
```

### Log Management

```bash
# View logs
podman logs -f wolfguard-site

# Last N lines
podman logs --tail 100 wolfguard-site

# Since timestamp
podman logs --since 1h wolfguard-site

# Export logs
podman logs wolfguard-site > wolfguard-site.log
```

### Health Checks

```bash
# HTTP health check
curl -f http://localhost:3000

# HTTPS health check
curl -f https://wolfguard.io

# Response time check
time curl -s -o /dev/null https://wolfguard.io
```

## Backup and Disaster Recovery

### Container Backup

```bash
# Export container
podman export wolfguard-site > wolfguard-site-backup.tar

# Save image
podman save ghcr.io/dantte-lp/wolfguard-site:latest -o image-backup.tar

# Backup volumes (if any)
podman volume export volume_name > volume-backup.tar
```

### Recovery Procedures

```bash
# Restore from image backup
podman load -i image-backup.tar

# Restore from container backup
podman import wolfguard-site-backup.tar wolfguard-site:restored

# Redeploy from registry
podman pull ghcr.io/dantte-lp/wolfguard-site:latest
ansible-playbook -i deploy/ansible/inventory.yml deploy/ansible/deploy.yml
```

### Rollback to Previous Version

```bash
# Find previous version
podman images | grep wolfguard-site

# Deploy specific version
ansible-playbook -i deploy/ansible/inventory.yml deploy/ansible/deploy.yml \
  -e "container_image=ghcr.io/dantte-lp/wolfguard-site:COMMIT_SHA"
```

## Security Configuration

### Container Security

- **Non-root user**: Container runs as nextjs:nodejs (uid 1001)
- **Read-only root**: Filesystem mounted read-only where possible
- **Dropped capabilities**: Unnecessary Linux capabilities removed
- **No privilege escalation**: no-new-privileges flag set
- **Network isolation**: Dedicated Podman networks
- **Rootless Podman**: No root daemon required

### Firewall Configuration

```bash
# Allow HTTP/HTTPS
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

# Check rules
firewall-cmd --list-all
```

### SELinux Configuration

```bash
# Check SELinux status
getenforce

# Allow Podman to bind ports
setsebool -P container_manage_cgroup on

# Check for denials
ausearch -m avc -ts recent | grep podman
```

## Performance Tuning

### Container Resources

Set resource limits in Ansible playbook:

```yaml
# Memory limit
memory: 1g
memory_reservation: 512m

# CPU limit
cpus: 2
```

### Image Optimization

- Multi-stage builds for minimal size
- Alpine Linux base for security
- Standalone Next.js output
- No unnecessary dependencies

### Network Performance

- HTTP/2 enabled in Traefik
- Gzip compression enabled
- Static asset caching
- CDN integration (if needed)

## Maintenance Procedures

### Regular Maintenance

```bash
# Update system packages
sudo dnf update -y

# Update Podman
sudo dnf update -y podman buildah skopeo

# Clean up images
podman image prune -a -f

# Clean up volumes
podman volume prune -f

# Clean up networks
podman network prune -f
```

### Security Updates

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Rebuild and redeploy
npm run build
buildah bud -t wolfguard-site:latest .
ansible-playbook -i deploy/ansible/inventory.yml deploy/ansible/deploy.yml
```

### Certificate Renewal

Traefik handles automatic renewal, but to verify:

```bash
# Check certificate expiry
echo | openssl s_client -connect wolfguard.io:443 -servername wolfguard.io 2>/dev/null | openssl x509 -noout -dates

# Force renewal (restart Traefik)
podman restart traefik
```

## Troubleshooting

### Common Issues

#### Container Won't Start

```bash
# Check logs
podman logs wolfguard-site

# Inspect configuration
podman inspect wolfguard-site

# Verify image
podman images | grep wolfguard-site
```

#### Network Issues

```bash
# Check network connectivity
podman exec wolfguard-site ping -c 3 8.8.8.8

# Verify network attachment
podman network inspect traefik-network | grep wolfguard-site
```

#### Traefik Not Routing

```bash
# Check Traefik logs
podman logs traefik | grep wolfguard-site

# Verify labels
podman inspect wolfguard-site | grep -A 10 Labels

# Test direct access
curl http://localhost:3000
```

## Documentation References

- [Podman Documentation](https://docs.podman.io/)
- [Buildah Documentation](https://buildah.io/)
- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Ansible Documentation](https://docs.ansible.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Documentation](https://nextjs.org/docs)

## Support and Contact

For infrastructure issues:

- GitHub Issues: https://github.com/dantte-lp/wolfguard-site/issues
- Documentation: https://docs.wolfguard.io
- DevOps Guide: docs/devops/DEPLOYMENT.md
