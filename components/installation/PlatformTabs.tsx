'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, Tab, Card, CardBody } from '@heroui/react'
import { Monitor, Container } from 'lucide-react'

export function PlatformTabs() {
  const [selected, setSelected] = useState('linux')

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Tabs
        aria-label="Installation platforms"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        color="primary"
        variant="underlined"
        classNames={{
          tabList: 'gap-6 w-full',
          cursor: 'w-full bg-primary',
          tab: 'max-w-fit px-4 h-12',
          tabContent: 'group-data-[selected=true]:text-primary',
        }}
      >
        <Tab
          key="linux"
          title={
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span className="font-semibold">Linux</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6">Linux Installation</h2>
              <div className="space-y-8 text-muted-foreground">
                <div>
                  <p className="leading-relaxed mb-4">
                    WolfGuard server is designed to run natively on Linux, providing optimal
                    performance and security. Follow the steps below to install and configure
                    WolfGuard on your Linux system.
                  </p>
                </div>

                {/* System Requirements */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">System Requirements</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Minimum Requirements:</p>
                      <ul className="space-y-1 pl-6 list-disc">
                        <li>Linux kernel 5.4 or newer (5.10+ recommended)</li>
                        <li>1 CPU core, 512MB RAM (2GB+ recommended for production)</li>
                        <li>50MB disk space for binaries</li>
                        <li>TUN/TAP kernel module support</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Build Dependencies:</p>
                      <ul className="space-y-1 pl-6 list-disc">
                        <li>GCC 11+ or Clang 15+ (C23 support required)</li>
                        <li>CMake 3.20 or newer</li>
                        <li>Git</li>
                        <li>pkg-config</li>
                        <li>OpenSSL development libraries (or wolfSSL)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Install Dependencies */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    1. Install Dependencies
                  </h3>
                  <p className="mb-3">
                    Install the required build tools and dependencies for your distribution:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Ubuntu/Debian:</p>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`sudo apt update
sudo apt install -y build-essential cmake git pkg-config \\
  libssl-dev libtool autoconf automake`}
                        </code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">RHEL/Fedora:</p>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`sudo dnf groupinstall "Development Tools"
sudo dnf install -y cmake git pkg-config openssl-devel \\
  libtool autoconf automake`}
                        </code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Arch Linux:</p>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`sudo pacman -S base-devel cmake git pkg-config openssl`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Build from Source */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">2. Build from Source</h3>
                  <p className="mb-3">Clone the repository and build WolfGuard:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Clone the repository
git clone https://github.com/dantte-lp/wolfguard.git
cd wolfguard

# Create build directory
mkdir build && cd build

# Configure with CMake
cmake -DCMAKE_BUILD_TYPE=Release \\
      -DCMAKE_INSTALL_PREFIX=/usr/local \\
      -DENABLE_WOLFSSL=ON \\
      -DENABLE_WOLFSENTRY=ON \\
      ..

# Build (use all available cores)
make -j$(nproc)

# Install (requires root)
sudo make install`}
                    </code>
                  </pre>
                </div>

                {/* Create User and Directories */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    3. Create User and Directories
                  </h3>
                  <p className="mb-3">
                    Create a dedicated system user for running WolfGuard with minimal privileges:
                  </p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Create wolfguard system user
sudo useradd -r -s /sbin/nologin -d /var/lib/wolfguard wolfguard

# Create required directories
sudo mkdir -p /etc/wolfguard
sudo mkdir -p /var/lib/wolfguard
sudo mkdir -p /var/log/wolfguard

# Set ownership
sudo chown -R wolfguard:wolfguard /var/lib/wolfguard
sudo chown -R wolfguard:wolfguard /var/log/wolfguard
sudo chmod 750 /etc/wolfguard`}
                    </code>
                  </pre>
                </div>

                {/* Configuration */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">4. Configuration</h3>
                  <p className="mb-3">
                    Create the main configuration file at{' '}
                    <code className="text-primary font-mono text-sm">
                      /etc/wolfguard/wolfguard.conf
                    </code>
                    :
                  </p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# WolfGuard Server Configuration

[server]
listen_address = 0.0.0.0
listen_port = 443
protocol = anyconnect

[tls]
certificate = /etc/wolfguard/certs/server.crt
private_key = /etc/wolfguard/certs/server.key
ca_certificate = /etc/wolfguard/certs/ca.crt
min_version = TLS1.3

[dtls]
enabled = true
port = 443
min_version = DTLS1.3

[vpn]
network = 10.10.0.0/24
dns_servers = 8.8.8.8,8.8.4.4
split_tunneling = true

[auth]
method = certificate
# alternative: password, radius, ldap

[logging]
level = info
file = /var/log/wolfguard/wolfguard.log

[wolfsentry]
enabled = true
rules_file = /etc/wolfguard/wolfsentry-rules.conf`}
                    </code>
                  </pre>
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-foreground">
                      <strong>Note:</strong> You&apos;ll need to generate TLS certificates. For
                      testing, you can use self-signed certificates. For production, use
                      certificates from a trusted CA or Let&apos;s Encrypt.
                    </p>
                  </div>
                </div>

                {/* Generate Certificates */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    5. Generate Certificates (Testing)
                  </h3>
                  <p className="mb-3">For testing purposes, generate self-signed certificates:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Create certificates directory
sudo mkdir -p /etc/wolfguard/certs
cd /etc/wolfguard/certs

# Generate CA certificate
sudo openssl req -x509 -newkey rsa:4096 -days 365 -nodes \\
  -keyout ca.key -out ca.crt \\
  -subj "/CN=WolfGuard CA"

# Generate server certificate
sudo openssl req -newkey rsa:4096 -nodes \\
  -keyout server.key -out server.csr \\
  -subj "/CN=vpn.example.com"

# Sign server certificate with CA
sudo openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key \\
  -CAcreateserial -out server.crt -days 365

# Set permissions
sudo chown -R wolfguard:wolfguard /etc/wolfguard/certs
sudo chmod 600 /etc/wolfguard/certs/*.key`}
                    </code>
                  </pre>
                </div>

                {/* Systemd Service */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    6. Systemd Service Configuration
                  </h3>
                  <p className="mb-3">
                    Create a systemd service file at{' '}
                    <code className="text-primary font-mono text-sm">
                      /etc/systemd/system/wolfguard.service
                    </code>
                    :
                  </p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`[Unit]
Description=WolfGuard VPN Server
After=network-online.target
Wants=network-online.target

[Service]
Type=notify
User=wolfguard
Group=wolfguard
ExecStart=/usr/local/bin/wolfguard -c /etc/wolfguard/wolfguard.conf
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
RestartSec=5s

# Security hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/wolfguard /var/log/wolfguard
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target`}
                    </code>
                  </pre>
                  <p className="mt-3 mb-3">Enable and start the service:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Reload systemd
sudo systemctl daemon-reload

# Enable WolfGuard to start on boot
sudo systemctl enable wolfguard

# Start WolfGuard
sudo systemctl start wolfguard

# Check status
sudo systemctl status wolfguard`}
                    </code>
                  </pre>
                </div>

                {/* Firewall Configuration */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    7. Firewall Configuration
                  </h3>
                  <p className="mb-3">
                    Open the required ports for WolfGuard. The server needs port 443 for both TCP
                    (TLS) and UDP (DTLS):
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">UFW (Ubuntu):</p>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`sudo ufw allow 443/tcp comment 'WolfGuard TLS'
sudo ufw allow 443/udp comment 'WolfGuard DTLS'
sudo ufw reload`}
                        </code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">
                        firewalld (RHEL/Fedora):
                      </p>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=443/udp
sudo firewall-cmd --reload`}
                        </code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">iptables:</p>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 443 -j ACCEPT
