'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Accordion, AccordionItem, Chip, Link } from '@heroui/react'
import { CheckCircle2, AlertCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

interface CompatibilityEntry {
  os: string
  v49: 'full' | 'partial' | 'none' | 'eol'
  v410: 'full' | 'partial' | 'none' | 'eol'
  v50: 'full' | 'partial' | 'none' | 'eol'
  v51: 'full' | 'partial' | 'none' | 'eol'
  notes?: string
}

const windowsCompatibility: CompatibilityEntry[] = [
  { os: 'Windows 11 (x64)', v49: 'full', v410: 'full', v50: 'full', v51: 'full' },
  {
    os: 'Windows 11 ARM64',
    v49: 'partial',
    v410: 'partial',
    v50: 'full',
    v51: 'full',
    notes: 'VPN only in 4.x',
  },
  { os: 'Windows 10 (x64)', v49: 'full', v410: 'full', v50: 'full', v51: 'full' },
  { os: 'Windows 10 (x86)', v49: 'full', v410: 'full', v50: 'full', v51: 'full' },
  { os: 'Windows 8.1', v49: 'eol', v410: 'none', v50: 'none', v51: 'none', notes: 'EOL Jan 2023' },
  { os: 'Windows 7', v49: 'eol', v410: 'none', v50: 'none', v51: 'none', notes: 'EOL Jan 2020' },
]

const macOSCompatibility: CompatibilityEntry[] = [
  {
    os: 'macOS 26 Tahoe',
    v49: 'none',
    v410: 'none',
    v50: 'none',
    v51: 'full',
    notes: '5.1.12.146+',
  },
  {
    os: 'macOS 15 Sequoia',
    v49: 'none',
    v410: 'none',
    v50: 'none',
    v51: 'full',
    notes: '5.1.6.103+',
  },
  { os: 'macOS 14 Sonoma', v49: 'none', v410: 'full', v50: 'full', v51: 'full' },
  { os: 'macOS 13 Ventura', v49: 'none', v410: 'full', v50: 'full', v51: 'full' },
  {
    os: 'macOS 12 Monterey',
    v49: 'none',
    v410: 'full',
    v50: 'full',
    v51: 'none',
    notes: 'Removed in 5.1.6.103',
  },
  {
    os: 'macOS 11 Big Sur',
    v49: 'full',
    v410: 'full',
    v50: 'full',
    v51: 'none',
    notes: 'Removed in 5.1.3.62',
  },
  {
    os: 'macOS 10.15 Catalina',
    v49: 'full',
    v410: 'none',
    v50: 'partial',
    v51: 'none',
    notes: 'VPN only in 5.0',
  },
]

const linuxCompatibility: CompatibilityEntry[] = [
  { os: 'Red Hat 10.x', v49: 'none', v410: 'none', v50: 'none', v51: 'full' },
  { os: 'Red Hat 9.x', v49: 'none', v410: 'full', v50: 'full', v51: 'full' },
  { os: 'Red Hat 8.x', v49: 'full', v410: 'full', v50: 'full', v51: 'full', notes: '8.2+ for 4.9' },
  { os: 'Red Hat 7.x', v49: 'eol', v410: 'none', v50: 'none', v51: 'none', notes: 'EOL Jun 2024' },
  { os: 'Ubuntu 24.04 LTS', v49: 'none', v410: 'none', v50: 'full', v51: 'full' },
  { os: 'Ubuntu 22.04 LTS', v49: 'none', v410: 'full', v50: 'full', v51: 'full' },
  {
    os: 'Ubuntu 20.04 LTS',
    v49: 'full',
    v410: 'full',
    v50: 'full',
    v51: 'none',
    notes: 'Removed in 5.1.10.233',
  },
  { os: 'Ubuntu 18.04 LTS', v49: 'eol', v410: 'none', v50: 'none', v51: 'none', notes: 'EOL' },
  {
    os: 'SUSE SLES 15',
    v49: 'none',
    v410: 'full',
    v50: 'partial',
    v51: 'partial',
    notes: 'Limited features',
  },
  {
    os: 'Linux ARM64',
    v49: 'none',
    v410: 'none',
    v50: 'none',
    v51: 'full',
    notes: 'Added in 5.1.11.388',
  },
]

// Legacy Operating System Support Data
interface LegacyOSEntry {
  os: string
  lastVersion: string
  eolDate: string
  securityRisk: 'critical' | 'high' | 'moderate'
  notes: string
}

const legacyWindows: LegacyOSEntry[] = [
  {
    os: 'Windows 7 SP1',
    lastVersion: 'AnyConnect 4.9.06028',
    eolDate: 'January 2020',
    securityRisk: 'critical',
    notes: 'Microsoft ended extended support. Critical security vulnerabilities remain unpatched.',
  },
  {
    os: 'Windows 8.1',
    lastVersion: 'AnyConnect 4.9.06028',
    eolDate: 'January 2023',
    securityRisk: 'critical',
    notes: 'No longer receives security updates from Microsoft.',
  },
  {
    os: 'Windows Vista',
    lastVersion: 'AnyConnect 3.1.x',
    eolDate: 'April 2017',
    securityRisk: 'critical',
    notes: 'Extremely outdated. Should not be used under any circumstances.',
  },
  {
    os: 'Windows XP',
    lastVersion: 'AnyConnect 2.5.x',
    eolDate: 'April 2014',
    securityRisk: 'critical',
    notes: 'Highly vulnerable. Incompatible with modern security standards.',
  },
]

const legacyMacOS: LegacyOSEntry[] = [
  {
    os: 'macOS 10.12 Sierra',
    lastVersion: 'AnyConnect 4.9.x',
    eolDate: 'September 2019',
    securityRisk: 'high',
    notes: 'Last macOS version supported by AnyConnect 4.9. Not supported in 5.0+.',
  },
  {
    os: 'macOS 10.11 El Capitan',
    lastVersion: 'AnyConnect 4.7.x',
    eolDate: 'December 2018',
    securityRisk: 'high',
    notes: 'Lacks modern security features. TLS 1.3 not fully supported.',
  },
  {
    os: 'macOS 10.10 Yosemite',
    lastVersion: 'AnyConnect 4.6.x',
    eolDate: 'August 2017',
    securityRisk: 'high',
    notes: 'Multiple known security vulnerabilities.',
  },
  {
    os: 'macOS 10.9 Mavericks',
    lastVersion: 'AnyConnect 4.3.x',
    eolDate: 'December 2016',
    securityRisk: 'critical',
    notes: 'Severely outdated. No modern cryptographic support.',
  },
  {
    os: 'macOS 10.8 Mountain Lion',
    lastVersion: 'AnyConnect 3.1.x',
    eolDate: 'October 2015',
    securityRisk: 'critical',
    notes: 'Ancient OS version. Should not be used.',
  },
]

const legacyLinux: LegacyOSEntry[] = [
  {
    os: 'Red Hat 6.x',
    lastVersion: 'AnyConnect 4.9.x',
    eolDate: 'November 2020',
    securityRisk: 'high',
    notes: 'Extended Lifecycle Support ended. Limited security patches available.',
  },
  {
    os: 'Red Hat 5.x',
    lastVersion: 'AnyConnect 3.1.x',
    eolDate: 'March 2017',
    securityRisk: 'critical',
    notes: 'Extremely outdated kernel and libraries.',
  },
  {
    os: 'Ubuntu 16.04 LTS',
    lastVersion: 'AnyConnect 4.9.x',
    eolDate: 'April 2021',
    securityRisk: 'moderate',
    notes: 'Standard support ended. ESM available for paying customers only.',
  },
  {
    os: 'Ubuntu 14.04 LTS',
    lastVersion: 'AnyConnect 4.6.x',
    eolDate: 'April 2019',
    securityRisk: 'high',
    notes: 'No longer maintained. Known vulnerabilities exist.',
  },
  {
    os: 'Debian 8 (Jessie)',
    lastVersion: 'AnyConnect 4.7.x',
    eolDate: 'June 2020',
    securityRisk: 'high',
    notes: 'LTS support ended. Security updates no longer available.',
  },
]

const StatusIcon = ({ status }: { status: 'full' | 'partial' | 'none' | 'eol' }) => {
  switch (status) {
    case 'full':
      return <CheckCircle2 className="w-5 h-5 text-success" />
    case 'partial':
      return <AlertCircle className="w-5 h-5 text-warning" />
    case 'eol':
      return <XCircle className="w-5 h-5 text-danger opacity-50" />
    case 'none':
    default:
      return <XCircle className="w-5 h-5 text-default-400" />
  }
}

const SecurityRiskBadge = ({ risk }: { risk: 'critical' | 'high' | 'moderate' }) => {
  const config = {
    critical: { color: 'danger' as const, label: 'Critical Risk' },
    high: { color: 'warning' as const, label: 'High Risk' },
    moderate: { color: 'warning' as const, label: 'Moderate Risk' },
  }
  const { color, label } = config[risk]
  return (
    <Chip size="sm" color={color} variant="flat">
      {label}
    </Chip>
  )
}

const CompatibilityTable = ({ title, data }: { title: string; data: CompatibilityEntry[] }) => (
  <div className="mb-8">
    <h4 className="text-lg font-bold mb-4 text-foreground">{title}</h4>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-default-100 dark:bg-default-50">
          <tr>
            <th className="px-4 py-3 text-left text-foreground font-semibold">Operating System</th>
            <th className="px-4 py-3 text-center text-foreground font-semibold">4.9.x</th>
            <th className="px-4 py-3 text-center text-foreground font-semibold">4.10.x</th>
            <th className="px-4 py-3 text-center text-foreground font-semibold">5.0.x</th>
            <th className="px-4 py-3 text-center text-foreground font-semibold">5.1.x</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr
              key={idx}
              className="border-t border-default-200 hover:bg-default-50 dark:hover:bg-default-100/50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-foreground">
                {entry.os}
                {entry.notes && (
                  <span className="block text-xs text-default-500 mt-1">{entry.notes}</span>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center">
                  <StatusIcon status={entry.v49} />
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center">
                  <StatusIcon status={entry.v410} />
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center">
                  <StatusIcon status={entry.v50} />
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center">
                  <StatusIcon status={entry.v51} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const LegacyOSTable = ({ title, data }: { title: string; data: LegacyOSEntry[] }) => (
  <div className="mb-6">
    <h5 className="text-base font-semibold mb-3 text-foreground flex items-center gap-2">
      <AlertTriangle className="w-4 h-4 text-warning" />
      {title}
    </h5>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-warning/10 border-b border-warning/30">
          <tr>
            <th className="px-4 py-2 text-left text-foreground font-semibold">Operating System</th>
            <th className="px-4 py-2 text-left text-foreground font-semibold">Last Version</th>
            <th className="px-4 py-2 text-left text-foreground font-semibold">EOL Date</th>
            <th className="px-4 py-2 text-left text-foreground font-semibold">Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr
              key={idx}
              className="border-t border-warning/20 hover:bg-warning/5 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-foreground">
                {entry.os}
                <span className="block text-xs text-default-500 mt-1">{entry.notes}</span>
              </td>
              <td className="px-4 py-3 text-default-700 font-mono text-xs">{entry.lastVersion}</td>
              <td className="px-4 py-3 text-default-700">{entry.eolDate}</td>
              <td className="px-4 py-3">
                <SecurityRiskBadge risk={entry.securityRisk} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export function CiscoCompatibilityMatrix() {
  return (
    <motion.section initial="initial" animate="animate" variants={fadeInUp} className="mt-12">
      <Card className="bg-background/60 backdrop-blur-sm border border-border">
        <CardBody className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-3 text-foreground">
              Cisco Secure Client Compatibility Matrix
            </h2>
            <p className="text-default-600 mb-2">
              WolfGuard is compatible with Cisco Secure Client (formerly AnyConnect) versions 4.9
              through 5.1. The following matrix shows OS support across all major client versions.
            </p>
            <p className="text-sm text-default-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Looking for information about Windows 7, Windows 8.1, or other end-of-life operating
              systems? See the <strong>Legacy System Support</strong> section below.
            </p>
          </div>

          {/* Legend */}
          <div className="mb-8 p-4 bg-default-100 dark:bg-default-50 rounded-lg">
            <h4 className="text-sm font-semibold mb-3 text-foreground">Legend:</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm text-default-700">Full Support</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-warning" />
                <span className="text-sm text-default-700">Partial Support</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-danger opacity-50" />
                <span className="text-sm text-default-700">End of Life (EOL)</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-default-400" />
                <span className="text-sm text-default-700">Not Supported</span>
              </div>
            </div>
          </div>

          {/* Windows Table */}
          <CompatibilityTable title="Windows" data={windowsCompatibility} />

          {/* macOS Table */}
          <CompatibilityTable title="macOS" data={macOSCompatibility} />

          {/* Linux Table */}
          <CompatibilityTable title="Linux" data={linuxCompatibility} />

          {/* Version Notes */}
          <div className="mt-8 p-6 bg-primary/10 border border-primary/30 rounded-lg">
            <h3 className="text-lg font-bold text-foreground mb-3">Key Version Milestones</h3>
            <div className="space-y-3 text-sm text-default-700">
              <div className="flex gap-3">
                <span className="font-semibold text-foreground min-w-[80px]">4.9.x:</span>
                <span>Last AnyConnect 4.x release; TLS 1.2 only; End-of-Life</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-foreground min-w-[80px]">4.10.x:</span>
                <span>WPA3 support; External SSO; Enhanced smartcard support; End-of-Life</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-foreground min-w-[80px]">5.0.x:</span>
                <span>
                  TLS 1.3 debut; Rebranding to Cisco Secure Client; FIDO2/WebAuthN support
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-foreground min-w-[80px]">5.1.x:</span>
                <span>Post-quantum cryptography; Linux ARM64; macOS 26 support; Latest stable</span>
              </div>
            </div>
          </div>

          {/* Protocol Support */}
          <div className="mt-6 p-6 bg-default-50 dark:bg-default-100 rounded-lg">
            <h3 className="text-lg font-bold text-foreground mb-3">Protocol Support by Version</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-foreground mb-2">TLS Protocol:</h4>
                <ul className="space-y-1 text-default-700">
                  <li>
                    <span className="text-primary">•</span> TLS 1.3: Versions 5.0+ (requires ASA
                    9.19.1+)
                  </li>
                  <li>
                    <span className="text-primary">•</span> TLS 1.2: All versions
                  </li>
                  <li>
                    <span className="text-primary">•</span> TLS 1.0/1.1: Deprecated in 4.9+, removed
                    in 5.0+
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">DTLS Protocol:</h4>
                <ul className="space-y-1 text-default-700">
                  <li>
                    <span className="text-primary">•</span> DTLS 1.2: All versions
                  </li>
                  <li>
                    <span className="text-primary">•</span> DTLS 1.3: Not yet implemented by Cisco
                  </li>
                  <li>
                    <span className="text-primary">•</span> DTLS 1.0: Legacy support in older
                    versions
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legacy System Support Section */}
          <div className="mt-8">
            <Accordion variant="splitted">
              <AccordionItem
                key="legacy"
                aria-label="Legacy System Support"
                title={
                  <div className="flex items-center gap-3 py-1">
                    <AlertTriangle className="w-6 h-6 text-warning" />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-lg font-bold">Legacy System Support</span>
                      <Chip size="sm" color="danger" variant="flat">
                        End-of-Life Operating Systems
                      </Chip>
                    </div>
                  </div>
                }
                className="border-2 border-warning/30 bg-warning/5"
              >
                <div className="space-y-6 pt-4">
                  {/* Warning Banner */}
                  <div className="p-4 bg-danger/10 border-l-4 border-danger rounded-r-lg">
                    <div className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-danger mb-2">Security Warning</h4>
                        <p className="text-sm text-default-700 mb-2">
                          These operating systems are no longer supported by their vendors and
                          should NOT be used in production environments. They contain known security
                          vulnerabilities that will never be patched.
                        </p>
                        <p className="text-sm text-default-700">
                          <strong>Recommended:</strong> Upgrade to a supported operating system
                          version before deploying any VPN solution.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Legacy Windows */}
                  <LegacyOSTable title="Windows Legacy Support" data={legacyWindows} />

                  {/* Legacy macOS */}
                  <LegacyOSTable title="macOS Legacy Support" data={legacyMacOS} />

                  {/* Legacy Linux */}
                  <LegacyOSTable title="Linux Legacy Support" data={legacyLinux} />

                  {/* Important Notes */}
                  <div className="p-5 bg-default-50 dark:bg-default-100 rounded-lg border border-default-200">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      Important Notes
                    </h4>
                    <ul className="space-y-2 text-sm text-default-700">
                      <li className="flex gap-2">
                        <span className="text-warning flex-shrink-0">•</span>
                        <span>
                          <strong>AnyConnect 4.x End-of-Life:</strong> Cisco AnyConnect 4.x
                          (including 4.9 and 4.10) reached end-of-life. All future updates are
                          provided in Cisco Secure Client 5.1.x+.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-warning flex-shrink-0">•</span>
                        <span>
                          <strong>No Security Updates:</strong> Legacy versions receive no security
                          patches, even for critical vulnerabilities.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-warning flex-shrink-0">•</span>
                        <span>
                          <strong>Testing Only:</strong> Use legacy versions only for isolated
                          testing, legacy application compatibility testing, or air-gapped
                          environments.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-warning flex-shrink-0">•</span>
                        <span>
                          <strong>WolfGuard Compatibility:</strong> WolfGuard focuses on modern
                          protocols (TLS 1.3, DTLS 1.3). Legacy OS versions may have limited or
                          degraded functionality.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* External Documentation Links */}
                  <div className="p-5 bg-primary/5 border border-primary/30 rounded-lg">
                    <h4 className="font-bold text-foreground mb-3">Official Documentation</h4>
                    <div className="space-y-2 text-sm">
                      <Link
                        href="https://www.cisco.com/c/en/us/td/docs/security/vpn_client/anyconnect/anyconnect49/release/notes/release-notes-anyconnect-4-9.html"
                        isExternal
                        showAnchorIcon
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Cisco AnyConnect 4.9 Release Notes
                      </Link>
                      <Link
                        href="https://learn.microsoft.com/en-us/lifecycle/products/windows-7"
                        isExternal
                        showAnchorIcon
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Microsoft Windows 7 Lifecycle
                      </Link>
                      <Link
                        href="https://learn.microsoft.com/en-us/lifecycle/products/windows-81"
                        isExternal
                        showAnchorIcon
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Microsoft Windows 8.1 Lifecycle
                      </Link>
                      <Link
                        href="https://support.apple.com/en-us/HT201222"
                        isExternal
                        showAnchorIcon
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Apple macOS Support Lifecycle
                      </Link>
                      <Link
                        href="https://access.redhat.com/product-life-cycles"
                        isExternal
                        showAnchorIcon
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Red Hat Enterprise Linux Lifecycle
                      </Link>
                      <Link
                        href="https://ubuntu.com/about/release-cycle"
                        isExternal
                        showAnchorIcon
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ubuntu Release and Support Lifecycle
                      </Link>
                    </div>
                  </div>

                  {/* Migration Guide */}
                  <div className="p-5 bg-success/5 border border-success/30 rounded-lg">
                    <h4 className="font-bold text-foreground mb-3">Migration Recommendations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">From Windows 7/8.1:</h5>
                        <p className="text-default-700 mb-2">
                          Upgrade to <strong>Windows 10 22H2</strong> or <strong>Windows 11</strong>{' '}
                          for full Cisco Secure Client 5.1.x support.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">From Legacy macOS:</h5>
                        <p className="text-default-700 mb-2">
                          Upgrade to <strong>macOS 13 Ventura</strong> or newer for optimal security
                          and compatibility.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">From Legacy Linux:</h5>
                        <p className="text-default-700 mb-2">
                          Migrate to <strong>Ubuntu 22.04 LTS</strong>, <strong>RHEL 9.x</strong>,
                          or other actively supported distributions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </CardBody>
      </Card>
    </motion.section>
  )
}
