# WolfGuard Landing Page

Modern, responsive landing page for WolfGuard - a next-generation OpenConnect VPN Server.

## About WolfGuard

WolfGuard is a modern OpenConnect VPN server implementation featuring:

- Modern C23 implementation
- WolfSSL cryptography library
- DTLS 1.3 support
- WolfSentry integration
- Cisco Secure Client 5.x compatibility

**Main Repository:** [github.com/dantte-lp/wolfguard](https://github.com/dantte-lp/wolfguard)

## Tech Stack

- **React** 19.2.0 - UI framework
- **TypeScript** 5.9 - Type safety
- **Vite** 7.1.12 - Build tool
- **HeroUI** 2.8.5 - UI component library
- **Tailwind CSS** 4.1.16 - Styling
- **Framer Motion** - Animations

## Prerequisites

- Node.js 22 or higher
- npm (comes with Node.js)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 3. Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### 4. Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
wolfguard-site/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Features.tsx     # Features showcase
│   │   ├── QuickStart.tsx   # Installation guide
│   │   ├── Links.tsx        # Resource links
│   │   ├── Footer.tsx       # Page footer
│   │   └── ThemeSwitch.tsx  # Dark mode toggle
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies

```

## Features

### Responsive Design
- Mobile-first approach
- Fully responsive across all devices
- Touch-friendly interface

### Dark Mode
- Automatic system preference detection
- Manual toggle with persistent storage
- Smooth theme transitions

### Accessibility
- WCAG 2.1 AA compliant
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Focus management

### Performance
- Code splitting with Vite
- Optimized bundle size
- Tree-shaking enabled
- Fast page loads

## Customization

### Updating Content

Edit the component files in `src/components/` to update:

- **Hero section**: `Hero.tsx` - Update headlines, descriptions, and CTAs
- **Features**: `Features.tsx` - Add/remove/modify feature cards
- **Quick Start**: `QuickStart.tsx` - Update installation commands and examples
- **Links**: `Links.tsx` - Update resource links and external references

### Styling

The project uses Tailwind CSS 4.1.16 with HeroUI 2.8.5:

- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.ts`
- HeroUI theme customization available in `tailwind.config.ts`

### Theme Colors

Default HeroUI color scheme is used:
- Primary: Blue (#006fee)
- Secondary: Purple (#7828c8)
- Success: Green (#17c964)
- Warning: Orange (#f5a524)
- Danger: Red (#f31260)

## Deployment

### Static Hosting

The built site is static and can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect repository or drag & drop `dist/` folder
- **GitHub Pages**: Use GitHub Actions workflow
- **Cloudflare Pages**: Connect repository
- **AWS S3 + CloudFront**: Upload `dist/` contents

### Build Output

Production build creates:
- Minified JavaScript bundles
- Optimized CSS
- Compressed assets
- Source maps disabled for production

## Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve the landing page.

## License

This landing page is open source. Please refer to the main WolfGuard repository for license information.

## Links

- **WolfGuard Repository**: https://github.com/dantte-lp/wolfguard
- **Landing Page Repository**: https://github.com/dantte-lp/wolfguard-site
- **WolfSSL**: https://www.wolfssl.com/
- **OpenConnect**: https://www.infradead.org/openconnect/

## Support

For issues or questions about the landing page, please open an issue in this repository.
For WolfGuard-specific questions, please use the main repository.

---

Built with React, TypeScript, Vite, HeroUI, and Tailwind CSS.
