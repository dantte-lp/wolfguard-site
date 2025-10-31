# WolfGuard Website - Ansible Deployment

This directory contains Ansible playbooks for deploying the WolfGuard website to production servers.

## Prerequisites

- Ansible 2.9 or higher
- Podman installed on target servers
- Access to GitHub Container Registry (for pulling images)
- Traefik reverse proxy configured and running

## Files

- `deploy.yml` - Main deployment playbook
- `inventory.yml` - Server inventory configuration
- `README.md` - This file

## Usage

### Basic Deployment

Deploy to localhost (default):

```bash
ansible-playbook -i inventory.yml deploy.yml
```

### Deploy with Variables

Override default variables:

```bash
ansible-playbook -i inventory.yml deploy.yml \
  -e "container_image=ghcr.io/dantte-lp/wolfguard-site:v1.0.0" \
  -e "domain=wolfguard.io"
```

### Deploy to Remote Server

Update `inventory.yml` to include remote servers:

```yaml
all:
  children:
    web_servers:
      hosts:
        production-server:
          ansible_host: 192.168.1.100
          ansible_user: deploy
          ansible_ssh_private_key_file: ~/.ssh/id_rsa
```

Then deploy:

```bash
ansible-playbook -i inventory.yml deploy.yml
```

### Deployment with GitHub Actions

This playbook is automatically executed by the CD pipeline in `.github/workflows/cd.yml` when changes are pushed to the main branch.

## Variables

### Default Variables

- `container_name`: wolfguard-site
- `container_image`: ghcr.io/dantte-lp/wolfguard-site:latest
- `container_port`: 3000
- `traefik_network`: traefik-network
- `domain`: wolfguard.io

### Override Variables

You can override any variable using `-e` flag:

```bash
ansible-playbook -i inventory.yml deploy.yml \
  -e "container_port=8080" \
  -e "domain=staging.wolfguard.io"
```

## Deployment Process

The playbook performs the following steps:

1. Ensures Podman is installed
2. Logs into GitHub Container Registry (if credentials available)
3. Pulls the latest container image
4. Stops and removes existing container
5. Creates Traefik network if needed
6. Deploys new container with Traefik labels
7. Waits for container to be ready
8. Verifies container status
9. Cleans up old images

## Traefik Integration

The container is automatically configured with Traefik labels for:

- Automatic HTTPS with Let's Encrypt
- Domain routing (wolfguard.io)
- Load balancing
- Service discovery

## Rollback

To rollback to a previous version:

```bash
ansible-playbook -i inventory.yml deploy.yml \
  -e "container_image=ghcr.io/dantte-lp/wolfguard-site:PREVIOUS_TAG"
```

## Troubleshooting

### Check container logs

```bash
podman logs wolfguard-site
```

### Check container status

```bash
podman ps -a | grep wolfguard-site
```

### Manual container restart

```bash
podman restart wolfguard-site
```

### Verify Traefik routing

```bash
curl -H "Host: wolfguard.io" http://localhost
```

## Security Notes

- GitHub Container Registry credentials are passed via environment variables
- Container runs as non-root user (nextjs:nodejs)
- Automatic security updates via Let's Encrypt
- Network isolation via Podman networks

## Support

For issues or questions:

- GitHub Issues: https://github.com/dantte-lp/wolfguard-site/issues
- Documentation: https://docs.wolfguard.io
