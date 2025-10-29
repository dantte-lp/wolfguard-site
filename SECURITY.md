# Security Architecture - WolfGuard Site

Comprehensive security documentation for the WolfGuard Podman deployment.

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 5: Application Security (Nginx + React)              │
│  - Security headers (CSP, X-Frame-Options, etc.)             │
│  - HTTPS/TLS via Traefik                                     │
│  - SPA security best practices                               │
├─────────────────────────────────────────────────────────────┤
│  Layer 4: Container Runtime Security                         │
│  - Read-only root filesystem                                 │
│  - Non-root user (uid 1001)                                  │
│  - Dropped capabilities (cap_drop: ALL)                      │
│  - no-new-privileges flag                                    │
├─────────────────────────────────────────────────────────────┤
│  Layer 3: Podman Security                                    │
│  - Rootless containers                                       │
│  - User namespaces                                           │
│  - crun runtime (secure, fast)                               │
│  - seccomp profiles                                          │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: Network Security                                   │
│  - Isolated container network                                │
│  - No privileged ports (8080 instead of 80)                  │
│  - Traefik reverse proxy (TLS termination)                   │
│  - Rate limiting (via Traefik)                               │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: Host Security                                      │
│  - SELinux enforcement                                       │
│  - Firewall (firewalld)                                      │
│  - Minimal attack surface                                    │
└─────────────────────────────────────────────────────────────┘
```

## Container Security Hardening

### 1. Non-Root User

**Implementation in Containerfile:**
```dockerfile
# Create non-root user
RUN addgroup -g 1001 -S nginx-user && \
    adduser -u 1001 -S nginx-user -G nginx-user

# Set ownership
RUN chown -R nginx-user:nginx-user /var/cache/nginx /var/log/nginx

# Switch to non-root
USER nginx-user
```

**Verification:**
```bash
podman exec wolfguard-site id
# Expected: uid=1001(nginx-user) gid=1001(nginx-user)
```

**Why it matters:**
- Prevents privilege escalation attacks
- Limits damage if container is compromised
- Follows principle of least privilege

### 2. Dropped Capabilities

**Implementation in compose.yaml:**
```yaml
cap_drop:
  - ALL
cap_add:
  - CHOWN        # Change file ownership
  - SETGID       # Set group ID
  - SETUID       # Set user ID
  - NET_BIND_SERVICE  # Bind to ports < 1024 (not used, but kept for compatibility)
```

**Why it matters:**
- Removes all Linux capabilities by default
- Only grants minimal required capabilities
- Prevents kernel exploits via capabilities

**Verification:**
```bash
podman inspect wolfguard-site --format '{{.EffectiveCaps}}'
```

### 3. Read-Only Root Filesystem

**Implementation in compose.yaml:**
```yaml
read_only: true

tmpfs:
  - /var/cache/nginx:uid=1001,gid=1001,mode=1777
  - /var/run:uid=1001,gid=1001,mode=1777
  - /tmp:uid=1001,gid=1001,mode=1777
```

**Why it matters:**
- Prevents malware from modifying system files
- Limits attacker persistence
- Forces immutable infrastructure

**Trade-offs:**
- Nginx needs writable directories for cache and PID
- Solution: tmpfs mounts for ephemeral data

**Verification:**
```bash
# Try to write to root filesystem (should fail)
podman exec wolfguard-site touch /test
# Expected: touch: cannot touch '/test': Read-only file system

# Verify tmpfs mounts
podman exec wolfguard-site df -h | grep tmpfs
```

### 4. Security Options

**Implementation in compose.yaml:**
```yaml
security_opt:
  - no-new-privileges:true
```

**Why it matters:**
- Prevents setuid binaries from gaining elevated privileges
- Blocks privilege escalation attacks
- Hardens against container breakout attempts

**Verification:**
```bash
podman inspect wolfguard-site --format '{{.HostConfig.SecurityOpt}}'
```

### 5. Resource Limits

**Implementation in compose.yaml:**
```yaml
deploy:
  resources:
    limits:
      cpus: '2.0'
      memory: 512M
