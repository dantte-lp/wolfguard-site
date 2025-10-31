# Kubernetes Deployment for WolfGuard Site

This directory contains Kubernetes manifests for deploying WolfGuard Site with Traefik Ingress Controller.

## Prerequisites

- Kubernetes cluster (1.24+)
- kubectl configured to access your cluster
- Traefik 2.x installed as Ingress Controller with CRD support
- DNS records pointing to your cluster:
  - `wolfguard.io` → Cluster LoadBalancer IP
  - `www.wolfguard.io` → Cluster LoadBalancer IP

## Architecture

```
Internet
    ↓
Traefik Ingress (HTTPS with Let's Encrypt)
    ↓
Traefik Middlewares (Security Headers, Compression, Rate Limiting)
    ↓
Service (ClusterIP)
    ↓
Deployment (2+ replicas with HPA)
    ↓
Pods (Next.js Standalone Server on port 3000)
```

## Components

### Core Resources

1. **Namespace** (`wolfguard-site`)
   - Isolates all resources

2. **ConfigMap** (`wolfguard-site-config`)
   - Environment variables for Next.js

3. **Deployment** (`wolfguard-site`)
   - 2 replicas (minimum) with rolling updates
   - Health checks (liveness, readiness, startup)
   - Security context (non-root, read-only filesystem)
   - Resource limits (CPU: 100m-500m, Memory: 128Mi-512Mi)

4. **Service** (`wolfguard-site`)
   - ClusterIP type
   - Exposes port 80, targets pod port 3000

### Traefik Resources

5. **IngressRoute** (`wolfguard-site-https`)
   - HTTPS traffic (port 443)
   - Hosts: `wolfguard.io`, `www.wolfguard.io`
   - TLS with Let's Encrypt automatic certificate
   - Middlewares: security-headers, compression, rate-limit

6. **IngressRoute** (`wolfguard-site-http`)
   - HTTP traffic (port 80)
   - Redirects to HTTPS

7. **Middlewares**
   - `https-redirect`: Redirects HTTP to HTTPS
   - `security-headers`: HSTS, CSP, X-Frame-Options, etc.
   - `compression`: Gzip compression
   - `rate-limit`: 100 req/s average, 200 burst

### Scaling & Resilience

8. **HorizontalPodAutoscaler**
   - Min: 2 replicas
   - Max: 10 replicas
   - Scales based on CPU (70%) and Memory (80%)

9. **PodDisruptionBudget**
   - Ensures at least 1 pod remains during disruptions
   - Protects against complete service outages during updates

## Deployment Instructions

### 1. Build and Push Image

First, build the production image:

```bash
# From project root
./deploy/scripts/build-production.sh

# Tag for your registry
podman tag localhost/wolfguard-site:latest your-registry.com/wolfguard-site:latest

# Push to registry
podman push your-registry.com/wolfguard-site:latest
```

### 2. Update Image Reference

Edit `deployment.yaml` and update the image:

```yaml
containers:
  - name: wolfguard-site
    image: your-registry.com/wolfguard-site:latest # Update this
```

### 3. Deploy to Kubernetes

```bash
# Apply all manifests
kubectl apply -f deploy/k8s/deployment.yaml

# Verify deployment
kubectl get all -n wolfguard-site

# Check pods are running
kubectl get pods -n wolfguard-site

# Check ingress routes
kubectl get ingressroute -n wolfguard-site
```

### 4. Verify DNS

Ensure DNS is configured:

```bash
# Check A records
dig wolfguard.io
dig www.wolfguard.io

# Both should point to your cluster's LoadBalancer IP
```

### 5. Test Access

```bash
# HTTP should redirect to HTTPS
curl -I http://wolfguard.io

# HTTPS should work
curl -I https://wolfguard.io

# Check certificate
curl -vI https://wolfguard.io 2>&1 | grep -i "subject:"
```

## Configuration

### Environment Variables

Edit the ConfigMap to change environment variables:

```bash
kubectl edit configmap wolfguard-site-config -n wolfguard-site
```

Available variables:

- `NODE_ENV`: Set to "production"
- `NEXT_TELEMETRY_DISABLED`: Disable Next.js telemetry
- `PORT`: Application port (3000)
- `HOSTNAME`: Bind address (0.0.0.0)
- `TZ`: Timezone (UTC)

### Resource Limits

Adjust resources in the Deployment:

```yaml
resources:
  requests:
    memory: '128Mi' # Guaranteed memory
    cpu: '100m' # Guaranteed CPU
  limits:
    memory: '512Mi' # Maximum memory
    cpu: '500m' # Maximum CPU
```

### Scaling Configuration

#### Manual Scaling

```bash
# Scale to 5 replicas
kubectl scale deployment wolfguard-site -n wolfguard-site --replicas=5
```

#### Autoscaling Configuration

Edit HPA in `deployment.yaml`:

```yaml
spec:
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70 # Scale when CPU > 70%
```

