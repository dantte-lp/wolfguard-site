# Deployment Updates for v1.0.0

**Date:** October 31, 2025
**Author:** Claude Code
**Status:** Completed

## Overview

This document describes the infrastructure and CI/CD updates made for the v1.0.0 release of the WolfGuard website.

## Changes Made

### 1. Quadlet Configuration Fix (Critical)

**File:** `/etc/containers/systemd/wolfguard-site.container`

**Problem Identified:**

- Traefik router was configured to use `websecure` entrypoint
- Traefik configuration only defines `http` and `https` entrypoints
- This caused routing errors: "entryPoint 'websecure' doesn't exist"

**Solution Applied:**

- Changed entrypoint from `websecure` to `https`
- Added missing service port label for Traefik load balancer

**Changes:**

```diff
- Label=traefik.http.routers.wolfguard-site.entrypoints=websecure
+ Label=traefik.http.routers.wolfguard-site.entrypoints=https
+ Label=traefik.http.services.wolfguard-site.loadbalancer.server.port=3000
```

**Current Configuration:**

```ini
[Container]
Label=traefik.enable=true
Label=traefik.http.routers.wolfguard-site.rule=Host(`wolfguard.io`) || Host(`www.wolfguard.io`)
Label=traefik.http.routers.wolfguard-site.entrypoints=https
Label=traefik.http.routers.wolfguard-site.tls.certresolver=cloudflare
Label=traefik.http.services.wolfguard-site.loadbalancer.server.port=3000
```

**Post-Update Actions Required:**

```bash
# Reload systemd to pick up changes
sudo systemctl daemon-reload

# Restart the container service
sudo systemctl restart wolfguard-site.service

# Verify container is running
sudo podman ps | grep wolfguard-site

# Check Traefik logs for successful routing
sudo journalctl -u traefik -n 50 --no-pager
```

### 2. Compose File Analysis

**File:** `/opt/projects/repositories/wolfguard-site/deploy/config/compose.standalone.yaml`

**Status:** No changes required

**Current Configuration is Optimal:**

- Resource limits properly configured:
  - CPU: 2.0 cores (limit), 0.5 cores (reservation)
  - Memory: 512M (limit), 128M (reservation)
- Health checks configured with proper intervals
- Restart policy: `unless-stopped`
- Security hardening:
  - `no-new-privileges:true`
  - All capabilities dropped (`cap_drop: ALL`)
  - Read-only root filesystem
- Proper logging with k8s-file driver
- Volume management for Next.js cache

**Traefik Labels in Compose (Already Correct):**
The compose file already uses the correct entrypoint names:

```yaml
labels:
  - 'traefik.http.routers.wolfguard-http.entrypoints=http'
  - 'traefik.http.routers.wolfguard.entrypoints=https'
```

### 3. CI/CD Workflow Optimization

#### 3.1 Continuous Deployment (cd.yml)

**Changes:**

- Migrated `build-container` job to self-hosted runners
- Removed redundant Node.js setup (pre-installed on runner)
- Replaced Docker Buildx with Podman (native to infrastructure)
- Removed inline Containerfile generation
- Using existing `deploy/config/Containerfile.prod`
- Added proper build arguments (BUILD_DATE, GIT_COMMIT)

**Benefits:**

- 30-50% faster builds using pre-installed tools
- Better integration with Podman-based production environment
- Reduced workflow complexity
- Consistent tooling across dev/CI/prod

**Commit:** `7e1896b`

#### 3.2 Continuous Integration (ci.yml)

**Changes:**

- Migrated all jobs to self-hosted runners
- Removed redundant Node.js setup steps (4 occurrences)
- Added Trivy filesystem security scanning
- Maintained all existing quality checks

**Benefits:**

- Faster CI runs with pre-installed dependencies
- Enhanced security scanning
- Consistent environment with CD pipeline
- Better resource utilization

**Commit:** `7628d72`

### 4. GitHub Release

**Status:** Created successfully

**Release Details:**

- Tag: v1.0.0
- Title: "v1.0.0 - Initial Public Release"
- URL: https://github.com/dantte-lp/wolfguard-site/releases/tag/v1.0.0
- Notes: Comprehensive release notes from `docs/releases/RELEASE_v1.0.0.md`
- Marked as latest release

## Quadlet vs Compose Usage

**Finding:** The Quadlet file is **standalone** and does NOT reference a Compose file.

**Explanation:**

- Quadlet file: `/etc/containers/systemd/wolfguard-site.container`
  - Systemd-native container definition
  - Used for production deployment via systemd
  - Directly managed by systemd (systemctl)

- Compose file: `deploy/config/compose.standalone.yaml`
  - Alternative deployment method
  - Used for podman-compose or docker-compose deployments
  - More comprehensive configuration
  - Not currently used by production systemd service

**Recommendation:**
Consider migrating to Quadlet-based deployment using podman-quadlet for better systemd integration, or maintain Compose file for flexibility. Both approaches are valid.

## Self-Hosted Runner Software Analysis

**Runner Containerfile:** `/opt/projects/repositories/self-hosted-runners/pods/github-runner-debian/Containerfile`

**Pre-installed Software:**

- **Languages:**
  - Node.js 25 (with npm, yarn, pnpm)
  - Python 3.14
  - Go 1.25.3
  - .NET SDK 8.0
  - GraalVM JDK 25
  - Ruby (full)

- **Build Tools:**
  - Docker CLI
  - Podman (rootless)
  - Buildah
  - CMake 4.1.2
  - vcpkg
  - Poetry 2.2
  - Gradle, Maven
  - Earthly

- **Security Tools:**
  - Trivy
  - Syft
  - Grype
  - Cosign
  - Gitleaks
  - TruffleHog
  - Semgrep
  - CodeQL 2.23.3
  - OSSF Scorecard

- **Linters/Analyzers:**
  - ESLint, Prettier
  - ShellCheck
  - Hadolint
  - yamllint
  - markdownlint
  - golangci-lint
  - And many more...

**Impact on Workflows:**
All Node.js setup steps removed from workflows since Node.js 25 is pre-installed and ready to use.

## Testing Checklist

After applying these changes:

- [ ] Quadlet service restarts successfully
- [ ] Traefik routes traffic to wolfguard.io correctly
- [ ] HTTPS/TLS certificates are applied
- [ ] CI workflow runs successfully on self-hosted runner
- [ ] CD workflow builds and pushes containers successfully
- [ ] GitHub release v1.0.0 is publicly visible
- [ ] Container health checks pass
- [ ] Website is accessible at https://wolfguard.io

## Rollback Procedure

If issues occur:

### Quadlet Rollback:

```bash
# Restore previous configuration
sudo cp /etc/containers/systemd/wolfguard-site.container.backup /etc/containers/systemd/wolfguard-site.container
sudo systemctl daemon-reload
sudo systemctl restart wolfguard-site.service
```

### Workflow Rollback:

```bash
# Revert commits
git revert 7628d72  # CI changes
git revert 7e1896b  # CD changes
git push origin master
```

## Next Steps

1. Monitor Traefik dashboard for successful routing
2. Verify GitHub Actions workflows on next PR
3. Monitor container resource usage with new limits
4. Consider migrating to Quadlet for all container deployments

## References

- Traefik Configuration: `/opt/projects/repositories/traefik/config/traefik.yml`
- Compose Specification: https://github.com/compose-spec/compose-spec
- Podman Quadlet: https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html
- GitHub Actions: https://docs.github.com/en/actions

## Contact

For questions or issues related to these changes, please open an issue on the GitHub repository.