sudo iptables-save | sudo tee /etc/iptables/rules.v4`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Verification */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">8. Verification</h3>
                  <p className="mb-3">Verify that WolfGuard is running correctly:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Check service status
sudo systemctl status wolfguard

# View logs
sudo journalctl -u wolfguard -f

# Check listening ports
sudo ss -tulpn | grep wolfguard

# Test TLS connection (should see TLS handshake)
openssl s_client -connect localhost:443 -showcerts`}
                    </code>
                  </pre>
                </div>

                {/* Next Steps */}
                <div className="mt-6 p-6 bg-primary/10 border border-primary/30 rounded-lg">
                  <h3 className="text-lg font-bold text-foreground mb-3">Next Steps</h3>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>
                      Configure clients to connect to your WolfGuard server (see{' '}
                      <a href="/compatibility" className="text-primary hover:underline">
                        Compatibility
                      </a>{' '}
                      page)
                    </li>
                    <li>
                      Review the{' '}
                      <a
                        href="https://docs.wolfguard.io"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        full documentation
                      </a>{' '}
                      for advanced configuration
                    </li>
                    <li>Set up user authentication (certificates, RADIUS, or LDAP)</li>
                    <li>Configure split tunneling and routing policies</li>
                    <li>Enable wolfSentry IDPS for enhanced security</li>
                    <li>Monitor logs and set up log rotation</li>
                  </ul>
                </div>

                {/* Support */}
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-foreground">Need Help?</strong> Visit the{' '}
                    <a
                      href="https://github.com/dantte-lp/wolfguard/issues"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Issues
                    </a>{' '}
                    page or check the{' '}
                    <a
                      href="https://docs.wolfguard.io"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      documentation
                    </a>{' '}
                    for troubleshooting guides.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="container"
          title={
            <div className="flex items-center gap-2">
              <Container className="w-4 h-4" />
              <span className="font-semibold">Container</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6">Container Deployment</h2>
              <div className="space-y-8 text-muted-foreground">
                <div>
                  <p className="leading-relaxed mb-4">
                    Deploy WolfGuard using Podman or Docker containers for simplified deployment and
                    management. This is the{' '}
                    <strong className="text-foreground">recommended approach</strong> for production
                    environments.
                  </p>
                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <p className="text-sm text-foreground font-semibold mb-2">
                      ✅ Why Container Deployment?
                    </p>
                    <ul className="text-sm space-y-1 pl-6 list-disc">
                      <li>Pre-configured environment with all dependencies</li>
                      <li>Consistent deployment across different systems</li>
                      <li>Easy version updates and rollbacks</li>
                      <li>Simplified backup and disaster recovery</li>
                      <li>Integration with orchestration tools</li>
                    </ul>
                  </div>
                </div>

                {/* Prerequisites */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Prerequisites</h3>
                  <p className="mb-3">Choose your container runtime:</p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Podman (Recommended):</p>
                      <ul className="space-y-1 pl-6 list-disc mb-3">
                        <li>Rootless containers with enhanced security</li>
                        <li>Docker-compatible CLI</li>
                        <li>No daemon requirement</li>
                        <li>Native systemd integration</li>
                      </ul>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`# Ubuntu/Debian
sudo apt update && sudo apt install -y podman podman-compose

# RHEL/Fedora
sudo dnf install -y podman podman-compose

# Arch Linux
sudo pacman -S podman podman-compose`}
                        </code>
                      </pre>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Docker (Alternative):</p>
                      <ul className="space-y-1 pl-6 list-disc mb-3">
                        <li>Wide ecosystem support</li>
                        <li>Familiar tooling</li>
                      </ul>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`# Install Docker Engine
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install -y docker-compose-plugin`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Quick Start - Podman */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Quick Start with Podman
                  </h3>
                  <p className="mb-3">Run WolfGuard with a single command:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Pull the official image
podman pull ghcr.io/dantte-lp/wolfguard:latest

# Create volumes for persistent data
podman volume create wolfguard-config
podman volume create wolfguard-certs
podman volume create wolfguard-logs

# Run WolfGuard
podman run -d \\
  --name wolfguard \\
  --cap-add=NET_ADMIN \\
  --cap-add=NET_BIND_SERVICE \\
  -p 443:443/tcp \\
  -p 443:443/udp \\
  -v wolfguard-config:/etc/wolfguard:Z \\
  -v wolfguard-certs:/etc/wolfguard/certs:Z \\
  -v wolfguard-logs:/var/log/wolfguard:Z \\
  --restart unless-stopped \\
  ghcr.io/dantte-lp/wolfguard:latest`}
                    </code>
                  </pre>
                </div>

                {/* Quick Start - Docker */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Quick Start with Docker
                  </h3>
                  <p className="mb-3">Alternative Docker command:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Pull and run with Docker
docker run -d \\
  --name wolfguard \\
  --cap-add=NET_ADMIN \\
  --cap-add=NET_BIND_SERVICE \\
  -p 443:443/tcp \\
  -p 443:443/udp \\
  -v wolfguard-config:/etc/wolfguard \\
  -v wolfguard-certs:/etc/wolfguard/certs \\
  -v wolfguard-logs:/var/log/wolfguard \\
  --restart unless-stopped \\
  ghcr.io/dantte-lp/wolfguard:latest`}
                    </code>
                  </pre>
                </div>

                {/* Podman Compose Setup */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Production Setup with Compose
                  </h3>
                  <p className="mb-3">
                    For production deployments, use Podman Compose or Docker Compose. Create a{' '}
                    <code className="text-primary font-mono text-sm">compose.yaml</code> file:
                  </p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`version: '3.8'

services:
  wolfguard:
    image: ghcr.io/dantte-lp/wolfguard:latest
    container_name: wolfguard-vpn
    restart: unless-stopped

    # Security capabilities
    cap_add:
      - NET_ADMIN           # Required for VPN tunnel
      - NET_BIND_SERVICE    # Bind to port 443

    # Network configuration
    ports:
      - "443:443/tcp"       # TLS 1.3
      - "443:443/udp"       # DTLS 1.3

    # Volume mounts
    volumes:
      - ./config:/etc/wolfguard:ro              # Read-only config
      - ./certs:/etc/wolfguard/certs:ro         # Read-only certificates
      - wolfguard-data:/var/lib/wolfguard       # Server state
      - wolfguard-logs:/var/log/wolfguard       # Logs

    # Environment variables
    environment:
      - WOLFGUARD_LOG_LEVEL=info
      - WOLFGUARD_MAX_CLIENTS=100
      - WOLFGUARD_ENABLE_WOLFSENTRY=true
      - TZ=UTC

    # Health check
    healthcheck:
      test: ["CMD", "wolfguard-health", "--check"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

    # Resource limits (optional)
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M

volumes:
  wolfguard-data:
    driver: local
  wolfguard-logs:
    driver: local`}
                    </code>
                  </pre>
                  <p className="mt-3 mb-3">Deploy with Compose:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Using Podman Compose