```

**Why it matters:**
- Prevents resource exhaustion attacks (DoS)
- Limits blast radius of compromised container
- Ensures fair resource allocation

**Monitoring:**
```bash
# Real-time resource usage
podman stats wolfguard-site

# Historical usage
podman inspect wolfguard-site --format '{{json .HostConfig.Memory}}'
```

## Nginx Security Configuration

### 1. Security Headers

**Implementation in nginx.conf:**
```nginx
# Prevent clickjacking
add_header X-Frame-Options "SAMEORIGIN" always;

# Prevent MIME type sniffing
add_header X-Content-Type-Options "nosniff" always;

# Enable XSS protection
add_header X-XSS-Protection "1; mode=block" always;

# Control referrer information
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Restrict feature access
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self';" always;
```

**Testing:**
```bash
curl -I http://localhost:8080 | grep -E "(X-Frame|X-Content|X-XSS|Referrer|Content-Security)"
```

**Online Scanners:**
- https://securityheaders.com
- https://observatory.mozilla.org

### 2. Content Security Policy (CSP)

**Current Policy:**
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self';
frame-ancestors 'self';
```

**Customize for your app:**
```nginx
# Stricter CSP (recommended for production)
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https://cdn.example.com; font-src 'self'; connect-src 'self' https://api.example.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" always;
```

**Testing CSP:**
```bash
# Check CSP violations in browser console
# Chrome DevTools > Console > Filter: "Content Security Policy"
```

### 3. TLS/HTTPS Configuration

**Via Traefik (Production):**
```yaml
labels:
  - "traefik.http.routers.wolfguard.tls.certresolver=cloudflare"
  - "traefik.http.routers.wolfguard.tls.options=modern@file"
```

**TLS Best Practices:**
- TLS 1.2 minimum (TLS 1.3 recommended)
- Strong cipher suites only
- HSTS enabled
- Certificate pinning (optional)

**Verify TLS:**
```bash
# Test TLS configuration
curl -v https://wolfguard.infra4.dev 2>&1 | grep -E "(TLS|SSL)"

# Check SSL Labs rating
# https://www.ssllabs.com/ssltest/analyze.html?d=wolfguard.infra4.dev
```

### 4. Hidden Information

**Implementation in nginx.conf:**
```nginx
# Hide Nginx version
server_tokens off;
```

**Why it matters:**
- Reduces information disclosure
- Makes version-specific attacks harder
- Security through obscurity (defense in depth)

**Verification:**
```bash
curl -I http://localhost:8080 | grep Server
# Expected: Server: nginx (no version)
```

## Podman Rootless Security

### User Namespaces

**Check rootless mode:**
```bash
podman info --format '{{.Host.Security.Rootless}}'
# Expected: true
```

**Verify UID mapping:**
```bash
# Host perspective
podman top wolfguard-site user huser

# Container perspective
podman exec wolfguard-site id
```

**Why it matters:**
- Container root (uid 0) maps to unprivileged host user
- Even if attacker escapes container, limited host access
- Significantly reduces attack surface

### SELinux Integration

**Check SELinux status:**
```bash
getenforce
# Expected: Enforcing
```

**Podman SELinux context:**
```bash
ps -eZ | grep podman
# Expected: system_u:system_r:container_runtime_t:s0
```

**Container process context:**
```bash
podman exec wolfguard-site cat /proc/self/attr/current
# Expected: system_u:system_r:container_t:s0:c123,c456
```

**Why it matters:**
- Mandatory Access Control (MAC)
- Enforces security policies at kernel level
- Prevents unauthorized access even if DAC bypassed

### Seccomp Profiles

**Default seccomp profile:**
```bash
podman inspect wolfguard-site --format '{{.HostConfig.SecurityOpt}}'
```

**Custom seccomp (if needed):**
```yaml
security_opt:
  - seccomp=/path/to/seccomp-profile.json
```

**Why it matters:**
- Filters system calls available to container
- Blocks dangerous syscalls (e.g., kernel module loading)
- Reduces kernel attack surface

