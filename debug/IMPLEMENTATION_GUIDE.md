# WolfGuard Layout Fixes - Implementation Guide

This guide provides step-by-step instructions to implement the critical and high-priority fixes identified in the layout analysis.

---

## Critical Priority: Mobile Navigation Menu

### Issue
Mobile users (< 640px) cannot access navigation links (Features, Quick Start, Documentation, Links) because they're hidden without a hamburger menu.

### Implementation

**File**: `/opt/projects/repositories/wolfguard-site/src/components/Header.tsx`

**Step 1**: Update imports
```tsx
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,       // ADD
  NavbarMenuItem,   // ADD
  NavbarMenuToggle, // ADD
  Button,
  Link,
} from '@heroui/react';
import { ThemeSwitch } from './ThemeSwitch';
```

**Step 2**: Replace entire component with this updated version:

```tsx
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: 'Features', href: '#features', external: false },
    { label: 'Quick Start', href: '#quickstart', external: false },
    { label: 'Documentation', href: 'https://docs.wolfguard.io/', external: true },
    { label: 'Links', href: '#links', external: false },
  ];

  return (
    <Navbar
      isBordered
      maxWidth="xl"
      className="bg-background/70 backdrop-blur-md"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Mobile Menu Toggle - ONLY visible on mobile */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <img
              src="/logo-small.png"
              alt="WolfGuard Logo"
              className="w-8 h-8 object-contain"
            />
            <p className="font-bold text-xl text-foreground">WolfGuard</p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation - hidden on mobile */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.label}>
            <Link
              color="foreground"
              href={item.href}
              isExternal={item.external}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right side items - always visible */}
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="https://github.com/dantte-lp/wolfguard"
            variant="flat"
            isExternal
            className="font-semibold"
          >
            GitHub
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu - slides in from right */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              color="foreground"
              className="w-full text-lg"
              href={item.href}
              isExternal={item.external}
              size="lg"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Button
            as={Link}
            color="primary"
            href="https://github.com/dantte-lp/wolfguard"
            variant="flat"
            isExternal
            className="w-full font-semibold mt-4"
            size="lg"
          >
            GitHub Repository
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
```

**Testing**:
1. Open site on mobile device or resize browser to < 640px
2. Click hamburger menu icon (top-left)
3. Verify menu slides in from right
4. Click each navigation link
5. Verify menu closes after clicking
6. Test on iPhone SE, Android phone

---

## High Priority: Fix Documentation Links

### Issue 1: Hero Section Documentation Button

**File**: `/opt/projects/repositories/wolfguard-site/src/components/Hero.tsx`

**Line 81-90**: Update the Documentation button:

```tsx
<Button
  as={Link}
  href="https://docs.wolfguard.io/"  // CHANGED from "#"
  variant="light"
  size="lg"
  isExternal                          // ADDED
  className="font-semibold min-w-[200px]"
  aria-label="View WolfGuard documentation"
>
  Documentation
</Button>
```

### Issue 2: QuickStart Section Documentation Button

**File**: `/opt/projects/repositories/wolfguard-site/src/components/QuickStart.tsx`

**Line 270-277**: Update the button:

```tsx
<Button
  as={Link}                           // ADDED
  href="https://docs.wolfguard.io/"  // ADDED
  color="primary"
  variant="flat"
  isExternal                          // ADDED
  className="font-semibold"
  aria-label="View full WolfGuard documentation"
>
  View Full Documentation
</Button>
```

### Issue 3: Links Section Documentation Card

**File**: `/opt/projects/repositories/wolfguard-site/src/components/Links.tsx`

**Line 24-34**: Update the documentation link object:

```tsx
{
  title: 'Documentation',
  description: 'Comprehensive guides, API reference, and tutorials.',
  url: 'https://docs.wolfguard.io/',  // CHANGED from '#'
  external: true,                       // CHANGED from false
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
}
```

**Testing**:
1. Click "Documentation" button in hero section → should open docs site
2. Scroll to Quick Start → click "View Full Documentation" → should open docs site
3. Scroll to Links → click "Documentation" card → should open docs site
4. Verify all open in new tab (isExternal)

---

## Medium Priority: Improve Mobile Hero Layout

### Issue
Stats cards in hero section are cramped on iPhone SE (375px width).

