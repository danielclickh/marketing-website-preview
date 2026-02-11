# Next PR: Lazy Loading Implementation

## Overview
Implement lazy loading for heavy components to reduce initial bundle size by 150-300KB and improve LCP by 500-1000ms.

**Estimated Effort:** 1-2 days
**Priority:** HIGH
**Expected Impact:** Large bundle reduction, significant LCP improvement

---

## Components to Lazy Load

### 1. Animation Components (framer-motion/motion)
**Impact:** ~80-120KB

Files to update:
- `AnimatedFlare` - Used in hero sections
- `AnimatedIntegrationLogos` - Used on integration pages
- `RowOrientedIllustration` - Data structure visualizations
- `ColumnOrientedIllustration` - Data structure visualizations

**Pattern:**
```typescript
import dynamic from 'next/dynamic'

const AnimatedFlare = dynamic(() => import('@/components/AnimatedFlare'), {
  loading: () => <div className="animate-pulse bg-gray-800 rounded" />,
  ssr: false // Animations don't need SSR
})
```

### 2. Chart Components (echarts-for-react)
**Impact:** ~50-80KB

Files to update:
- `src/components/CodeViewer/charts/bar/index.tsx`
- `src/components/CodeViewer/charts/line/index.tsx`
- `src/components/CodeViewer/charts/pie/index.tsx`
- `src/components/CodeViewer/charts/index.tsx`

**Pattern:**
```typescript
const BarChart = dynamic(() => import('./charts/bar'), {
  loading: () => <ChartSkeleton />,
  ssr: false // Charts render client-side only
})
```

### 3. Heavy Diagrams
**Impact:** ~30-50KB

Components:
- `GamingDiagram`
- `BusinessIntelligenceDiagram`
- `MLDiagram`

**Pattern:**
```typescript
const GamingDiagram = dynamic(() => import('@/components/GamingDiagram'), {
  loading: () => <DiagramSkeleton />,
  ssr: true // Keep SSR for SEO if diagrams contain content
})
```

### 4. Complex Forms
**Impact:** ~20-40KB

Components:
- `MarketoForm` - Currently not lazy loaded
- `PocContactForm` - Proof of concept forms

**Pattern:**
```typescript
const MarketoForm = dynamic(() => import('@/components/MarketoForm'), {
  loading: () => <FormSkeleton />,
  ssr: false // Forms are interactive, no SSR needed
})
```

### 5. Other Heavy Components

Additional candidates to review:
- `react-parallax-tilt` - Used in multiple places
- `Swiper` components - Carousels/sliders
- `three.js` components - 3D visualizations (if any)

---

## Implementation Steps

1. **Phase 1: Charts (Day 1 Morning)**
   - Wrap all chart components with `next/dynamic`
   - Create a `ChartSkeleton` loading component
   - Test on pages with charts

2. **Phase 2: Animations (Day 1 Afternoon)**
   - Wrap animation components with `next/dynamic`
   - Create appropriate loading placeholders
   - Test on homepage and landing pages

3. **Phase 3: Forms & Diagrams (Day 2 Morning)**
   - Wrap form and diagram components
   - Create skeleton components
   - Test user flows involving forms

4. **Phase 4: Testing & Verification (Day 2 Afternoon)**
   - Run full build and verify bundle size reduction
   - Use `yarn build:analyze` to visualize bundle changes
   - Test critical user paths
   - Measure LCP improvement with Lighthouse

---

## Testing Checklist

- [ ] Run `yarn build:analyze` before changes (baseline)
- [ ] Implement lazy loading for all components
- [ ] Run `yarn build:analyze` after changes (compare)
- [ ] Verify bundle size reduction (expect 150-300KB)
- [ ] Test homepage loads correctly
- [ ] Test blog pages with charts
- [ ] Test forms still submit correctly
- [ ] Test animations play smoothly
- [ ] Run Lighthouse audits (expect LCP improvement)
- [ ] Test on slow 3G network simulation

---

## Expected Bundle Analysis Results

**Before:**
```
First Load JS shared by all: ~505 KB
Main bundle: ~1.37 MB (for /)
```

**After (Expected):**
```
First Load JS shared by all: ~505 KB
Main bundle: ~1.1-1.2 MB (for /)
Charts/animations: ~150-200 KB (loaded on demand)
```

---

## Success Metrics

| Metric | Before | Target | Measurement |
|--------|--------|--------|-------------|
| Initial Bundle | ~450KB | ~280-300KB | Webpack Bundle Analyzer |
| LCP (Homepage) | 2.5-3.5s | 1.5-2.5s | Lighthouse |
| First Load JS | 1.37 MB | 1.0-1.2 MB | Next.js build output |
| Lighthouse Score | 75-85 | 80-90 | Lighthouse audit |

---

## Notes

- Focus on components that are:
  1. Large (>20KB)
  2. Not needed for initial render
  3. Used on specific pages (not globally)

- Keep these NOT lazy loaded:
  - Core navigation components
  - Header/footer
  - Critical above-the-fold content
  - SEO-critical content

- Consider preloading on hover for perceived performance:
  ```typescript
  <Link
    href="/charts"
    onMouseEnter={() => import('./ChartComponent')}
  >
  ```

---

**Created:** February 11, 2026
**Status:** Planned for separate PR
