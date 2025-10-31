import { CommunityOverview } from '@/components/contribute/CommunityOverview'
import { LatestActivity } from '@/components/contribute/LatestActivity'
import { RepositoryLinks } from '@/components/contribute/RepositoryLinks'
import { CommunicationChannels } from '@/components/contribute/CommunicationChannels'
import { ContributeGuidelines } from '@/components/contribute/ContributeGuidelines'
import { generateMetadata, pageMetadata } from '@/lib/metadata'

// Enhanced SEO metadata for contribute page
export const metadata = generateMetadata(pageMetadata.contribute)

export default function ContributePage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <CommunityOverview />
        <LatestActivity />
        <ContributeGuidelines />
        <RepositoryLinks />
        <CommunicationChannels />
      </div>
    </main>
  )
}
