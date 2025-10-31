import { Metadata } from 'next'
import { CommunityOverview } from '@/components/contribute/CommunityOverview'
import { RepositoryLinks } from '@/components/contribute/RepositoryLinks'
import { CommunicationChannels } from '@/components/contribute/CommunicationChannels'
import { ContributeGuidelines } from '@/components/contribute/ContributeGuidelines'

export const metadata: Metadata = {
  title: 'Contribute | WolfGuard',
  description:
    'Join the WolfGuard community. Contribute code, report bugs, improve documentation, and help build a secure, modern VPN solution. Open source and welcoming to all skill levels.',
  openGraph: {
    title: 'Contribute to WolfGuard',
    description:
      'Help build the future of secure VPN technology. Contribute to WolfGuard server, documentation, and client development.',
    type: 'website',
  },
}

export default function ContributePage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <CommunityOverview />
        <ContributeGuidelines />
        <RepositoryLinks />
        <CommunicationChannels />
      </div>
    </main>
  )
}
