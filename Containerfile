# syntax=docker/dockerfile:1.4
# Multi-stage Containerfile for WolfGuard static site
# Built with Buildah, runs with Podman + crun runtime

# ==============================================================================
# Stage 1: Build Stage
# ==============================================================================
FROM docker.io/library/node:22-trixie-slim AS builder

# OCI Labels - Build Stage
LABEL org.opencontainers.image.title="WolfGuard Site Builder"
LABEL org.opencontainers.image.description="Build stage for WolfGuard static site"
LABEL org.opencontainers.image.vendor="WolfGuard"

# Set working directory
WORKDIR /build

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first (layer caching optimization)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false --ignore-scripts

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Verify build output
RUN ls -la /build/dist/ && \
    test -f /build/dist/index.html || (echo "Build failed: index.html not found" && exit 1)

# ==============================================================================
# Stage 2: Production Runtime Stage
# ==============================================================================
FROM docker.io/library/nginx:1.27-alpine AS runtime

# OCI Labels - Production Stage
LABEL org.opencontainers.image.title="WolfGuard Site"
LABEL org.opencontainers.image.description="WolfGuard landing page - Static site served with Nginx"
LABEL org.opencontainers.image.vendor="WolfGuard"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/wolfguard/wolfguard-site"
LABEL org.opencontainers.image.documentation="https://github.com/wolfguard/wolfguard-site/README.md"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.revision="${GIT_COMMIT}"

# Install security updates
RUN apk upgrade --no-cache && \
    apk add --no-cache \
    ca-certificates \
    tzdata \
    && rm -rf /var/cache/apk/*

# Create non-root user for Nginx
RUN addgroup -g 1001 -S nginx-user && \
    adduser -u 1001 -S nginx-user -G nginx-user

# Create necessary directories with correct permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run && \
    chown -R nginx-user:nginx-user /var/cache/nginx /var/log/nginx /var/run && \
    chmod -R 755 /var/cache/nginx /var/log/nginx /var/run

# Remove default Nginx configuration
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY --chown=nginx-user:nginx-user nginx.conf /etc/nginx/nginx.conf

# Copy built static files from builder stage
COPY --from=builder --chown=nginx-user:nginx-user /build/dist /usr/share/nginx/html

# Verify static files
RUN ls -la /usr/share/nginx/html/ && \
    test -f /usr/share/nginx/html/index.html || (echo "Runtime error: index.html not found" && exit 1)

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Switch to non-root user
USER nginx-user

# Expose port 8080 (non-privileged port)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
