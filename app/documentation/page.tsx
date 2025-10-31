import { DocumentationOverview } from '@/components/documentation/DocumentationOverview'
import { DocumentationAccess } from '@/components/documentation/DocumentationAccess'
import { generateMetadata, pageMetadata } from '@/lib/metadata'

// Enhanced SEO metadata for documentation page
export const metadata = generateMetadata(pageMetadata.documentation)

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
