'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip, Spinner } from '@heroui/react'
import { GitCommit, Tag, ExternalLink, Calendar, User } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.6 },
}

interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  html_url: string
  author: {
    login: string
    avatar_url: string
  } | null
}

interface Release {
  id: number
  tag_name: string
  name: string
  published_at: string
  html_url: string
  body: string
  prerelease: boolean
  draft: boolean
}

export function LatestActivity() {
  const [commits, setCommits] = useState<Commit[]>([])
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        // Fetch latest commits
        const commitsResponse = await fetch(
          'https://api.github.com/repos/dantte-lp/wolfguard/commits?per_page=5'
        )
        if (commitsResponse.ok) {
          const commitsData = await commitsResponse.json()
          setCommits(commitsData)
        }

        // Fetch latest releases
        const releasesResponse = await fetch(
          'https://api.github.com/repos/dantte-lp/wolfguard/releases?per_page=3'
        )
        if (releasesResponse.ok) {
          const releasesData = await releasesResponse.json()
          setReleases(releasesData.filter((r: Release) => !r.draft))
        }

        setLoading(false)
      } catch (err) {
        console.error('Error fetching GitHub activity:', err)
        setError('Unable to load activity. Please check GitHub directly.')
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
    return `${Math.floor(diffInSeconds / 31536000)} years ago`
  }

  const truncateMessage = (message: string, maxLength: number = 80) => {
    const firstLine = message.split('\n')[0] || message
    if (firstLine.length <= maxLength) return firstLine
    return firstLine.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <motion.div {...fadeInUp} className="mt-12">
        <Card className="bg-background/60 backdrop-blur-sm border border-border">
          <CardBody className="p-8 flex items-center justify-center min-h-[300px]">
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-default-600">Loading repository activity...</p>
          </CardBody>
        </Card>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div {...fadeInUp} className="mt-12">
        <Card className="bg-background/60 backdrop-blur-sm border border-border">
          <CardBody className="p-8">
            <p className="text-default-600 text-center">{error}</p>
            <div className="flex justify-center mt-4">
              <Button
                as="a"
                href="https://github.com/dantte-lp/wolfguard"
                target="_blank"
                rel="noopener noreferrer"
                variant="flat"
                color="primary"
                endContent={<ExternalLink className="w-4 h-4" />}
              >
                View on GitHub
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div {...fadeInUp} className="mt-12 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-3 text-foreground">Latest Activity</h2>
        <p className="text-default-600">
          Stay up to date with the latest development progress and releases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Commits */}
        <Card className="bg-background/60 backdrop-blur-sm border border-border">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GitCommit className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Latest Commits</h3>
              </div>
              <Button
                as="a"
                href="https://github.com/dantte-lp/wolfguard/commits"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="flat"
                isIconOnly
                aria-label="View all commits"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {commits.length > 0 ? (
                commits.map((commit) => (
                  <a
                    key={commit.sha}
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                        <GitCommit className="w-3 h-3 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {truncateMessage(commit.commit.message)}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-default-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{commit.author?.login || commit.commit.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(commit.commit.author.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-sm text-default-500 text-center py-4">No recent commits found</p>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Latest Releases */}
        <Card className="bg-background/60 backdrop-blur-sm border border-border">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Latest Releases</h3>
              </div>
              <Button
                as="a"
                href="https://github.com/dantte-lp/wolfguard/releases"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="flat"
                isIconOnly
                aria-label="View all releases"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {releases.length > 0 ? (
                releases.map((release) => (
                  <a
                    key={release.id}
                    href={release.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {release.name || release.tag_name}
                        </h4>
                      </div>
                      {release.prerelease && (
                        <Chip size="sm" variant="flat" color="warning">
                          Pre-release
                        </Chip>
                      )}
                    </div>
                    <p className="text-xs text-default-500 mb-2">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {formatDate(release.published_at)}
                    </p>
                    {release.body && (
                      <p className="text-sm text-default-600 line-clamp-2">
                        {release.body.split('\n')[0]}
                      </p>
                    )}
                  </a>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-default-500 mb-4">No releases yet</p>
                  <p className="text-xs text-default-400">
                    The project is under active development. Check back soon for the first release!
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* View Full Activity */}
      <div className="flex justify-center">
        <Button
          as="a"
          href="https://github.com/dantte-lp/wolfguard"
          target="_blank"
          rel="noopener noreferrer"
          variant="bordered"
          color="primary"
          size="lg"
          endContent={<ExternalLink className="w-4 h-4" />}
        >
          View Full Activity on GitHub
        </Button>
      </div>
    </motion.div>
  )
}
