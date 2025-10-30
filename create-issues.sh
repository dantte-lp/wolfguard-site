#!/bin/bash

# Sprint 1 Issues

gh issue create --title "US-001: Containerized Development Environment" --label "sprint-1,must-have,infrastructure" --body "**As a** developer
**I want** a fully containerized Node.js development environment
**So that** I can develop without installing Node.js locally

## Acceptance Criteria
- [ ] Dockerfile.dev with Node.js 22 Alpine
- [ ] docker-compose.dev.yaml configured
- [ ] Hot reload working with volume mounts
- [ ] All npm commands run inside containers
- [ ] Development server accessible on port 5173

**Story Points:** 5
**Sprint:** 1
**Priority:** Must Have
**Dependencies:** None"

gh issue create --title "US-002: Project Initialization with Vite + React + TypeScript" --label "sprint-1,must-have,infrastructure" --body "**As a** developer
**I want** a modern React project with TypeScript and Vite
**So that** I have a fast development experience with type safety

## Acceptance Criteria
- [ ] Vite 7.1.12+ configured
- [ ] React 19.2.0+ installed
- [ ] TypeScript 5.7+ with strict mode enabled
- [ ] Project structure created (/src, /public, /components)
- [ ] tsconfig.json configured properly

**Story Points:** 3
**Sprint:** 1
**Priority:** Must Have
**Dependencies:** US-001"

gh issue create --title "US-003: Tailwind CSS 4.1 Integration" --label "sprint-1,must-have,infrastructure" --body "**As a** developer
**I want** Tailwind CSS configured with custom theme
**So that** I can rapidly build responsive UI with cybersecurity aesthetics

## Acceptance Criteria
- [ ] Tailwind CSS 4.1.x+ installed
- [ ] Custom color palette (dark background, neon accents)
- [ ] Typography configuration (sans-serif, monospace for code)
- [ ] Responsive breakpoints configured
- [ ] PurgeCSS enabled for production

**Story Points:** 5
**Sprint:** 1
**Priority:** Must Have
**Dependencies:** US-002"

gh issue create --title "US-004: HeroUI 2.8.5 Components Library" --label "sprint-1,must-have,infrastructure" --body "**As a** developer
**I want** HeroUI component library integrated
**So that** I can use pre-built accessible UI components

## Acceptance Criteria
- [ ] HeroUI 2.8.5+ installed
- [ ] HeroUI Provider configured
- [ ] Theme customization aligned with WolfGuard branding
- [ ] Component imports working
- [ ] Dark theme as default

**Story Points:** 3
**Sprint:** 1
**Priority:** Must Have
**Dependencies:** US-003"

gh issue create --title "US-005: Base Layout Structure (App.tsx)" --label "sprint-1,must-have,ui-component" --body "**As a** developer
**I want** base application layout with routing
**So that** I have a foundation for all pages

## Acceptance Criteria
- [ ] App.tsx created with layout structure
- [ ] React Router configured (if multi-page) or SPA structure
- [ ] Header component slot
- [ ] Footer component slot
- [ ] Main content area

**Story Points:** 3
**Sprint:** 1
**Priority:** Must Have
**Dependencies:** US-004"

gh issue create --title "US-006: Header Navigation Component" --label "sprint-1,must-have,ui-component" --body "**As a** user
**I want** a persistent header with navigation
**So that** I can easily navigate between sections

## Acceptance Criteria
- [ ] Responsive header with WolfGuard logo
- [ ] Navigation menu: Home, About, Installation, Documentation, Compatibility, Contribute
- [ ] GitHub icon link (opens new tab)
- [ ] Mobile: hamburger menu
- [ ] Desktop: horizontal menu
- [ ] Sticky header on scroll

**Story Points:** 5
**Sprint:** 1
**Priority:** Must Have
**Dependencies:** US-005"