### TLS/SSL Configuration

The IngressRoute uses Traefik's Let's Encrypt cert resolver:

```yaml
tls:
  certResolver: letsencrypt # Must match your Traefik config
  domains:
    - main: wolfguard.io
      sans:
        - www.wolfguard.io
```

Ensure your Traefik deployment has the cert resolver configured:

```yaml
# In Traefik StaticConfiguration
certificatesResolvers:
  letsencrypt:
    acme:
      email: your-email@example.com
      storage: /data/acme.json
      httpChallenge:
        entryPoint: web
```

## Monitoring

### View Logs

```bash
# All pods
kubectl logs -n wolfguard-site -l app.kubernetes.io/name=wolfguard-site --tail=100 -f

# Specific pod
kubectl logs -n wolfguard-site <pod-name> -f
```

### Check Pod Status

```bash
# Describe deployment
kubectl describe deployment wolfguard-site -n wolfguard-site

# Describe pods
kubectl describe pods -n wolfguard-site

# Get events
kubectl get events -n wolfguard-site --sort-by='.lastTimestamp'
```

### Check HPA Status

```bash
# Get HPA metrics
kubectl get hpa -n wolfguard-site

# Describe HPA
kubectl describe hpa wolfguard-site -n wolfguard-site
```

### Check Ingress

```bash
# Get IngressRoutes
kubectl get ingressroute -n wolfguard-site

# Describe IngressRoute
kubectl describe ingressroute wolfguard-site-https -n wolfguard-site
```

## Updating

### Rolling Update

```bash
# Update image
kubectl set image deployment/wolfguard-site \
  wolfguard-site=your-registry.com/wolfguard-site:v1.1.0 \
  -n wolfguard-site

# Watch rollout status
kubectl rollout status deployment/wolfguard-site -n wolfguard-site
```

### Rollback

```bash
# View rollout history
kubectl rollout history deployment/wolfguard-site -n wolfguard-site

# Rollback to previous version
kubectl rollout undo deployment/wolfguard-site -n wolfguard-site

# Rollback to specific revision
kubectl rollout undo deployment/wolfguard-site -n wolfguard-site --to-revision=2
```

## Troubleshooting

### Pods Not Starting

```bash
# Check pod status
kubectl get pods -n wolfguard-site

# Describe pod
kubectl describe pod <pod-name> -n wolfguard-site

# Check logs
kubectl logs <pod-name> -n wolfguard-site
```

Common issues:

- Image pull errors: Check image name and registry credentials
- CrashLoopBackOff: Check application logs
- Resource limits: Pods may be OOMKilled if memory limits are too low

### Ingress Not Working

```bash
# Check Traefik is running
kubectl get pods -n traefik

# Check IngressRoute
kubectl describe ingressroute wolfguard-site-https -n wolfguard-site

# Check Traefik logs
kubectl logs -n traefik -l app.kubernetes.io/name=traefik
```

Common issues:

- DNS not configured: Check A records
- Cert resolver not found: Check Traefik configuration
- Wrong cert resolver name: Update IngressRoute

### Performance Issues

```bash
# Check resource usage
kubectl top pods -n wolfguard-site

# Check HPA status
kubectl get hpa -n wolfguard-site

# Check if pods are being throttled
kubectl describe pod <pod-name> -n wolfguard-site | grep -i throttl
```

## Security Considerations

### Security Features Enabled

- ✅ Non-root user (UID 1001)
- ✅ Read-only root filesystem
- ✅ No privilege escalation
- ✅ Dropped all capabilities
- ✅ Seccomp profile (RuntimeDefault)
- ✅ Security headers (HSTS, CSP, X-Frame-Options)
- ✅ Rate limiting (100 req/s)
- ✅ HTTPS only (HTTP redirects to HTTPS)

### Security Best Practices

1. **Use Image Digests**: Pin images to specific digests instead of tags
2. **Scan Images**: Use tools like Trivy to scan for vulnerabilities
3. **Network Policies**: Add NetworkPolicy to restrict pod-to-pod communication
4. **Secret Management**: Use Kubernetes Secrets or external secret managers
5. **RBAC**: Implement least-privilege RBAC for service accounts
6. **Pod Security Standards**: Enable restricted pod security admission

## Backup and Restore

### Backup

```bash
# Export all resources
kubectl get all,configmap,ingressroute,middleware,hpa,pdb \
  -n wolfguard-site -o yaml > wolfguard-site-backup.yaml
```

### Restore

```bash
# Restore from backup
kubectl apply -f wolfguard-site-backup.yaml
```

## Clean Up

```bash
# Delete all resources
kubectl delete -f deploy/k8s/deployment.yaml

# Or delete namespace (removes everything)
kubectl delete namespace wolfguard-site
```

## Additional Resources

- [Traefik Kubernetes CRD](https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

---

For questions or issues, please open a GitHub issue.
