# Vercel Best Practices - Quick Wins Implementation

## Overview
Implementing the top 3 quick wins from the Vercel React best practices analysis to improve performance.

## Tasks

### 1. Fix Lodash Imports (15 minutes) ⚡ EASIEST
- [ ] Update `src/components/PricingV2/index.tsx:7` - Change `import { throttle } from 'lodash'` to `import throttle from 'lodash/throttle'`
- [ ] Update `src/components/PricingV2/ui/Select/index.tsx:6` - Change `import { isEqual } from 'lodash'` to `import isEqual from 'lodash/isEqual'`
- [ ] **Expected Impact:** -67KB bundle size

### 2. Add Passive Event Listeners (2-4 hours) 🎯 HIGH IMPACT
Add `{ passive: true }` flag to all scroll/resize/wheel event listeners:

#### Scroll Listeners
- [ ] `src/components/Parallax/index.tsx:29` - scroll listener
- [ ] `src/components/ReadingProgress/index.tsx:46` - scroll listener (also fix missing dependency array!)
- [ ] `src/components/TableOfContents/index.tsx:85-86` - scroll and resize listeners
- [ ] `src/components/Header/index.tsx:50` - scroll listener
- [ ] `src/components/OpenHouseHeader/index.tsx:61` - scroll listener
- [ ] `src/components/jp/Header/index.tsx:45` - scroll listener

#### Wheel Listeners
- [ ] `src/components/BlogImage/index.tsx:54` - wheel listener

#### Message Listeners
- [ ] `src/components/MarketoForm/index.tsx:254` - message listener (review if passive is appropriate)

#### Find any other event listeners we might have missed
- [ ] Search codebase for remaining addEventListener calls without passive flag

- [ ] **Expected Impact:** +100-200ms INP improvement, +5-10 Lighthouse points

### 3. Parallelize Data Fetching (3-6 hours) 🚀 BUILD TIME
Convert sequential awaits to Promise.all() in getStaticProps/getServerSideProps:

#### Homepage and Learn Pages
- [ ] `src/pages/index.tsx:36-37` - Parallelize commonProps and data fetch
- [ ] `src/pages/learn/index.tsx:57-67` - Parallelize 3 sequential fetches
- [ ] `src/pages/learn/certification/index.tsx:32-33` - Parallelize sequential fetches

#### Industry Pages
- [ ] `src/pages/industries/energy/index.tsx:32-34` - Parallelize commonProps and stories fetch

#### Other Pages
- [ ] `src/pages/monitorama-2023/index.tsx:34-35` - Parallelize sequential fetches

#### API Routes
- [ ] `src/pages/api/blog/index.ts:46,98,160` - Parallelize categories and featuredBlog fetch

- [ ] **Expected Impact:** -40% build time (2-5 minutes per build)

## Testing Checklist
- [ ] Run `yarn dev` and verify site loads correctly
- [ ] Test scroll performance on pages with parallax/reading progress
- [ ] Test pricing calculator functionality (lodash functions)
- [ ] Run `yarn build` and verify build succeeds
- [ ] Check bundle size with `yarn build:analyze`
- [ ] Test navigation and page transitions

## Review Section
(Will be filled after implementation)

---

**Total Estimated Time:** 5-10 hours
**Total Estimated Impact:**
- Bundle: -67KB
- INP: +100-200ms
- Build time: -40%
- Lighthouse: +5-10 points