gh issue create --title "US-007: Footer Component" --label "sprint-1,must-have,ui-component" --body "**As a** user
**I want** a footer with project information
**So that** I can access licensing and additional links

## Acceptance Criteria
- [ ] Copyright notice (© 2025 WolfGuard)
- [ ] License information (GPLv2)
- [ ] Links: GitHub, Documentation
- [ ] Version/build info display
- [ ] Responsive layout

**Story Points:** 2
**Sprint:** 1
**Priority:** Must Have
**Dependencies:** US-005"

gh issue create --title "US-008: Code Quality Setup (ESLint, Prettier, Husky)" --label "sprint-1,must-have,infrastructure" --body "**As a** developer
**I want** automated code quality tools
**So that** code remains consistent and error-free

## Acceptance Criteria
- [ ] ESLint configured for TypeScript + React
- [ ] Prettier configured with project rules
- [ ] Husky pre-commit hooks setup
- [ ] lint-staged for staged files only
- [ ] npm scripts: lint, format, type-check

**Story Points:** 5
**Sprint:** 1
**Priority:** Must Have
**Dependencies:** US-002"

gh issue create --title "US-009: Theme System (Dark/Light Toggle)" --label "sprint-1,should-have,ui-component" --body "**As a** user
**I want** to toggle between dark and light themes
**So that** I can choose my preferred reading experience

## Acceptance Criteria
- [ ] Theme context/provider created
- [ ] Dark theme (default) with neon accents
- [ ] Light theme alternative
- [ ] Theme toggle button in header
- [ ] Theme preference saved to localStorage
- [ ] Smooth transition between themes

**Story Points:** 3
**Sprint:** 1
**Priority:** Should Have
**Dependencies:** US-006"

# Sprint 2 Issues

gh issue create --title "US-010: Home Page - Hero Section" --label "sprint-2,must-have,page" --body "**As a** visitor
**I want** an impactful hero section on the homepage
**So that** I immediately understand what WolfGuard is

## Acceptance Criteria
- [ ] Headline: \"WolfGuard – Open-Source VPN Server with TLS 1.3 and Cisco Secure Client support\"
- [ ] Subheadline: 1-2 sentences about mission
- [ ] CTA buttons: \"Get Started\" and \"View on GitHub\"
- [ ] Background: subtle cybersecurity-themed graphics
- [ ] Fully responsive
- [ ] Animations on load (Framer Motion)

**Story Points:** 5
**Sprint:** 2
**Priority:** Must Have
**Dependencies:** US-005"

gh issue create --title "US-011: Home Page - Key Benefits Section" --label "sprint-2,must-have,page" --body "**As a** visitor
**I want** to see WolfGuard's key advantages at a glance
**So that** I can quickly evaluate if it fits my needs

## Acceptance Criteria
- [ ] 5 benefit cards: Security, Compatibility, Performance, Cross-Platform, Open-Source
- [ ] Each card: icon, title, 1-sentence description
- [ ] Grid layout (responsive: 1 col mobile, 2-3 cols desktop)
- [ ] Hover animations
- [ ] Icons from HeroUI or icon library

**Story Points:** 5
**Sprint:** 2
**Priority:** Must Have
**Dependencies:** US-010"

gh issue create --title "US-012: About Page - Project Overview" --label "sprint-2,must-have,page" --body "**As a** user
**I want** detailed information about WolfGuard's mission and history
**So that** I understand the project's background

## Acceptance Criteria
- [ ] Goals and mission section
- [ ] Manifest/philosophy principles
- [ ] Project history (fork from ocserv, rebranding)
- [ ] Current project status (alpha/beta, version)
- [ ] License information (GPLv2)
- [ ] Responsive layout

**Story Points:** 5
**Sprint:** 2
**Priority:** Must Have
**Dependencies:** US-005"

gh issue create --title "US-013: About Page - Architecture Overview" --label "sprint-2,must-have,page" --body "**As a** technical user
**I want** to understand WolfGuard's architecture
**So that** I can evaluate its technical design

