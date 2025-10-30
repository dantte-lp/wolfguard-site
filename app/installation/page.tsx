import { Metadata } from 'next'
import { InstallationOverview } from '@/components/installation/InstallationOverview'
import { PlatformTabs } from '@/components/installation/PlatformTabs'

export const metadata: Metadata = {
  title: 'Installation | WolfGuard',
  description:
    'Install WolfGuard VPN Server on Linux, Windows, macOS, or using containers. Step-by-step installation guides for all platforms.',
}

export default function InstallationPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <InstallationOverview />
        <PlatformTabs />
      </div>
    </main>
  )
}
