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
              <h2 className="text-2xl font-bold mb-4">Container Deployment</h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  Deploy WolfGuard using Docker or Podman for easy installation and management.
                </p>
                <p className="text-foreground font-semibold">✅ Recommended for Production</p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Quick start with pre-built container images</li>
                  <li>Easy updates and version management</li>
                  <li>Isolated environment with all dependencies</li>
                  <li>Production-ready with Podman Compose</li>
                  <li>Integration with reverse proxies (Traefik)</li>
                </ul>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground font-semibold mb-2">🚧 Coming Soon</p>
                  <p className="text-sm">
                    Container deployment guide with Podman Compose examples is being prepared.
                    Official container images will be published to GitHub Container Registry.
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
