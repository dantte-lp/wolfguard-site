# WolfGuard Visual Testing Checklist

**Date:** 2025-10-30
**Site:** https://wolfguard.io/
**Purpose:** Verify layout fixes are working correctly

---

## Quick Start

1. Open https://wolfguard.io/ in your browser
2. Go through each section below
3. Check off items as you verify them
4. Report any issues found

---

## Desktop Testing (1920x1080)

Open the site at full desktop resolution and verify:

### Header Behavior
- [ ] Header is visible at the top of the page
- [ ] Header stays at the top when scrolling down (sticky behavior)
- [ ] Header has transparent background with blur effect
- [ ] Logo and navigation items are properly aligned
- [ ] Theme toggle switch works correctly
- [ ] GitHub button is clickable and styled correctly

### Main Content Area
- [ ] Hero section displays properly with gradient background
- [ ] Hero section decorative elements don't overlap header
- [ ] Main content fills the full height between header and footer
- [ ] No awkward white space between sections
- [ ] All sections are horizontally centered (max-width container)

### Features Section
- [ ] Feature cards displayed in 3 columns
- [ ] Cards are properly aligned horizontally
- [ ] Icon, title, and description visible in each card
- [ ] Cards have consistent styling (shadow, border)
- [ ] Hover effects work on cards

