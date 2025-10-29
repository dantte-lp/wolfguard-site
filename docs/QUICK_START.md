# WolfGuard Landing Page - Quick Start Guide

## Prerequisites
- Node.js 22 or higher

## Install Dependencies
```bash
npm install
```

## Development Commands

### Start Dev Server (with Hot Reload)
```bash
npm run dev
```
Opens at: http://localhost:5173

### Build for Production
```bash
npm run build
```
Output: `dist/` directory

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## Project Info
- **Framework:** React 19.2.0 with TypeScript 5.9
- **UI Library:** HeroUI 2.8.5
- **Styling:** Tailwind CSS 4.1.16
- **Build Tool:** Vite 7.1.12
- **Bundle Size:** ~153 KB gzipped

## File Structure
```
src/
├── components/
│   ├── Header.tsx       # Navigation
│   ├── Hero.tsx         # Hero section
│   ├── Features.tsx     # Features grid
│   ├── QuickStart.tsx   # Installation guide
│   ├── Links.tsx        # Resources
│   ├── Footer.tsx       # Footer
│   └── ThemeSwitch.tsx  # Dark mode toggle
├── App.tsx              # Main app
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Key Features
✅ Responsive design (mobile/tablet/desktop)
✅ Dark/light mode with localStorage
✅ TypeScript strict mode
✅ Code splitting & optimization
✅ WCAG 2.1 AA accessibility
✅ Fast loading (~3s build time)

## Customization

### Update Content
Edit components in `src/components/`:
- `Hero.tsx` - Main headline & CTAs
- `Features.tsx` - Feature cards
- `QuickStart.tsx` - Installation commands

### Update Colors
Edit `tailwind.config.ts`:
```typescript
plugins: [heroui({
  themes: {
    light: { colors: { primary: '#your-color' } },
    dark: { colors: { primary: '#your-color' } }
  }
})]
```

### Add Documentation URL
Replace `#` placeholder links with actual docs URL in:
- `src/components/Hero.tsx`
- `src/components/Links.tsx`
- `src/components/Footer.tsx`

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Manual (Any Static Host)
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## Support
- **Main Repo:** https://github.com/dantte-lp/wolfguard
- **Site Repo:** https://github.com/dantte-lp/wolfguard-site
- **Docs:** See README.md for detailed information

---

**Status:** ✅ Ready for development and production deployment!
