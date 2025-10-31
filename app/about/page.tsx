import { AboutOverview } from '@/components/about/AboutOverview'
import { ProjectHistory } from '@/components/about/ProjectHistory'
import { Architecture } from '@/components/about/Architecture'
import { Philosophy } from '@/components/about/Philosophy'
import { generateMetadata, pageMetadata } from '@/lib/metadata'

// Enhanced SEO metadata for about page
export const metadata = generateMetadata(pageMetadata.about)

export default function AboutPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AboutOverview />
        <ProjectHistory />
        <Architecture />
        <Philosophy />
      </div>
    </main>
  )
}