**File**: `/opt/projects/repositories/wolfguard-site/src/components/Hero.tsx`

**Line 94**: Change grid columns:

```tsx
{/* BEFORE */}
<div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">

{/* AFTER */}
<div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
```

**Explanation**:
- `grid-cols-1` on mobile (< 640px) - single column, full width
- `sm:grid-cols-2` on small screens (≥ 640px) - 2 columns
- `md:grid-cols-4` on medium screens (≥ 768px) - 4 columns

**Testing**:
1. View on iPhone SE (375px) - should show single column
2. View on larger mobile (≥ 640px) - should show 2 columns
3. View on tablet/desktop - should show 4 columns

---

## Medium Priority: Improve Hero Button Responsiveness

### Issue
Buttons on mobile could be full-width for better touch targets.

**File**: `/opt/projects/repositories/wolfguard-site/src/components/Hero.tsx`

**Line 46**: Update button container and all three buttons:

```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto">
  <Button
    as={Link}
    href="#quickstart"
    color="primary"
    size="lg"
    className="font-semibold w-full sm:min-w-[200px]"  // ADDED w-full
    aria-label="Get started with WolfGuard"
  >
    Get Started
  </Button>

  <Button
    as={Link}
    href="https://github.com/dantte-lp/wolfguard"
    variant="bordered"
    size="lg"
    isExternal
    className="font-semibold border-2 w-full sm:min-w-[200px]"  // ADDED w-full
    aria-label="View WolfGuard on GitHub"
    startContent={/* ... SVG ... */}
  >
    View on GitHub
  </Button>

  <Button
    as={Link}
    href="https://docs.wolfguard.io/"
    variant="light"
    size="lg"
    isExternal
    className="font-semibold w-full sm:min-w-[200px]"  // ADDED w-full
    aria-label="View WolfGuard documentation"
  >
    Documentation
  </Button>
</div>
```

**Changes**:
- Container: Added `items-stretch sm:items-center` and `w-full sm:w-auto`
- Buttons: Added `w-full` to make them full-width on mobile

---

## Medium Priority: Improve Code Block Mobile UX

### Issue
Code blocks require horizontal scrolling on mobile; copy button can overlap content.

**File**: `/opt/projects/repositories/wolfguard-site/src/components/QuickStart.tsx`

**Apply to all three installation tabs (Debian, RHEL, Arch)**

**Example for Debian tab (Lines 115-139)**:

```tsx
<div className="mt-4 relative">
  <pre className="bg-content2 p-6 pr-14 rounded-xl overflow-x-auto text-xs sm:text-sm border border-divider/50 shadow-sm font-mono">
    <code className="text-foreground/90 whitespace-pre-wrap sm:whitespace-pre">
      {installCommands.debian}
    </code>
  </pre>
  <Button
    isIconOnly
    size="sm"
    variant="flat"
    color="default"
    className="absolute top-2 right-2 shadow-md backdrop-blur-sm bg-background/80"
    onPress={() => copyToClipboard(installCommands.debian, 'debian')}
    aria-label="Copy Debian installation commands"
  >
    {/* ... SVG icons ... */}
  </Button>
</div>
```

**Changes**:
1. Pre element: `pr-14` for copy button space
2. Pre element: `text-xs sm:text-sm` for responsive font sizing
3. Code element: `whitespace-pre-wrap sm:whitespace-pre` (wraps on mobile)
4. Button: `top-2 right-2` (better positioning)
5. Button: `backdrop-blur-sm bg-background/80` (semi-transparent background)

**Repeat for**:
- RHEL tab (Lines 150-174)
- Arch tab (Lines 185-209)
- Configuration example (Lines 224-248)

---

## Medium Priority: Add Skip Navigation Link

### Issue
Screen reader users need a way to skip navigation and jump to main content.

**File**: `/opt/projects/repositories/wolfguard-site/src/App.tsx`

**Step 1**: Add skip link before Header:

```tsx
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip Navigation Link - for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Header />
      <main id="main-content">  {/* ADD id="main-content" */}
        <Hero />
        <Features />
        <QuickStart />
        <Links />
      </main>
      <Footer />
    </div>
  );
};
```

**Testing**:
1. Tab to focus on the page
2. First Tab should show "Skip to main content" button
3. Press Enter - should scroll to main content
4. Works with screen reader