## Network Security

### 1. Port Binding

**Development (localhost only):**
```yaml
ports:
  - "127.0.0.1:8080:8080"  # Only accessible from localhost
```

**Production (via Traefik):**
```yaml
# No port binding - Traefik handles external access
networks:
  - traefik-public
```

**Why it matters:**
- Limits exposure to local machine (dev)
- Centralizes access control (Traefik in prod)
- Prevents direct internet exposure

### 2. Network Isolation

**Implementation:**
```yaml
networks:
  traefik-public:
    external: true
```

**Verify isolation:**
```bash
# List container networks
podman inspect wolfguard-site --format '{{json .NetworkSettings.Networks}}' | python3 -m json.tool

# List containers on network
podman network inspect traefik-public
```

**Why it matters:**
- Containers can only communicate via designated networks
- Prevents lateral movement in multi-container setups
- Enforces network segmentation

### 3. Rate Limiting (via Traefik)

**Traefik middleware (dynamic.yml):**
```yaml
http:
  middlewares:
    rate-limit:
      rateLimit:
        average: 100
        burst: 200
        period: 1m
```

**Apply to WolfGuard:**
```yaml
labels:
  - "traefik.http.routers.wolfguard.middlewares=rate-limit@file"
```

**Why it matters:**
- Prevents brute force attacks
- Mitigates DDoS attempts
- Protects against resource exhaustion

## Image Security

### 1. Base Image Selection

**Current choice: nginx:1.27-alpine**

**Why Alpine:**
- Minimal attack surface (~5MB vs ~100MB)
- Fewer packages = fewer vulnerabilities
- Fast security updates
- Official image from Docker Hub

**Verify image:**
```bash
podman inspect docker.io/library/nginx:1.27-alpine --format '{{.RepoDigests}}'
```

### 2. Multi-Stage Build

**Benefits:**
- Build dependencies NOT in production image
- Final image only contains runtime files
- Smaller image = faster deployment, fewer vulnerabilities

**Size comparison:**
```bash
# Builder stage (not in final image)
node:22-alpine: ~140MB

# Final image
nginx:1.27-alpine: ~43MB
+ React build output: ~2-5MB
= Total: ~45-48MB
```

### 3. Image Scanning

**Scan for vulnerabilities:**
```bash
# Using Trivy
trivy image localhost/wolfguard-site:latest

# Using Podman/Buildah
podman scout cves localhost/wolfguard-site:latest
```

**Automate scanning in CI/CD:**
```yaml
# .gitlab-ci.yml
security-scan:
  stage: test
  script:
    - trivy image --severity HIGH,CRITICAL localhost/wolfguard-site:latest
```

### 4. Image Signing (Optional)

**Sign image with Sigstore:**
```bash
# Sign image
cosign sign localhost/wolfguard-site:latest

# Verify signature
cosign verify localhost/wolfguard-site:latest
```

**Why it matters:**
- Ensures image authenticity
- Prevents supply chain attacks
- Proves image provenance

## Runtime Security

### 1. Health Checks

**Implementation:**
```yaml
healthcheck:
  test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8080/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

**Why it matters:**
- Detects compromised/malfunctioning containers
- Enables automatic recovery (restart)
- Prevents routing traffic to unhealthy instances

### 2. Logging and Monitoring

**Access logs:**
```bash
podman logs wolfguard-site | grep -E "(404|500|error)"
```

**Monitor for suspicious activity:**
- High error rates
- Unusual request patterns
- Unexpected file access attempts
- Resource spikes

**Log retention:**
```yaml
logging:
  options:
    max-size: "50m"
    max-file: "5"
```

### 3. Automatic Updates

**Watchtower-style updates:**
```bash
#!/bin/bash
# update-wolfguard.sh

# Pull latest image
podman pull localhost/wolfguard-site:latest

# Recreate container
podman-compose -f compose.prod.yaml up -d --force-recreate

