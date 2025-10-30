import { Metadata } from 'next'
import { AboutOverview } from '@/components/about/AboutOverview'
import { ProjectHistory } from '@/components/about/ProjectHistory'
import { Architecture } from '@/components/about/Architecture'
import { Philosophy } from '@/components/about/Philosophy'

export const metadata: Metadata = {
  title: 'About | WolfGuard',
  description:
    'Learn about WolfGuard VPN Server - our mission, history, architecture, and open-source philosophy.',
}

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