## Acceptance Criteria
- [ ] Architecture description: C-based, modular
- [ ] wolfSSL/wolfCrypt integration details
- [ ] wolfSentry IDPS integration
- [ ] Cisco AnyConnect protocol support details
- [ ] Performance characteristics
- [ ] Optional: architecture diagram

**Story Points:** 3
**Sprint:** 2
**Priority:** Must Have
**Dependencies:** US-012"

gh issue create --title "US-014: Installation Page - Platform Tabs" --label "sprint-2,must-have,page" --body "**As a** user
**I want** installation instructions for my platform
**So that** I can quickly set up WolfGuard

## Acceptance Criteria
- [ ] Tab navigation: Linux, macOS, Windows, Container
- [ ] Introduction section with requirements
- [ ] Each tab shows platform-specific instructions
- [ ] Code blocks with syntax highlighting
- [ ] Copy button for code snippets
- [ ] Responsive layout

**Story Points:** 8
**Sprint:** 2
**Priority:** Must Have
**Dependencies:** US-005"

gh issue create --title "US-015: Installation Page - Linux Instructions" --label "sprint-2,must-have,page" --body "**As a** Linux user
**I want** detailed Linux installation steps
**So that** I can deploy WolfGuard on Linux servers

## Acceptance Criteria
- [ ] Requirements section (gcc, cmake, dependencies)
- [ ] Build from source instructions
- [ ] Configuration file setup
- [ ] systemd service example
- [ ] Firewall/port configuration
- [ ] Basic user creation example
- [ ] Verification steps

**Story Points:** 5
**Sprint:** 2
**Priority:** Must Have
**Dependencies:** US-014"

gh issue create --title "US-016: Installation Page - Container Deployment" --label "sprint-2,must-have,page" --body "**As a** DevOps engineer
**I want** container-based deployment instructions
**So that** I can quickly deploy WolfGuard with Podman/Docker

## Acceptance Criteria
- [ ] Podman run command example
- [ ] Docker run alternative
- [ ] docker-compose.yaml example
- [ ] Volume mounts for config/certs
- [ ] Port mapping (443 TCP/UDP)
- [ ] Environment variables
- [ ] Build from source in container

**Story Points:** 5
**Sprint:** 2
**Priority:** Must Have
**Dependencies:** US-014"

gh issue create --title "US-017: Framer Motion Animations" --label "sprint-2,should-have,ui-component" --body "**As a** user
**I want** smooth, professional animations
**So that** the site feels modern and polished

## Acceptance Criteria
- [ ] Framer Motion library installed
- [ ] Page transition animations
- [ ] Scroll-triggered animations
- [ ] Hover effects on cards/buttons
- [ ] Fade-in animations for sections
- [ ] Performance optimized (no jank)

**Story Points:** 3
**Sprint:** 2
**Priority:** Should Have
**Dependencies:** US-010, US-011"

# Sprint 3 Issues

gh issue create --title "US-018: Documentation Page - Integration Strategy" --label "sprint-3,must-have,page" --body "**As a** user
**I want** easy access to full documentation
**So that** I can find technical details

## Acceptance Criteria
- [ ] Decision: iframe embed vs redirect to docs.wolfguard.io
- [ ] If iframe: embed with proper styling
- [ ] If redirect: clear messaging before redirect
- [ ] Navigation preserved (header/footer)
- [ ] Responsive iframe (if used)
- [ ] Fallback for iframe load failures

**Story Points:** 5
**Sprint:** 3
**Priority:** Must Have
**Dependencies:** US-005"

gh issue create --title "US-019: Compatibility Page - Cisco Secure Client Support" --label "sprint-3,must-have,page" --body "**As a** user
**I want** to know about Cisco Secure Client compatibility
**So that** I can use existing VPN clients