# Prune old images
podman image prune -f
```

**Schedule with systemd timer or cron:**
```bash
# Weekly updates
0 2 * * 0 /opt/scripts/update-wolfguard.sh
```

## Incident Response

### 1. Container Compromise Detection

**Signs of compromise:**
- Unexpected processes running
- High CPU/memory usage
- Unusual network connections
- Modified files (if read-only bypassed)

**Investigation:**
```bash
# List processes
podman top wolfguard-site

# Check network connections
podman exec wolfguard-site netstat -tunlp

# Review logs
podman logs wolfguard-site --since 24h | grep -E "(error|warning|suspicious)"

# Check filesystem changes (if not read-only)
podman diff wolfguard-site
```

### 2. Response Procedure

**Immediate actions:**
1. Isolate container
   ```bash
   podman network disconnect traefik-public wolfguard-site
   ```

2. Stop container (preserve state)
   ```bash
   podman stop wolfguard-site
   ```

3. Export container for analysis
   ```bash
   podman export wolfguard-site -o wolfguard-forensics.tar
   ```

4. Deploy clean container
   ```bash
   make clean
   make deploy
   ```

5. Investigate root cause
   - Review logs
   - Analyze exported container
   - Check for application vulnerabilities
   - Review access logs from Traefik

### 3. Post-Incident

**Hardening checklist:**
- [ ] Update all dependencies
- [ ] Patch application vulnerabilities
- [ ] Review and tighten CSP
- [ ] Enable additional logging
- [ ] Implement stricter rate limiting
- [ ] Review access controls (Traefik)
- [ ] Update incident response playbook

## Security Checklist

### Pre-Deployment

- [ ] Scan image for vulnerabilities
- [ ] Verify non-root user (uid 1001)
- [ ] Confirm read-only root filesystem
- [ ] Check all capabilities dropped except essentials
- [ ] Validate security headers in nginx.conf
- [ ] Test CSP doesn't break functionality
- [ ] Ensure no secrets in image/environment
- [ ] Verify TLS configuration (production)
- [ ] Enable SELinux enforcement
- [ ] Configure resource limits

### Post-Deployment

- [ ] Verify container running as non-root
- [ ] Test security headers: `curl -I https://wolfguard.infra4.dev`
- [ ] Check SSL Labs rating (A+ expected)
- [ ] Monitor logs for errors
- [ ] Verify health checks passing
- [ ] Test rate limiting (if configured)
- [ ] Confirm network isolation
- [ ] Set up log aggregation
- [ ] Schedule automatic updates
- [ ] Document incident response procedures

### Ongoing Maintenance

- [ ] Weekly: Review logs for anomalies
- [ ] Monthly: Scan images for new vulnerabilities
- [ ] Quarterly: Review and update security policies
- [ ] Annually: Full security audit

## Security Tools

### Recommended Tools

**Container Scanning:**
- Trivy: https://github.com/aquasecurity/trivy
- Clair: https://github.com/quay/clair
- Grype: https://github.com/anchore/grype

**Runtime Security:**
- Falco: https://falco.org/
- Tracee: https://github.com/aquasecurity/tracee

**Network Security:**
- Traefik: https://traefik.io/
- ModSecurity: https://modsecurity.org/

**Compliance:**
- Docker Bench for Security (adapted for Podman)
- CIS Benchmarks

## Compliance Standards

**Applicable standards:**
- OWASP Top 10
- CIS Docker/Podman Benchmarks
- NIST 800-190 (Container Security)
- PCI DSS (if applicable)
- GDPR (data handling)

## References

**Official Documentation:**
- Podman Security: https://docs.podman.io/en/latest/markdown/podman-run.1.html#security-options
- Linux Capabilities: https://man7.org/linux/man-pages/man7/capabilities.7.html
- SELinux: https://www.redhat.com/en/topics/linux/what-is-selinux
- Nginx Security: https://nginx.org/en/docs/http/ngx_http_ssl_module.html

**Security Resources:**
- OWASP: https://owasp.org/
- CIS Benchmarks: https://www.cisecurity.org/cis-benchmarks/
- NIST: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-190.pdf
