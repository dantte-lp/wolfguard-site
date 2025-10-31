# Accessibility Documentation

## WCAG 2.1 AA Compliance

WolfGuard website is designed to meet WCAG 2.1 Level AA accessibility standards.

## Implemented Features

### 1. Keyboard Navigation

- **Skip Links**: Skip-to-content and skip-to-navigation links for keyboard users
- **Focus Management**: Visible focus indicators on all interactive elements
- **Tab Order**: Logical tab order throughout the site
- **Focus Trapping**: Proper focus management in modals and dialogs

### 2. Screen Reader Support

- **ARIA Labels**: All interactive elements have appropriate ARIA labels
- **ARIA Landmarks**: Proper use of semantic HTML and ARIA landmarks
- **Hidden Decorative Elements**: Decorative images and icons marked with `aria-hidden="true"`
- **Live Regions**: Announcements for dynamic content changes

### 3. Color and Contrast

- **Contrast Ratios**: All text meets WCAG AA standards
  - Normal text: 4.5:1 minimum
  - Large text (18pt+/14pt+ bold): 3:1 minimum
  - UI components: 3:1 minimum
- **Color Independence**: Information not conveyed by color alone

### 4. Semantic HTML

- **Proper Heading Hierarchy**: h1 → h2 → h3 without skipping levels
- **Semantic Elements**: Use of `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
- **Form Labels**: All form inputs have associated labels
- **Button Labels**: All buttons have clear, descriptive labels

### 5. Images and Media

- **Alt Text**: All meaningful images have descriptive alt text
- **Decorative Images**: Decorative images marked as `aria-hidden="true"`
- **SVG Accessibility**: SVG icons properly labeled or hidden from screen readers

## Testing Tools

### Automated Testing

1. **ESLint Plugin**: `eslint-plugin-jsx-a11y` integrated for automated checks
2. **Lighthouse**: Regular audits for accessibility scores
3. **axe DevTools**: Browser extension for in-depth analysis

### Manual Testing

1. **Keyboard Navigation**: Test all interactive elements with Tab, Shift+Tab, Enter, Space
2. **Screen Readers**: Test with NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)
3. **Browser Zoom**: Test at 200% zoom level
4. **Color Blind Simulation**: Test with color blindness simulators

## Accessibility Utilities

### CSS Classes

```css
/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus visible for keyboard navigation */
.focus-visible-ring {
  @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2;
}
```

### TypeScript Utilities

See `/opt/projects/repositories/wolfguard-site/lib/accessibility.ts` for:

- `announceToScreenReader()`: Announce dynamic content to screen readers
- `trapFocus()`: Trap focus within modals/dialogs
- `getFocusableElements()`: Get all focusable elements in a container
- ARIA label constants

## Components

### SkipLinks

Location: `/opt/projects/repositories/wolfguard-site/components/SkipLinks.tsx`

Provides skip navigation links for keyboard users:

- Skip to main content
- Skip to navigation

### Accessible Forms

All form components include:

- Associated labels (explicit or implicit)
- Error messages with `aria-describedby`
- Required field indicators
- Clear focus states

### Theme Toggle

Location: `/opt/projects/repositories/wolfguard-site/components/ThemeSwitch.tsx`

- Proper ARIA labels for current state
- `aria-pressed` attribute for toggle state
- Keyboard accessible

## Best Practices

### Do's

✅ Use semantic HTML elements
✅ Provide text alternatives for images
✅ Ensure sufficient color contrast
✅ Support keyboard navigation
✅ Use ARIA attributes appropriately
✅ Test with real assistive technologies
✅ Maintain logical heading hierarchy
✅ Provide skip links
✅ Make focus visible
✅ Use descriptive link text

### Don'ts

❌ Don't use color alone to convey information
❌ Don't trap focus without escape mechanism
❌ Don't remove focus outlines without replacement
❌ Don't use generic link text ("click here")
❌ Don't skip heading levels
❌ Don't use tables for layout
❌ Don't autoplay audio/video
❌ Don't use very small fonts (<16px for body text)
❌ Don't rely solely on automated testing
❌ Don't forget to test with real users

## Testing Checklist

### Keyboard Testing

- [ ] All interactive elements focusable
- [ ] Focus order is logical
- [ ] Focus indicator is visible
- [ ] No keyboard traps
- [ ] Skip links work
- [ ] Modals can be closed with Escape
- [ ] Dropdowns work with arrow keys

### Screen Reader Testing

- [ ] All images have appropriate alt text
- [ ] Form labels are announced
- [ ] Error messages are announced
- [ ] Headings are properly structured
- [ ] Links are descriptive
- [ ] Dynamic content updates announced
- [ ] Navigation landmarks identified

### Visual Testing

- [ ] Text resizes to 200% without loss of content
- [ ] Color contrast meets WCAG AA
- [ ] Content doesn't rely on color alone
- [ ] Focus indicators are visible
- [ ] Animations respect `prefers-reduced-motion`

## Resources

### WCAG 2.1 Guidelines

- [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1&levels=aa)
- [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Screen Readers

- [NVDA](https://www.nvaccess.org/) (Free, Windows)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Commercial, Windows)
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) (Built-in, macOS/iOS)

## Continuous Improvement

Accessibility is an ongoing process. We regularly:

1. Run automated accessibility audits
2. Conduct manual keyboard testing
3. Test with screen readers
4. Review user feedback
5. Update components based on findings
6. Stay current with WCAG updates

## Reporting Issues

If you discover an accessibility issue:

1. Check if it's already reported in [GitHub Issues](https://github.com/dantte-lp/wolfguard-site/issues)
2. Create a new issue with:
   - Description of the problem
   - Expected behavior
   - Steps to reproduce
   - Browser and assistive technology used
   - Screenshots or videos if applicable

We prioritize accessibility issues and aim to fix them promptly.
