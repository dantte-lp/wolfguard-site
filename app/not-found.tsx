import Link from 'next/link'
import { Button } from '@heroui/react'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-8">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button as={Link} href="/" color="primary" variant="shadow" size="lg">
        Return Home
      </Button>
    </div>
  )
}
