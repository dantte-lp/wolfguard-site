'use client'

import { motion } from 'framer-motion'
import { Card, CardBody } from '@heroui/react'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

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

export function CiscoCompatibilityMatrix() {
  return (
    <motion.section initial="initial" animate="animate" variants={fadeInUp} className="mt-12">
      <Card className="bg-background/60 backdrop-blur-sm border border-border">
        <CardBody className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-3 text-foreground">
              Cisco Secure Client Compatibility Matrix
            </h2>
            <p className="text-default-600">
              WolfGuard is compatible with Cisco Secure Client (formerly AnyConnect) versions 4.9
              through 5.1. The following matrix shows OS support across all major client versions.
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
        </CardBody>
      </Card>
    </motion.section>
  )
}