## Acceptance Criteria
- [ ] Detailed Cisco Secure Client compatibility info
- [ ] Supported versions listed
- [ ] Supported features (auth, DTLS, etc.)
- [ ] Setup instructions
- [ ] Limitations/unsupported features documented
- [ ] Screenshot or example (optional)

**Story Points:** 5
**Sprint:** 3
**Priority:** Must Have
**Dependencies:** US-005"

gh issue create --title "US-020: Compatibility Page - Alternative Clients" --label "sprint-3,must-have,page" --body "**As a** user
**I want** information about other compatible clients
**So that** I have multiple client options

## Acceptance Criteria
- [ ] OpenConnect client support
- [ ] List of other AnyConnect-compatible clients
- [ ] CLI client (wolfguard-client) information
- [ ] Link to CLI client repo/docs
- [ ] Platform-specific client notes

**Story Points:** 3
**Sprint:** 3
**Priority:** Must Have
**Dependencies:** US-019"

gh issue create --title "US-021: Compatibility Page - WolfGuard Connect Roadmap" --label "sprint-3,should-have,page" --body "**As a** user
**I want** to know about the upcoming GUI client
**So that** I can anticipate native client features

## Acceptance Criteria
- [ ] WolfGuard Connect (Qt6 GUI client) announcement
- [ ] Planned features overview
- [ ] Expected timeline (if available)
- [ ] Technology stack (C++/Qt6)
- [ ] Call to action: follow for updates

**Story Points:** 2
**Sprint:** 3
**Priority:** Should Have
**Dependencies:** US-019"

gh issue create --title "US-022: Contribute Page - Community Overview" --label "sprint-3,must-have,page" --body "**As a** potential contributor
**I want** clear guidance on how to contribute
**So that** I can participate in development

## Acceptance Criteria
- [ ] Welcome message to community
- [ ] Ways to contribute: code, bugs, docs, security audit
- [ ] Link to CONTRIBUTING.md (if exists)
- [ ] Code style and testing guidelines
- [ ] PR process overview

**Story Points:** 3
**Sprint:** 3
**Priority:** Must Have
**Dependencies:** US-005"

gh issue create --title "US-023: Contribute Page - Repository Links" --label "sprint-3,must-have,page" --body "**As a** developer
**I want** links to all WolfGuard repositories
**So that** I can explore the codebase

## Acceptance Criteria
- [ ] List of repos with descriptions:
  - wolfguard (server)
  - wolfguard-docs (documentation)
  - wolfguard-client (CLI client)
  - wolfguard-connect (GUI client, if repo exists)
  - wolfguard-site (website)
- [ ] GitHub star/fork buttons
- [ ] Clear descriptions of each repo
- [ ] Links open in new tab

**Story Points:** 2
**Sprint:** 3
**Priority:** Must Have
**Dependencies:** US-022"

gh issue create --title "US-024: Contribute Page - Communication Channels" --label "sprint-3,should-have,page" --body "**As a** community member
**I want** to know how to communicate with the team
**So that** I can ask questions and collaborate

## Acceptance Criteria
- [ ] GitHub Issues link
- [ ] Email contact (if available)
- [ ] Chat/Discord/Slack links (if available)
- [ ] wolfSSL forums mention (if applicable)
- [ ] Response time expectations

**Story Points:** 2
**Sprint:** 3
**Priority:** Should Have
**Dependencies:** US-022"

gh issue create --title "US-025: Blog Page Structure (Optional)" --label "sprint-3,could-have,page" --body "**As a** visitor
**I want** to read news and updates about WolfGuard
**So that** I stay informed about releases and features

## Acceptance Criteria
- [ ] Blog post list page (chronological)
- [ ] Post card: title, excerpt, date, category
- [ ] Individual post page template
- [ ] Author attribution
- [ ] Share buttons (Twitter, LinkedIn)
- [ ] Markdown-based posts
- [ ] RSS feed generation

**Story Points:** 8
**Sprint:** 3
**Priority:** Could Have
**Dependencies:** US-005"