podman-compose up -d

# Using Docker Compose
docker compose up -d

# View logs
podman-compose logs -f wolfguard
# or
docker compose logs -f wolfguard

# Stop and remove
podman-compose down
# or
docker compose down`}
                    </code>
                  </pre>
                </div>

                {/* Configuration Files */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Configuration Files</h3>
                  <p className="mb-3">
                    Create the configuration directory structure with your settings:
                  </p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Create directory structure
mkdir -p config certs

# Create wolfguard.conf in ./config/
cat > config/wolfguard.conf << 'EOF'
[server]
listen_address = 0.0.0.0
listen_port = 443
protocol = anyconnect

[tls]
certificate = /etc/wolfguard/certs/server.crt
private_key = /etc/wolfguard/certs/server.key
ca_certificate = /etc/wolfguard/certs/ca.crt
min_version = TLS1.3

[dtls]
enabled = true
port = 443
min_version = DTLS1.3

[vpn]
network = 10.10.0.0/24
dns_servers = 1.1.1.1,8.8.8.8
split_tunneling = true

[auth]
method = certificate

[logging]
level = info
file = /var/log/wolfguard/wolfguard.log

[wolfsentry]
enabled = true
rules_file = /etc/wolfguard/wolfsentry-rules.conf
EOF

# Generate certificates (see Linux tab for detailed steps)
# or copy your existing certificates to ./certs/

# Set proper permissions
chmod 600 config/wolfguard.conf
chmod 644 certs/*.crt
chmod 600 certs/*.key`}
                    </code>
                  </pre>
                </div>

                {/* Environment Variables */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Environment Variables</h3>
                  <p className="mb-3">
                    Available environment variables for container configuration:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-black/40">
                        <tr>
                          <th className="px-4 py-2 text-left text-foreground font-semibold">
                            Variable
                          </th>
                          <th className="px-4 py-2 text-left text-foreground font-semibold">
                            Default
                          </th>
                          <th className="px-4 py-2 text-left text-foreground font-semibold">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        <tr className="border-t border-muted/20">
                          <td className="px-4 py-2 text-primary">WOLFGUARD_CONFIG</td>
                          <td className="px-4 py-2">/etc/wolfguard/wolfguard.conf</td>
                          <td className="px-4 py-2">Path to configuration file</td>
                        </tr>
                        <tr className="border-t border-muted/20">
                          <td className="px-4 py-2 text-primary">WOLFGUARD_LOG_LEVEL</td>
                          <td className="px-4 py-2">info</td>
                          <td className="px-4 py-2">Logging level (debug, info, warn, error)</td>
                        </tr>
                        <tr className="border-t border-muted/20">
                          <td className="px-4 py-2 text-primary">WOLFGUARD_MAX_CLIENTS</td>
                          <td className="px-4 py-2">100</td>
                          <td className="px-4 py-2">Maximum concurrent VPN clients</td>
                        </tr>
                        <tr className="border-t border-muted/20">
                          <td className="px-4 py-2 text-primary">WOLFGUARD_ENABLE_WOLFSENTRY</td>
                          <td className="px-4 py-2">true</td>
                          <td className="px-4 py-2">Enable wolfSentry IDPS protection</td>
                        </tr>
                        <tr className="border-t border-muted/20">
                          <td className="px-4 py-2 text-primary">TZ</td>
                          <td className="px-4 py-2">UTC</td>
                          <td className="px-4 py-2">Container timezone</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Networking */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Network Configuration</h3>
                  <p className="mb-3">
                    For advanced networking or integration with existing infrastructure:
                  </p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Create custom network
podman network create --driver bridge wolfguard-net

# Run with custom network
podman run -d \\
  --name wolfguard \\
  --network wolfguard-net \\
  --cap-add=NET_ADMIN \\
  --cap-add=NET_BIND_SERVICE \\
  -p 443:443/tcp \\
  -p 443:443/udp \\
  ghcr.io/dantte-lp/wolfguard:latest

# For host network mode (advanced)
podman run -d \\
  --name wolfguard \\
  --network host \\
  --cap-add=NET_ADMIN \\
  ghcr.io/dantte-lp/wolfguard:latest`}
                    </code>
                  </pre>
                </div>

                {/* Traefik Integration */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Traefik Integration</h3>
                  <p className="mb-3">
                    Integrate with Traefik reverse proxy for automatic TLS and routing:
                  </p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`version: '3.8'

services:
  wolfguard:
    image: ghcr.io/dantte-lp/wolfguard:latest
    container_name: wolfguard-vpn
    restart: unless-stopped

    cap_add:
      - NET_ADMIN
      - NET_BIND_SERVICE

    networks:
      - traefik_proxy

    labels:
      # Enable Traefik
      - "traefik.enable=true"

      # TLS router
      - "traefik.tcp.routers.wolfguard-tls.rule=HostSNI(\`vpn.example.com\`)"
      - "traefik.tcp.routers.wolfguard-tls.entrypoints=https"
      - "traefik.tcp.routers.wolfguard-tls.service=wolfguard-tls"
      - "traefik.tcp.services.wolfguard-tls.loadbalancer.server.port=443"

      # DTLS router
      - "traefik.udp.routers.wolfguard-dtls.entrypoints=dtls"
      - "traefik.udp.routers.wolfguard-dtls.service=wolfguard-dtls"
      - "traefik.udp.services.wolfguard-dtls.loadbalancer.server.port=443"

    volumes:
      - ./config:/etc/wolfguard:ro
      - ./certs:/etc/wolfguard/certs:ro
      - wolfguard-data:/var/lib/wolfguard
      - wolfguard-logs:/var/log/wolfguard

networks:
  traefik_proxy:
    external: true

volumes:
  wolfguard-data:
  wolfguard-logs:`}
                    </code>
                  </pre>
                </div>

                {/* Building Custom Images */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Building Custom Container Images
                  </h3>
                  <p className="mb-3">Build your own image from source:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Clone the repository
git clone https://github.com/dantte-lp/wolfguard.git
cd wolfguard

# Build with Buildah (Podman ecosystem)
buildah bud -t localhost/wolfguard:custom -f Containerfile .

# Or build with Docker
docker build -t wolfguard:custom -f Containerfile .

# Run your custom image
podman run -d \\
  --name wolfguard-custom \\
  --cap-add=NET_ADMIN \\
  --cap-add=NET_BIND_SERVICE \\
  -p 443:443/tcp \\
  -p 443:443/udp \\
  localhost/wolfguard:custom`}
                    </code>
                  </pre>
                </div>

                {/* Health Checks and Monitoring */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Monitoring and Maintenance
                  </h3>
                  <p className="mb-3">Monitor your WolfGuard container:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Check container status
podman ps | grep wolfguard

# View logs
podman logs -f wolfguard

# Check resource usage
podman stats wolfguard

# Execute commands inside container
podman exec -it wolfguard wolfguard-cli status

# View health check status
podman inspect --format='{{.State.Health.Status}}' wolfguard

# Update to latest version
podman pull ghcr.io/dantte-lp/wolfguard:latest
podman-compose down
podman-compose up -d`}
                    </code>
                  </pre>
                </div>

                {/* Backup and Recovery */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Backup and Recovery</h3>
                  <p className="mb-3">Backup your WolfGuard configuration and data:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Backup volumes
podman volume export wolfguard-config -o wolfguard-config.tar
podman volume export wolfguard-certs -o wolfguard-certs.tar
podman volume export wolfguard-data -o wolfguard-data.tar

# Backup using tar (for bind mounts)
tar -czf wolfguard-backup-$(date +%Y%m%d).tar.gz \\
  config/ certs/ compose.yaml

# Restore volumes
podman volume import wolfguard-config wolfguard-config.tar
podman volume import wolfguard-certs wolfguard-certs.tar
podman volume import wolfguard-data wolfguard-data.tar`}
                    </code>
                  </pre>
                </div>

                {/* Troubleshooting */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Troubleshooting</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-foreground mb-2">
                        Container won&apos;t start:
                      </p>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`# Check logs for errors
podman logs wolfguard

# Verify port availability
sudo ss -tulpn | grep :443

# Check SELinux contexts (if using SELinux)
ls -lZ config/ certs/`}
                        </code>
                      </pre>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Permission issues:</p>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`# For SELinux systems, use :Z or :z flag
podman run -v ./config:/etc/wolfguard:Z ...

# Check file ownership
ls -la config/ certs/

# Fix permissions
chmod 644 config/wolfguard.conf
chmod 600 certs/*.key`}
                        </code>
                      </pre>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Networking issues:</p>
                      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-primary">
                          {`# Test connectivity from host
openssl s_client -connect localhost:443

# Check container network
podman inspect wolfguard | grep -A 10 "NetworkSettings"

# Verify firewall rules
sudo firewall-cmd --list-all`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Systemd Integration */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Systemd Integration (Podman)
                  </h3>
                  <p className="mb-3">Run container as a systemd service for automatic startup:</p>
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code className="text-primary">
                      {`# Generate systemd unit file
cd /path/to/compose
podman-compose up -d
podman generate systemd --new --files --name wolfguard-vpn

# Move to systemd directory
sudo mv container-wolfguard-vpn.service /etc/systemd/system/

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable container-wolfguard-vpn
sudo systemctl start container-wolfguard-vpn

# Check status
sudo systemctl status container-wolfguard-vpn`}
                    </code>
                  </pre>
                </div>

                {/* Next Steps */}
                <div className="mt-6 p-6 bg-primary/10 border border-primary/30 rounded-lg">
                  <h3 className="text-lg font-bold text-foreground mb-3">Next Steps</h3>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>
                      Configure client connections (see{' '}
                      <a href="/compatibility" className="text-primary hover:underline">
                        Compatibility
                      </a>{' '}
                      page)
                    </li>
                    <li>Set up monitoring with Prometheus and Grafana</li>
                    <li>Configure log aggregation (ELK, Loki, etc.)</li>
                    <li>Implement automated backups</li>
                    <li>
                      Review security hardening in the{' '}
                      <a
                        href="https://docs.wolfguard.io"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        documentation
                      </a>
                    </li>
                    <li>Join the community for support and updates</li>
                  </ul>
                </div>

                {/* Support */}
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-foreground">Container Support:</strong> For
                    container-specific issues, check the{' '}
                    <a
                      href="https://github.com/dantte-lp/wolfguard/discussions"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Discussions
                    </a>{' '}
                    or open an issue on{' '}
                    <a
                      href="https://github.com/dantte-lp/wolfguard/issues"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </motion.section>
  )
}
