/**
 * Accessibility utilities and constants for WCAG 2.1 AA compliance
 */

/**
 * Skip link component props
 */
export const SKIP_LINKS = {
  mainContent: {
    href: '#main-content',
    label: 'Skip to main content',
  },
  navigation: {
    href: '#main-navigation',
    label: 'Skip to navigation',
  },
} as const

/**
 * ARIA label constants for common interactive elements
 */
export const ARIA_LABELS = {
  navigation: {
    main: 'Main navigation',
    footer: 'Footer navigation',
    breadcrumb: 'Breadcrumb navigation',
  },
  social: {
    github: 'Visit WolfGuard on GitHub',
    twitter: 'Follow WolfGuard on Twitter',
    linkedin: 'Connect with WolfGuard on LinkedIn',
  },
  theme: {
    toggle: 'Toggle theme',
    light: 'Switch to light theme',
    dark: 'Switch to dark theme',
  },
  menu: {
    open: 'Open navigation menu',
    close: 'Close navigation menu',
  },
} as const

/**
 * Color contrast ratios for WCAG 2.1 AA compliance
 * Normal text: 4.5:1
 * Large text (18pt+/14pt+ bold): 3:1
 * UI components and graphics: 3:1
 */
export const CONTRAST_RATIOS = {
  normalText: 4.5,
  largeText: 3.0,
  uiComponents: 3.0,
} as const

/**
 * Screen reader only CSS utility
 */
export const srOnly =
  'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0' as const

/**
 * Focus visible CSS utility for keyboard navigation
 */
export const focusVisible =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background' as const

/**
 * Accessibility announcement utility
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  if (typeof window === 'undefined') return

  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = srOnly
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement is made
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Check if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.tabIndex > -1) return true

  const focusableTags = ['a', 'button', 'input', 'select', 'textarea']
  const tagName = element.tagName.toLowerCase()

  return focusableTags.includes(tagName) && !element.hasAttribute('disabled')
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(container.querySelectorAll(selector)) as HTMLElement[]
}

/**
 * Trap focus within a container (for modals, dialogs)
 */
export function trapFocus(container: HTMLElement, firstFocusableElement?: HTMLElement) {
  const focusableElements = getFocusableElements(container)
  const firstElement = firstFocusableElement || focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  // If no focusable elements, return early
  if (!firstElement || !lastElement) {
    return () => {
      // No-op cleanup
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus()
        event.preventDefault()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus()
        event.preventDefault()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  // Focus first element
  firstElement.focus()

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}
