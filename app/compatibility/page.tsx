import { Metadata } from 'next'
import { CompatibilityOverview } from '@/components/compatibility/CompatibilityOverview'
import { CiscoSupport } from '@/components/compatibility/CiscoSupport'
import { AlternativeClients } from '@/components/compatibility/AlternativeClients'
import { WolfGuardConnect } from '@/components/compatibility/WolfGuardConnect'

export const metadata: Metadata = {
  title: 'Compatibility | WolfGuard',
  description:
    'WolfGuard VPN Server compatibility with Cisco Secure Client, OpenConnect, and other AnyConnect-compatible clients. Future roadmap for WolfGuard Connect.',
}

export default function CompatibilityPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <CompatibilityOverview />
        <CiscoSupport />
        <AlternativeClients />
        <WolfGuardConnect />
      </div>
    </main>
  )
}
