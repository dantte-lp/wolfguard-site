import { Metadata } from 'next'
import { DocumentationOverview } from '@/components/documentation/DocumentationOverview'
import { DocumentationAccess } from '@/components/documentation/DocumentationAccess'

export const metadata: Metadata = {
  title: 'Documentation | WolfGuard',
  description:
    'Complete technical documentation for WolfGuard VPN Server. Architecture, API reference, user guides, configuration, and troubleshooting.',
}

export default function DocumentationPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <DocumentationOverview />
        <DocumentationAccess />
      </div>
    </main>
  )
}