**Note:** Cards may have slightly different heights (FIX #5 not applied)

### QuickStart Section
- [ ] Tabs (Debian, RHEL, Arch) are visible and clickable
- [ ] Tab content switches correctly
- [ ] Code blocks are properly styled
- [ ] Code blocks have horizontal scrollbars if needed
- [ ] Code blocks don't cause horizontal page scroll
- [ ] Copy button works (if implemented)

### Links Section
- [ ] All link cards displayed properly
- [ ] Cards in a grid layout
- [ ] Icons/images load correctly
- [ ] Links are clickable

### Footer
- [ ] Footer is anchored to the bottom of the page
- [ ] Footer displays 4 columns: Brand, Project, Community, Resources
- [ ] All links in footer are visible
- [ ] Copyright text and license links visible
- [ ] GitHub icon link works

### Layout Structure
- [ ] No horizontal scrollbar on the page
- [ ] All content stays within viewport width
- [ ] Proper spacing between all sections
- [ ] Consistent padding on left and right sides

### Scrolling Behavior
- [ ] Smooth scrolling throughout the page
- [ ] No layout jumps or shifts while scrolling
- [ ] Header stays fixed/sticky at top during scroll
- [ ] Footer remains at bottom (doesn't float up)
- [ ] Scroll anchors work for in-page navigation

---

## Tablet Testing (768x1024)

Resize browser window to 768px wide or use device emulation:

### Layout Changes
- [ ] Features section shows 2 columns (was 3 on desktop)
- [ ] Footer still shows 4 columns at exactly 768px
- [ ] All content remains readable and accessible
- [ ] No horizontal scrollbar
- [ ] Navigation switches to mobile menu (if applicable)

### Responsive Behavior
- [ ] Layout transitions smoothly when resizing
- [ ] No sudden jumps or reflows
- [ ] Images scale appropriately
- [ ] Text remains readable (not too small)
- [ ] Touch targets are large enough (min 44x44px)

---

## Small Tablet Testing (640-768px)

Resize browser window to 650px wide:

### Footer Grid Transition
- [ ] Footer shows 2 columns (Brand + Project in one row, Community + Resources in another)
- [ ] Footer grid transitions smoothly from 2 to 4 columns at 768px
- [ ] Footer links remain accessible and readable
- [ ] No awkward text wrapping or overlap

**This is the new behavior from FIX #4**

---

## Mobile Testing (375x667)

Resize browser window to 375px wide or use iPhone SE emulation:

### Layout Changes
- [ ] Features section shows 1 column
- [ ] Footer shows 2 columns (FIX #4: sm:grid-cols-2)
- [ ] All sections stack vertically
- [ ] Navigation shows hamburger menu
- [ ] Mobile menu works correctly

### Content Accessibility
- [ ] All text is readable without zooming
- [ ] No horizontal scrollbar on page
- [ ] Code blocks scroll horizontally within their container
- [ ] Images don't overflow container
- [ ] Buttons and links are easy to tap (min 44x44px)

### Mobile-Specific Issues
- [ ] Hero section scales properly
- [ ] Feature cards don't feel cramped
- [ ] Footer columns don't overlap
- [ ] Copyright text fits without wrapping awkwardly
- [ ] Theme toggle switch is accessible

---

## Cross-Browser Testing

Test on multiple browsers (if possible):

### Chrome
- [ ] All checks above pass
- [ ] Flexbox layout works correctly
- [ ] Backdrop blur effect visible

### Firefox
- [ ] All checks above pass
- [ ] Flexbox layout works correctly
- [ ] Backdrop blur effect visible

### Safari
- [ ] All checks above pass
- [ ] Flexbox layout works correctly
- [ ] Backdrop blur effect visible (webkit-backdrop-filter)

### Edge
- [ ] All checks above pass
- [ ] Flexbox layout works correctly

---

## Theme Testing

Test both light and dark themes:

### Light Theme
- [ ] Header background: light with blur
- [ ] Content sections: white background
- [ ] Footer: light background
- [ ] Text: dark color (readable)
- [ ] Cards: light background with shadow

### Dark Theme
- [ ] Header background: dark with blur
- [ ] Content sections: dark background
- [ ] Footer: dark background
- [ ] Text: light color (readable)
- [ ] Cards: dark background with shadow

### Theme Switching
- [ ] Smooth transition between themes
- [ ] No layout shift when switching themes
- [ ] All colors change appropriately
- [ ] Icons remain visible

**Note:** Performance may be slightly laggy during rapid theme switching (known issue)

---

## Browser DevTools Tests

Open DevTools console and run these tests:

### Test 1: Verify Flex Layout
```javascript
const appContainer = document.querySelector('#root > div');
const styles = window.getComputedStyle(appContainer);
console.log('Display:', styles.display);
console.log('Flex Direction:', styles.flexDirection);
```

**Expected:**
```
Display: flex
Flex Direction: column
```

**Result:** [ ] PASS  [ ] FAIL

---

### Test 2: Verify Main Element Growth
```javascript
const main = document.querySelector('main');
const styles = window.getComputedStyle(main);
console.log('Flex Grow:', styles.flexGrow);
console.log('Flex:', styles.flex);
```

**Expected:**
```
Flex Grow: 1
Flex: 1 1 0%
```

**Result:** [ ] PASS  [ ] FAIL

---

### Test 3: Verify Header Z-Index
```javascript
const header = document.querySelector('header');
const navbar = document.querySelector('nav');
const styles = window.getComputedStyle(navbar || header);
console.log('Z-Index:', styles.zIndex);
console.log('Position:', styles.position);
```

**Expected:**
```
Z-Index: 50 (or higher)
Position: sticky or fixed
```

**Result:** [ ] PASS  [ ] FAIL

---

### Test 4: Check for Horizontal Overflow
```javascript
const html = document.documentElement;
const hasOverflow = html.scrollWidth > html.clientWidth;
console.log('Has Horizontal Scroll:', hasOverflow);
console.log('Scroll Width:', html.scrollWidth);
console.log('Client Width:', html.clientWidth);
```

**Expected:**
```
Has Horizontal Scroll: false
Scroll Width: (matches viewport width)
Client Width: (matches viewport width)
```

**Result:** [ ] PASS  [ ] FAIL

---

### Test 5: Measure Layout Performance
```javascript
// Measure layout shift
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('CLS:', entry.value);
  }
});
observer.observe({ entryTypes: ['layout-shift'] });

// Scroll the page and watch for layout shifts
setTimeout(() => observer.disconnect(), 5000);
```

**Expected:** CLS (Cumulative Layout Shift) < 0.1

**Result:** [ ] PASS  [ ] FAIL (CLS value: ______)

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab key navigates through all interactive elements
- [ ] Focus indicators are visible
- [ ] Tab order is logical (header → main content → footer)
- [ ] Enter key activates buttons and links
- [ ] Escape key closes modals/menus (if applicable)

### Screen Reader Testing (if available)
- [ ] Header navigation is announced
- [ ] Section headings are properly announced
- [ ] Links have descriptive text
- [ ] Images have alt text
- [ ] Landmark regions are identified

### Color Contrast
- [ ] Text meets WCAG AA contrast ratio (4.5:1 for normal text)
- [ ] Links are distinguishable from regular text
- [ ] Focus indicators are clearly visible

---

## Performance Testing

### Page Load
- [ ] Initial page load is fast (< 3 seconds)
- [ ] No flash of unstyled content (FOUC)
- [ ] Images load without causing layout shift
- [ ] Fonts load smoothly

### Scrolling Performance
- [ ] Scrolling is smooth (60fps)
- [ ] No jank or stuttering
- [ ] Backdrop blur effect doesn't cause lag
- [ ] Theme switching is responsive (known issue: may lag)

---

## Issues Found

**Document any issues found during testing:**

### Issue 1:
- **Severity:** High / Medium / Low
- **Location:** (which section/component)
- **Description:** (what's wrong)
- **Expected:** (what should happen)
- **Actual:** (what actually happens)
- **Viewport:** Desktop / Tablet / Mobile
- **Browser:** Chrome / Firefox / Safari / Edge

### Issue 2:
- **Severity:** High / Medium / Low
- **Location:**
- **Description:**
- **Expected:**
- **Actual:**
- **Viewport:**
- **Browser:**

---

## Summary

### Overall Result
- [ ] All tests PASSED
- [ ] Some minor issues found (documented above)
- [ ] Major issues found (requires immediate fix)

### Tester Information
- **Name:** _______________________
- **Date:** _______________________
- **Time:** _______________________
- **Browser:** _____________________
- **OS:** __________________________

### Sign-off
- [ ] Layout fixes verified and working correctly
- [ ] Site is production-ready
- [ ] Issues documented and prioritized

---

## Quick Visual Comparison

### Before Fixes
```
Problem: Footer may float up if page has little content

┌──────────────────┐
│ Header           │
├──────────────────┤
│ Main Content     │
│                  │
├──────────────────┤
│ Footer           │ ← May appear in middle of page
│                  │
│ (empty space)    │ ← Awkward white space below
└──────────────────┘
```

### After Fixes
```
Solution: Main grows to fill space, footer anchored to bottom

┌──────────────────┐
│ Header (z-50)    │ ← Sticky with high z-index
├──────────────────┤
│ Main Content     │
│ (flex-1)         │ ← Grows to fill available space
│                  │
│                  │
│                  │
├──────────────────┤
│ Footer           │ ← Always at bottom
└──────────────────┘
```

---

## Notes

- Optional fixes (FIX #5 and FIX #6) were NOT applied
- Feature cards may have slightly different heights
- Code blocks should scroll horizontally within container (but page itself should not scroll horizontally)
- Theme switching may have slight performance lag (known issue, will be addressed separately)

---

**End of Visual Testing Checklist**