---

## Testing Checklist

After implementing all fixes:

### Mobile Testing (< 640px)
- [ ] Navigation menu opens/closes properly
- [ ] All menu items work
- [ ] Hero buttons are full-width and touchable
- [ ] Stats cards display in single column
- [ ] Code blocks don't require excessive scrolling
- [ ] All documentation links work

### Tablet Testing (768px)
- [ ] Navigation bar displays correctly
- [ ] Hero stats show 2x2 grid then 1x4
- [ ] Feature cards in 2-column layout
- [ ] All interactive elements accessible

### Desktop Testing (1920px)
- [ ] Full navigation visible
- [ ] Hero stats in single row (4 columns)
- [ ] Feature cards in 3-column layout
- [ ] Hover states work correctly

### Accessibility Testing
- [ ] Tab navigation works throughout
- [ ] Skip link appears on first Tab
- [ ] Screen reader announces all content correctly
- [ ] Focus indicators visible
- [ ] All images have alt text

### Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Deployment Steps

1. **Create feature branch**:
   ```bash
   cd /opt/projects/repositories/wolfguard-site
   git checkout -b fix/mobile-navigation-and-links
   ```

2. **Implement fixes** (follow sections above)

3. **Test locally**:
   ```bash
   npm run dev
   # Open http://localhost:5173
   # Test on various screen sizes
   ```

4. **Build and verify**:
   ```bash
   npm run build
   npm run preview
   ```

5. **Commit changes**:
   ```bash
   git add src/components/Header.tsx
   git add src/components/Hero.tsx
   git add src/components/QuickStart.tsx
   git add src/components/Links.tsx
   git add src/App.tsx
   git commit -m "fix: add mobile navigation and update documentation links

   - Add mobile hamburger menu with NavbarMenu component
   - Fix all documentation links (hero, quickstart, links sections)
   - Improve mobile hero button layout (full-width on mobile)
   - Enhance mobile stats cards (single column on small screens)
   - Add skip navigation link for accessibility
   - Improve code block mobile UX with text wrapping"
   ```

6. **Build production container**:
   ```bash
   make build
   # Or: podman build -t localhost/wolfguard-site:latest -f config/docker/Containerfile .
   ```

7. **Test container locally**:
   ```bash
   podman run -d -p 8080:8080 localhost/wolfguard-site:latest
   # Open http://localhost:8080
   ```

8. **Deploy to production**:
   ```bash
   make deploy
   # Or: podman-compose -f config/compose/compose.prod.yaml up -d
   ```

9. **Verify production**:
   - Open https://wolfguard.io/
   - Test mobile navigation
   - Test all documentation links
   - Verify responsive behavior

10. **Run diagnostic tests**:
    ```bash
    cd debug
    podman exec -it wolfguard-debugger node /workspace/scripts/layout-analyzer.js
    ```

---

## Rollback Plan

If issues occur after deployment:

```bash
# Stop new container
podman stop wolfguard-site

# Start previous version
podman start wolfguard-site-backup

# Or rebuild from previous commit
git checkout main
make build
make deploy
```

---

## Performance Monitoring

After deployment, monitor:

1. **Core Web Vitals**:
   - First Contentful Paint (target: < 1.8s)
   - Largest Contentful Paint (target: < 2.5s)
   - Cumulative Layout Shift (target: < 0.1)

2. **Mobile Performance**:
   - Page load time on 3G
   - Time to Interactive
   - Total Bundle Size

3. **User Metrics**:
   - Bounce rate (especially mobile)
   - Navigation clicks
   - Documentation link clicks

---

## Additional Resources

- **Layout Analysis Report**: `/opt/projects/repositories/wolfguard-site/debug/LAYOUT_ANALYSIS_REPORT.md`
- **Screenshots**: `/opt/projects/repositories/wolfguard-site/debug/screenshots/`
- **Diagnostic Tools**: `/opt/projects/repositories/wolfguard-site/debug/README.md`
- **HeroUI Navbar Docs**: https://heroui.com/docs/components/navbar
- **Tailwind CSS 4 Docs**: https://tailwindcss.com/docs

---

**Implementation Time Estimate**: 1-2 hours
**Testing Time Estimate**: 30-60 minutes
**Total**: 2-3 hours end-to-end

Good luck! 🚀