gh issue create --title "US-026: Sample Blog Posts" --label "sprint-3,could-have,page" --body "**As a** content creator
**I want** sample blog posts for testing
**So that** the blog section demonstrates functionality

## Acceptance Criteria
- [ ] 2-3 sample posts created
- [ ] Topics: \"Announcing WolfGuard 1.0\", \"TLS 1.3 Support\", \"Installation Tutorial\"
- [ ] Proper markdown formatting
- [ ] Code examples in technical posts
- [ ] Images/diagrams (optional)

**Story Points:** 3
**Sprint:** 3
**Priority:** Could Have
**Dependencies:** US-025"

gh issue create --title "US-027: 404 Error Page" --label "sprint-3,should-have,page" --body "**As a** user
**I want** a helpful error page when I visit invalid URLs
**So that** I can navigate back to the site

## Acceptance Criteria
- [ ] Custom 404 page styled consistently
- [ ] Friendly error message (wolf-themed humor)
- [ ] Links to: Home, Documentation, GitHub
- [ ] Search functionality (optional)
- [ ] Animations (subtle)

**Story Points:** 2
**Sprint:** 3
**Priority:** Should Have
**Dependencies:** US-005"

# Sprint 4 Issues

gh issue create --title "US-028: SEO Meta Tags" --label "sprint-4,must-have,seo" --body "**As a** site owner
**I want** proper SEO meta tags on all pages
**So that** search engines index the site correctly

## Acceptance Criteria
- [ ] Unique <title> for each page
- [ ] Meta description for each page (~160 chars)
- [ ] Meta keywords (relevant terms)
- [ ] Canonical URLs
- [ ] Language meta tag (en)
- [ ] React Helmet or similar for dynamic meta

**Story Points:** 3
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** All page US"

gh issue create --title "US-029: Open Graph & Social Media Tags" --label "sprint-4,must-have,seo" --body "**As a** site owner
**I want** rich previews when sharing on social media
**So that** links look professional when shared

## Acceptance Criteria
- [ ] og:title for all pages
- [ ] og:description for all pages
- [ ] og:image (1200x630 branded image)
- [ ] og:url for all pages
- [ ] og:type (website/article)
- [ ] Twitter Card meta tags
- [ ] Image hosted and accessible

**Story Points:** 3
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** US-028"

gh issue create --title "US-030: Favicon & Touch Icons" --label "sprint-4,must-have,ui-component" --body "**As a** user
**I want** recognizable icons in browser tabs and bookmarks
**So that** I can easily identify WolfGuard

## Acceptance Criteria
- [ ] favicon.ico (16x16, 32x32)
- [ ] PNG favicons (multiple sizes)
- [ ] apple-touch-icon (180x180)
- [ ] android-chrome icons
- [ ] browserconfig.xml for Windows tiles
- [ ] manifest.json for PWA

**Story Points:** 2
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** None"

gh issue create --title "US-031: WolfGuard Logo Design" --label "sprint-4,must-have,ui-component" --body "**As a** brand manager
**I want** a professional logo for WolfGuard
**So that** the brand is visually identifiable

## Acceptance Criteria
- [ ] Logo concept (wolf + shield/security theme)
- [ ] SVG format for scalability
- [ ] Dark theme version
- [ ] Light theme version
- [ ] Monochrome version
- [ ] Used in header, footer, og:image

**Story Points:** 5
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** US-006"

gh issue create --title "US-032: Sitemap & robots.txt" --label "sprint-4,must-have,seo" --body "**As a** site owner
**I want** sitemap and robots.txt
**So that** search engines crawl the site efficiently

## Acceptance Criteria
- [ ] sitemap.xml generated (all pages)
- [ ] robots.txt created (allow all)
- [ ] robots.txt references sitemap
- [ ] Sitemap submitted to Google Search Console (manual)
- [ ] Dynamic sitemap update for blog posts

**Story Points:** 2
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** All page US"

