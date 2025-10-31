import { InstallationOverview } from '@/components/installation/InstallationOverview'
import { DistributionTabs } from '@/components/installation/DistributionTabs'
import { generateMetadata, pageMetadata } from '@/lib/metadata'

// Enhanced SEO metadata for installation page
export const metadata = generateMetadata(pageMetadata.installation)

export default function InstallationPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <InstallationOverview />
        <DistributionTabs />
      </div>
    </main>
  )
}
