import { CompatibilityOverview } from '@/components/compatibility/CompatibilityOverview'
import { CiscoSupport } from '@/components/compatibility/CiscoSupport'
import { CiscoCompatibilityMatrix } from '@/components/compatibility/CiscoCompatibilityMatrix'
import { AlternativeClients } from '@/components/compatibility/AlternativeClients'
import { WolfGuardConnect } from '@/components/compatibility/WolfGuardConnect'
import { generateMetadata, pageMetadata } from '@/lib/metadata'

// Enhanced SEO metadata for compatibility page
export const metadata = generateMetadata(pageMetadata.compatibility)

export default function CompatibilityPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <CompatibilityOverview />
        <CiscoSupport />
        <CiscoCompatibilityMatrix />
        <AlternativeClients />
        <WolfGuardConnect />
      </div>
    </main>
  )
}