gh issue create --title "US-033: Accessibility (WCAG 2.1 AA)" --label "sprint-4,must-have,accessibility" --body "**As a** user with accessibility needs
**I want** the site to be accessible
**So that** I can navigate and use all features

## Acceptance Criteria
- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Alt text for all images
- [ ] Keyboard navigation working
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Focus indicators visible
- [ ] Screen reader tested

**Story Points:** 5
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** All component US"

gh issue create --title "US-034: Performance Optimization" --label "sprint-4,must-have,performance" --body "**As a** user
**I want** fast page load times
**So that** I have a smooth experience

## Acceptance Criteria
- [ ] Code splitting implemented
- [ ] Lazy loading for images
- [ ] CSS minification
- [ ] JS minification
- [ ] Tree shaking enabled
- [ ] Bundle size < 200KB (initial)
- [ ] Lighthouse score > 90

**Story Points:** 5
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** All feature US"

gh issue create --title "US-035: Production Docker Build" --label "sprint-4,must-have,infrastructure" --body "**As a** DevOps engineer
**I want** a production-ready container image
**So that** I can deploy WolfGuard site easily

## Acceptance Criteria
- [ ] Multi-stage Dockerfile
- [ ] Stage 1: Build (Node 22, npm run build)
- [ ] Stage 2: Serve (nginx or Node static server)
- [ ] Image size optimized (< 100MB if possible)
- [ ] Health check endpoint
- [ ] Runs with Podman/Docker
- [ ] crun compatibility verified

**Story Points:** 5
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** US-034"

gh issue create --title "US-036: CI/CD Pipeline" --label "sprint-4,must-have,infrastructure" --body "**As a** developer
**I want** automated build and deployment
**So that** changes deploy automatically

## Acceptance Criteria
- [ ] GitHub Actions workflow created
- [ ] Trigger: push to main branch
- [ ] Steps: install, lint, test, build
- [ ] Build container with Buildah
- [ ] Push to GHCR with Skopeo
- [ ] Tag with commit SHA and latest
- [ ] Deployment to wolfguard.io server
- [ ] Health check after deploy

**Story Points:** 8
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** US-035"

gh issue create --title "US-037: Traefik Integration" --label "sprint-4,must-have,infrastructure" --body "**As a** site administrator
**I want** WolfGuard site to work with Traefik reverse proxy
**So that** it's accessible at wolfguard.io with SSL

## Acceptance Criteria
- [ ] Traefik labels in docker-compose
- [ ] Domain: wolfguard.io
- [ ] HTTPS with Let's Encrypt (automatic)
- [ ] HTTP to HTTPS redirect
- [ ] Headers: HSTS, X-Frame-Options, CSP
- [ ] Test in production environment

**Story Points:** 3
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** US-035"

gh issue create --title "US-038: Documentation (README, DEVELOPMENT, DEPLOYMENT)" --label "sprint-4,must-have,infrastructure" --body "**As a** developer
**I want** comprehensive documentation
**So that** I can understand and work with the codebase

## Acceptance Criteria
- [ ] README.md: project overview, quick start
- [ ] DEVELOPMENT.md: dev setup, architecture, contributing
- [ ] DEPLOYMENT.md: production deployment, troubleshooting
- [ ] ARCHITECTURE.md: component structure, data flow
- [ ] All docs in English
- [ ] Code examples included

**Story Points:** 5
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** None"

gh issue create --title "US-039: Testing & QA" --label "sprint-4,must-have,infrastructure" --body "**As a** QA engineer
**I want** to verify all features work correctly
**So that** users have a bug-free experience

## Acceptance Criteria
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] All links functional
- [ ] Forms validation (if any)
- [ ] Animations smooth
- [ ] No console errors
- [ ] Accessibility audit passed

**Story Points:** 5
**Sprint:** 4
**Priority:** Must Have
**Dependencies:** All US"

echo "All GitHub issues created successfully!"
