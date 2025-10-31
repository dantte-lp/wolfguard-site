'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, Tab, Card, CardBody } from '@heroui/react'
import { Box, Package, Wrench } from 'lucide-react'
import { CodeBlock } from '@/components/shared/CodeBlock'

export function DistributionTabs() {
  const [selected, setSelected] = useState('debian')

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Distribution-Specific Installation</h2>
      <p className="text-default-600 text-center mb-8 max-w-3xl mx-auto">
        Choose your Linux distribution or installation method. Each guide is tailored to your
        system&apos;s package manager and container runtime.
      </p>

      <Tabs
        aria-label="Installation by distribution"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        color="primary"
        variant="underlined"
        classNames={{
          tabList: 'gap-6 w-full flex-wrap',
          cursor: 'w-full bg-primary',
          tab: 'max-w-fit px-4 h-12',
          tabContent: 'group-data-[selected=true]:text-primary',
        }}
      >
        {/* Debian-based */}
        <Tab
          key="debian"
          title={
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4" />
              <span className="font-semibold">Debian-based</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold mb-4">Debian / Ubuntu Installation</h3>
              <p className="text-default-600 mb-6">
                For Debian, Ubuntu, Linux Mint, and other Debian-based distributions. We&apos;ll use
                Docker and Docker Compose for containerized deployment.
              </p>

              <h3 className="text-xl font-bold mb-6">Installation Methods</h3>

              <div className="space-y-8">
                {/* Option 1: Package Manager */}
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Option 1: Package Manager (APT)
                  </h4>
                  <p className="text-default-600 mb-4">
                    Install WolfGuard directly using the APT package manager. This is the
                    recommended method for production systems.
                  </p>
                  <CodeBlock
                    code={`# Add WolfGuard repository
curl -fsSL https://packages.wolfguard.io/gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/wolfguard.gpg
echo "deb [signed-by=/usr/share/keyrings/wolfguard.gpg] https://packages.wolfguard.io/debian stable main" | \\
  sudo tee /etc/apt/sources.list.d/wolfguard.list

# Update package index
sudo apt update

# Install WolfGuard
sudo apt install -y wolfguard

# Enable and start service
sudo systemctl enable wolfguard
sudo systemctl start wolfguard

# Verify installation
wolfguard --version
sudo systemctl status wolfguard`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>

                {/* Option 2: Docker Container */}
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Box className="w-5 h-5 text-primary" />
                    Option 2: Docker Container
                  </h4>
                  <p className="text-default-600 mb-4">
                    Deploy WolfGuard in a Docker container for easier management and isolation.
                  </p>

                  <h5 className="text-lg font-semibold mb-3">
                    Step 1: Install Docker & Docker Compose
                  </h5>
                  <CodeBlock
                    code={`# Update package index
sudo apt update

# Install prerequisites
sudo apt install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up Docker repository
echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \\
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine and Docker Compose
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add your user to docker group (optional, for rootless)
sudo usermod -aG docker $USER

# Start and enable Docker
sudo systemctl enable docker
sudo systemctl start docker

# Verify installation
docker --version
docker compose version`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3">
                    Step 2: Deploy WolfGuard with Docker Compose
                  </h5>
                  <p className="text-default-600 mb-3">
                    Create a <code className="text-primary font-mono text-sm">compose.yaml</code>{' '}
                    file following the Compose Specification:
                  </p>
                  <CodeBlock
                    filename="compose.yaml"
                    code={`name: wolfguard

services:
  wolfguard:
    image: ghcr.io/dantte-lp/wolfguard:latest
    container_name: wolfguard-vpn
    restart: unless-stopped

    # Required capabilities for VPN functionality
    cap_add:
      - NET_ADMIN
      - NET_BIND_SERVICE

    # Network ports
    ports:
      - "443:443/tcp"   # TLS 1.3
      - "443:443/udp"   # DTLS 1.3

    # Configuration and data volumes
    volumes:
      - type: bind
        source: ./config
        target: /etc/wolfguard
        read_only: true
      - type: bind
        source: ./certs
        target: /etc/wolfguard/certs
        read_only: true
      - type: volume
        source: wolfguard-data
        target: /var/lib/wolfguard
      - type: volume
        source: wolfguard-logs
        target: /var/log/wolfguard

    # Environment configuration
    environment:
      WOLFGUARD_LOG_LEVEL: info
      WOLFGUARD_MAX_CLIENTS: 100
      WOLFGUARD_ENABLE_WOLFSENTRY: "true"
      TZ: UTC

    # Health monitoring
    healthcheck:
      test: ["CMD", "wolfguard-health", "--check"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

    # Resource limits
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M

# Named volumes for persistent data
volumes:
  wolfguard-data:
    driver: local
  wolfguard-logs:
    driver: local`}
                    language="yaml"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3">Step 3: Start Services</h5>
                  <CodeBlock
                    code={`# Create config directory
mkdir -p config certs

# Start WolfGuard
docker compose up -d

# View logs
docker compose logs -f

# Check status
docker compose ps

# Stop services
docker compose down`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* RHEL-based */}
        <Tab
          key="rhel"
          title={
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4" />
              <span className="font-semibold">RHEL-based</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold mb-4">RHEL / CentOS / Fedora Installation</h3>
              <p className="text-default-600 mb-6">
                For Red Hat Enterprise Linux, CentOS Stream, Rocky Linux, AlmaLinux, and Fedora.
                Choose between DNF package manager or Podman containerized deployment.
              </p>

              <h3 className="text-xl font-bold mb-6">Installation Methods</h3>

              <div className="space-y-8">
                {/* Option 1: Package Manager */}
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Option 1: Package Manager (DNF)
                  </h4>
                  <p className="text-default-600 mb-4">
                    Install WolfGuard directly using the DNF package manager. This is the
                    recommended method for production systems.
                  </p>
                  <CodeBlock
                    code={`# Add WolfGuard repository
# For RHEL 8/9, CentOS Stream, Rocky, AlmaLinux
sudo dnf config-manager --add-repo https://packages.wolfguard.io/rpm/wolfguard.repo

# For Fedora
sudo dnf config-manager --add-repo https://packages.wolfguard.io/rpm/fedora/wolfguard.repo

# Install WolfGuard
sudo dnf install -y wolfguard

# Enable and start service
sudo systemctl enable wolfguard
sudo systemctl start wolfguard

# Verify installation
wolfguard --version
sudo systemctl status wolfguard`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>

                {/* Option 2: Podman Container */}
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Box className="w-5 h-5 text-primary" />
                    Option 2: Podman Container
                  </h4>
                  <p className="text-default-600 mb-4">
                    Deploy WolfGuard in a Podman container for easier management and isolation.
                  </p>

                  <h5 className="text-lg font-semibold mb-3">
                    Step 1: Install Podman & Podman Compose
                  </h5>
                  <CodeBlock
                    code={`# For RHEL 8/9, CentOS Stream, Rocky, AlmaLinux
sudo dnf install -y podman podman-compose podman-plugins

# For Fedora
sudo dnf install -y podman podman-compose

# Enable Podman socket (optional, for systemd integration)
systemctl --user enable --now podman.socket

# Verify installation
podman --version
podman-compose --version`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3">
                    Step 2: Deploy WolfGuard with Podman Compose
                  </h5>
                  <p className="text-default-600 mb-3">
                    Create a <code className="text-primary font-mono text-sm">compose.yaml</code>{' '}
                    file following the Compose Specification:
                  </p>
                  <CodeBlock
                    filename="compose.yaml"
                    code={`name: wolfguard

services:
  wolfguard:
    image: ghcr.io/dantte-lp/wolfguard:latest
    container_name: wolfguard-vpn
    restart: unless-stopped

    # Required capabilities for VPN functionality
    cap_add:
      - NET_ADMIN
      - NET_BIND_SERVICE

    # Network ports
    ports:
      - "443:443/tcp"   # TLS 1.3
      - "443:443/udp"   # DTLS 1.3

    # Configuration and data volumes (with SELinux context)
    volumes:
      - type: bind
        source: ./config
        target: /etc/wolfguard
        read_only: true
        bind:
          selinux: z
      - type: bind
        source: ./certs
        target: /etc/wolfguard/certs
        read_only: true
        bind:
          selinux: z
      - type: volume
        source: wolfguard-data
        target: /var/lib/wolfguard
      - type: volume
        source: wolfguard-logs
        target: /var/log/wolfguard

    # Environment configuration
    environment:
      WOLFGUARD_LOG_LEVEL: info
      WOLFGUARD_MAX_CLIENTS: 100
      WOLFGUARD_ENABLE_WOLFSENTRY: "true"
      TZ: UTC

    # Health monitoring
    healthcheck:
      test: ["CMD", "wolfguard-health", "--check"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

    # Resource limits
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M

# Named volumes for persistent data
volumes:
  wolfguard-data:
    driver: local
  wolfguard-logs:
    driver: local`}
                    language="yaml"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3">Step 3: Start Services with Podman</h5>
                  <CodeBlock
                    code={`# Create config directory
mkdir -p config certs

# Configure SELinux (if enabled)
sudo semanage fcontext -a -t container_file_t "./config(/.*)?"
sudo semanage fcontext -a -t container_file_t "./certs(/.*)?"
sudo restorecon -R ./config ./certs

# Start WolfGuard
podman-compose up -d

# View logs
podman-compose logs -f

# Check status
podman-compose ps

# Stop services
podman-compose down`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3">Step 4: Configure Firewall</h5>
                  <CodeBlock
                    code={`# Open required ports in firewalld
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=443/udp
sudo firewall-cmd --reload

# Verify rules
sudo firewall-cmd --list-all`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* SUSE */}
        <Tab
          key="suse"
          title={
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4" />
              <span className="font-semibold">SUSE</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold mb-4">openSUSE / SLES Installation</h3>
              <p className="text-default-600 mb-6">
                For openSUSE Leap, Tumbleweed, and SUSE Linux Enterprise Server. Choose between
                zypper package manager or container deployment (Podman/Docker).
              </p>

              <h3 className="text-xl font-bold mb-6">Installation Methods</h3>

              <div className="space-y-8">
                {/* Option 1: Package Manager */}
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Option 1: Package Manager (Zypper)
                  </h4>
                  <p className="text-default-600 mb-4">
                    Install WolfGuard directly using the zypper package manager. This is the
                    recommended method for production systems.
                  </p>
                  <CodeBlock
                    code={`# Add WolfGuard repository
# For openSUSE Tumbleweed
sudo zypper addrepo https://packages.wolfguard.io/rpm/opensuse/tumbleweed wolfguard

# For openSUSE Leap 15.x
sudo zypper addrepo https://packages.wolfguard.io/rpm/opensuse/leap wolfguard

# For SUSE Linux Enterprise Server (SLES)
sudo zypper addrepo https://packages.wolfguard.io/rpm/sles wolfguard

# Refresh repositories
sudo zypper refresh

# Install WolfGuard
sudo zypper install -y wolfguard

# Enable and start service
sudo systemctl enable wolfguard
sudo systemctl start wolfguard

# Verify installation
wolfguard --version
sudo systemctl status wolfguard`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>

                {/* Option 2: Container (Podman or Docker) */}
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Box className="w-5 h-5 text-primary" />
                    Option 2: Container (Podman or Docker)
                  </h4>
                  <p className="text-default-600 mb-4">
                    Deploy WolfGuard in a container for easier management and isolation. SUSE
                    supports both Podman and Docker.
                  </p>

                  <h5 className="text-lg font-semibold mb-3">
                    Step 1A: Install Podman (Recommended)
                  </h5>
                  <CodeBlock
                    code={`# For openSUSE Tumbleweed
sudo zypper install -y podman podman-compose

# For openSUSE Leap 15.x
sudo zypper install -y podman podman-compose

# For SUSE Linux Enterprise Server (SLES)
sudo zypper install -y podman podman-compose

# Enable Podman socket
systemctl --user enable --now podman.socket

# Verify installation
podman --version
podman-compose --version`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3 mt-6">
                    Step 1B: Install Docker (Alternative)
                  </h5>
                  <CodeBlock
                    code={`# Add Docker repository
sudo zypper addrepo https://download.docker.com/linux/sles/docker-ce.repo

# Install Docker
sudo zypper install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker
sudo systemctl enable docker
sudo systemctl start docker

# Add user to docker group
sudo usermod -aG docker $USER

# Verify installation
docker --version
docker compose version`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3">Step 2: Deploy WolfGuard</h5>
                  <p className="text-default-600 mb-3">
                    Use the same{' '}
                    <code className="text-primary font-mono text-sm">compose.yaml</code> as shown in
                    the RHEL tab, then start services:
                  </p>
                  <CodeBlock
                    code={`# Create config directory
mkdir -p config certs

# Start with Podman Compose
podman-compose up -d

# OR start with Docker Compose
docker compose up -d

# View logs
podman-compose logs -f  # or: docker compose logs -f

# Check status
podman-compose ps  # or: docker compose ps`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3">Step 3: Configure Firewall</h5>
                  <CodeBlock
                    code={`# For systems with firewalld
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=443/udp
sudo firewall-cmd --reload

# For systems with SuSEfirewall2
sudo SuSEfirewall2 open EXT TCP 443
sudo SuSEfirewall2 open EXT UDP 443`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Arch Linux */}
        <Tab
          key="arch"
          title={
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="font-semibold">Arch Linux</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold mb-4">Arch Linux Installation</h3>
              <p className="text-default-600 mb-6">
                For Arch Linux and Arch-based distributions (Manjaro, EndeavourOS, etc.). Choose
                between pacman package manager or container deployment.
              </p>

              <h3 className="text-xl font-bold mb-6">Installation Methods</h3>

              <div className="space-y-8">
                {/* Option 1: Package Manager */}
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Option 1: Package Manager (Pacman)
                  </h4>
                  <p className="text-default-600 mb-4">
                    Install WolfGuard from the AUR (Arch User Repository) or official packages. This
                    is the recommended method for production systems.
                  </p>
                  <CodeBlock
                    code={`# Install build dependencies
sudo pacman -S base-devel git

# Install from AUR using yay (or your preferred AUR helper)
yay -S wolfguard-git

# Or install using paru
paru -S wolfguard-git

# Or install manually from AUR
git clone https://aur.archlinux.org/wolfguard-git.git
cd wolfguard-git
makepkg -si

# Enable and start service
sudo systemctl enable wolfguard
sudo systemctl start wolfguard

# Verify installation
wolfguard --version
sudo systemctl status wolfguard`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>

                {/* Option 2: Docker Container */}
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Box className="w-5 h-5 text-primary" />
                    Option 2: Docker Container
                  </h4>
                  <p className="text-default-600 mb-4">
                    Deploy WolfGuard in a Docker container for easier management and isolation.
                  </p>

                  <h5 className="text-lg font-semibold mb-3">Step 1: Install Container Runtime</h5>
                  <CodeBlock
                    code={`# Option 1: Install Podman (recommended)
sudo pacman -S podman podman-compose podman-docker

# Option 2: Install Docker
sudo pacman -S docker docker-compose

# Enable and start service
# For Podman:
systemctl --user enable --now podman.socket

# For Docker:
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# Verify installation
podman --version  # or: docker --version
podman-compose --version  # or: docker compose version`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3">Step 2: Deploy WolfGuard Container</h5>
                  <p className="text-default-600 mb-3">
                    Use the same{' '}
                    <code className="text-primary font-mono text-sm">compose.yaml</code> as shown in
                    other tabs:
                  </p>
                  <CodeBlock
                    code={`# Create config directory
mkdir -p config certs

# Start with Podman Compose
podman-compose up -d

# OR start with Docker Compose
docker compose up -d

# View logs
podman-compose logs -f  # or: docker compose logs -f`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3">Step 3: Configure Firewall</h5>
                  <CodeBlock
                    code={`# If using iptables
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 443 -j ACCEPT
sudo iptables-save | sudo tee /etc/iptables/iptables.rules

# If using firewalld
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=443/udp
sudo firewall-cmd --reload

# If using ufw
sudo ufw allow 443/tcp
sudo ufw allow 443/udp
sudo ufw reload`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Build from Source */}
        <Tab
          key="source"
          title={
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span className="font-semibold">Build from Source</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold mb-4">Build from Source</h3>
              <p className="text-default-600 mb-6">
                Build WolfGuard from source for maximum control and customization. This method works
                on any Linux distribution with a modern C compiler.
              </p>

              <div className="space-y-8">
                {/* System Requirements */}
                <div>
                  <h4 className="text-xl font-bold mb-3">System Requirements</h4>
                  <div className="bg-default-100 dark:bg-default-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-default-700">
                      <li>
                        <strong>Compiler:</strong> GCC 11+ or Clang 15+ (C23 support required)
                      </li>
                      <li>
                        <strong>Build System:</strong> CMake 3.20 or newer
                      </li>
                      <li>
                        <strong>Kernel:</strong> Linux 5.4+ (5.10+ recommended)
                      </li>
                      <li>
                        <strong>Libraries:</strong> wolfSSL, wolfSentry (bundled), OpenSSL dev
                        headers
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Install Build Dependencies */}
                <div>
                  <h4 className="text-xl font-bold mb-3">1. Install Build Dependencies</h4>
                  <p className="text-default-600 mb-3">
                    Install the required build dependencies for your distribution:
                  </p>

                  <h5 className="text-lg font-semibold mb-3 mt-4">Debian / Ubuntu</h5>
                  <CodeBlock
                    code={`# Update package index
sudo apt update

# Install build dependencies
sudo apt install -y build-essential cmake git pkg-config \\
  libssl-dev libtool autoconf automake`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3 mt-4">RHEL / Fedora</h5>
                  <CodeBlock
                    code={`# Install development tools group
sudo dnf groupinstall "Development Tools"

# Install additional dependencies
sudo dnf install -y cmake git pkg-config openssl-devel \\
  libtool autoconf automake`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3 mt-4">SUSE / openSUSE</h5>
                  <CodeBlock
                    code={`# Install build dependencies
sudo zypper install -y gcc gcc-c++ make cmake git pkg-config \\
  libopenssl-devel libtool autoconf automake`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />

                  <h5 className="text-lg font-semibold mb-3 mt-4">Arch Linux</h5>
                  <CodeBlock
                    code={`# Install build dependencies
sudo pacman -S base-devel cmake git pkg-config openssl`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>

                {/* Clone and Build */}
                <div>
                  <h4 className="text-xl font-bold mb-3">2. Clone and Build WolfGuard</h4>
                  <CodeBlock
                    code={`# Clone the repository
git clone https://github.com/dantte-lp/wolfguard.git
cd wolfguard

# Create build directory
mkdir build && cd build

# Configure with CMake
cmake -DCMAKE_BUILD_TYPE=Release \\
      -DCMAKE_INSTALL_PREFIX=/usr/local \\
      -DENABLE_WOLFSSL=ON \\
      -DENABLE_WOLFSENTRY=ON \\
      -DENABLE_TLS13=ON \\
      -DENABLE_DTLS13=ON \\
      ..

# Build (use all available cores)
make -j$(nproc)

# Run tests (optional but recommended)
make test

# Install (requires root)
sudo make install

# Verify installation
wolfguard --version`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>

                {/* System Setup */}
                <div>
                  <h4 className="text-xl font-bold mb-3">3. System Setup</h4>
                  <CodeBlock
                    code={`# Create wolfguard system user
sudo useradd -r -s /sbin/nologin -d /var/lib/wolfguard wolfguard

# Create required directories
sudo mkdir -p /etc/wolfguard
sudo mkdir -p /var/lib/wolfguard
sudo mkdir -p /var/log/wolfguard

# Set ownership
sudo chown -R wolfguard:wolfguard /var/lib/wolfguard
sudo chown -R wolfguard:wolfguard /var/log/wolfguard
sudo chmod 750 /etc/wolfguard`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>

                {/* Configuration */}
                <div>
                  <h4 className="text-xl font-bold mb-3">4. Create Configuration File</h4>
                  <CodeBlock
                    filename="/etc/wolfguard/wolfguard.conf"
                    code={`# WolfGuard Server Configuration

[server]
listen_address = 0.0.0.0
listen_port = 443
protocol = anyconnect
max_clients = 100

[tls]
certificate = /etc/wolfguard/certs/server.crt
private_key = /etc/wolfguard/certs/server.key
ca_certificate = /etc/wolfguard/certs/ca.crt
min_version = TLS1.3
ciphers = TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256

[dtls]
enabled = true
port = 443
min_version = DTLS1.3
ciphers = TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256

[vpn]
network = 10.10.0.0/24
netmask = 255.255.255.0
dns_servers = 1.1.1.1,8.8.8.8
split_tunneling = true
default_domain = vpn.example.com

[auth]
method = certificate
# Alternatives: password, radius, ldap
# radius_server = radius.example.com
# ldap_server = ldap://ldap.example.com

[logging]
level = info
file = /var/log/wolfguard/wolfguard.log
max_size = 100M
max_backups = 10

[wolfsentry]
enabled = true
rules_file = /etc/wolfguard/wolfsentry-rules.conf
block_duration = 3600
max_connections_per_ip = 10`}
                    language="ini"
                    collapsible
                    collapseAt={30}
                  />
                </div>

                {/* Generate Certificates */}
                <div>
                  <h4 className="text-xl font-bold mb-3">5. Generate TLS Certificates</h4>
                  <CodeBlock
                    code={`# Create certificates directory
sudo mkdir -p /etc/wolfguard/certs
cd /etc/wolfguard/certs

# Generate CA certificate
sudo openssl req -x509 -newkey rsa:4096 -days 365 -nodes \\
  -keyout ca.key -out ca.crt \\
  -subj "/C=US/ST=State/L=City/O=Organization/CN=WolfGuard CA"

# Generate server certificate request
sudo openssl req -newkey rsa:4096 -nodes \\
  -keyout server.key -out server.csr \\
  -subj "/C=US/ST=State/L=City/O=Organization/CN=vpn.example.com"

# Sign server certificate with CA
sudo openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key \\
  -CAcreateserial -out server.crt -days 365 \\
  -extfile <(printf "subjectAltName=DNS:vpn.example.com,DNS:*.vpn.example.com")

# Set proper permissions
sudo chown -R wolfguard:wolfguard /etc/wolfguard/certs
sudo chmod 600 /etc/wolfguard/certs/*.key
sudo chmod 644 /etc/wolfguard/certs/*.crt

# Clean up CSR
sudo rm server.csr`}
                    language="bash"
                    collapsible
                    collapseAt={20}
                  />
                </div>

                {/* Systemd Service */}
                <div>
                  <h4 className="text-xl font-bold mb-3">6. Create Systemd Service</h4>
                  <CodeBlock
                    filename="/etc/systemd/system/wolfguard.service"
                    code={`[Unit]
Description=WolfGuard VPN Server
Documentation=https://docs.wolfguard.io
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
TimeoutStartSec=60s
TimeoutStopSec=30s

# Security hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/wolfguard /var/log/wolfguard
ProtectKernelTunables=true
ProtectControlGroups=true
RestrictRealtime=true
RestrictNamespaces=true

# Required capabilities
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=wolfguard

[Install]
WantedBy=multi-user.target`}
                    language="ini"
                    collapsible
                    collapseAt={25}
                  />
                </div>

                {/* Start Service */}
                <div>
                  <h4 className="text-xl font-bold mb-3">7. Enable and Start WolfGuard</h4>
                  <CodeBlock
                    code={`# Reload systemd
sudo systemctl daemon-reload

# Enable WolfGuard to start on boot
sudo systemctl enable wolfguard

# Start WolfGuard
sudo systemctl start wolfguard

# Check status
sudo systemctl status wolfguard

# View logs
sudo journalctl -u wolfguard -f

# Check listening ports
sudo ss -tulpn | grep wolfguard`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>

                {/* Verification */}
                <div>
                  <h4 className="text-xl font-bold mb-3">8. Verify Installation</h4>
                  <CodeBlock
                    code={`# Test TLS connection
openssl s_client -connect localhost:443 -showcerts

# Check version and build info
wolfguard --version
wolfguard --build-info

# Test configuration
sudo wolfguard -c /etc/wolfguard/wolfguard.conf --test

# Monitor real-time connections
sudo wolfguard-cli status
sudo wolfguard-cli sessions list`}
                    language="bash"
                    collapsible
                    collapseAt={15}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </motion.section>
  )
}
