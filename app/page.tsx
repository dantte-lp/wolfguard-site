import { Hero } from '@/components/Hero'
import { Benefits } from '@/components/Benefits'
import { generateMetadata, pageMetadata } from '@/lib/metadata'

// Enhanced SEO metadata for home page
export const metadata = generateMetadata(pageMetadata.home)

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Benefits />
    </main>
  )
}
