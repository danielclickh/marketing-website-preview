# HomepageHeroAlt-2 component

## Goal
Create a new hero component that matches the attached design (dark theme, centered copy, Langfuse block, Trusted By section) without removing the existing `HomepageHeroAlt`, so we can switch between them.

## Plan

- [x] **1.** Create `src/components/HomepageHeroAlt2` folder with `index.tsx`.
- [x] **2.** Implement dark hero: full-width dark background, centered headline ("The leading" / "database for AI"), description paragraph, two CTAs (Start free cloud trial = yellow, Contact sales = outline).
- [x] **3.** Add Langfuse announcement block below hero (reuse `LogoAnnouncementLink` with `mode="dark"`).
- [x] **4.** Add "CLICKHOUSE IS TRUSTED BY" section with logo carousel (reuse `HomepageSectionTrustedByAlt` with `customerStories`); keep same dark background.
- [x] **5.** No extra styles needed — all handled with Tailwind utilities.
- [x] **6.** On homepage (`src/pages/index.tsx`): import and render `HomepageHeroAlt2` instead of `HomepageHeroAlt`, pass `customerStories`, and commented out the standalone `HomepageSectionTrustedByAlt`. Comments in code explain how to switch back.

## Notes
- Reuse: `CUIButton`, `LogoAnnouncementLink`, `LogoCarouselV2` / `HomepageSectionTrustedByAlt`, `SuiTitle`, `SuiText`, `section-container`.
- Design: dark bg (~neutral-900), white text, yellow primary buttons, outline "Contact sales".
- Contact sales link: use existing contact or pricing URL (check codebase).

---

## Review

### Files changed
- **`src/components/HomepageHeroAlt2/index.tsx`** — New component. Dark full-width hero with centered headline, description, two CTAs, Langfuse announcement block, and Trusted By logo carousel. Reuses existing building blocks (`CUIButton`, `LogoAnnouncementLink`, `HomepageSectionTrustedByAlt`, `SuiTitle`, `SuiText`).
- **`src/pages/index.tsx`** — Swapped `HomepageHeroAlt` + `HomepageSectionTrustedByAlt` for `HomepageHeroAlt2`. Old imports commented out (not deleted) so switching back is trivial.

### How to switch back
1. Uncomment `import HomepageHeroAlt` and `import HomepageSectionTrustedByAlt` in `src/pages/index.tsx`.
2. Replace `<HomepageHeroAlt2 customerStories={customerStories} />` with `<HomepageHeroAlt />` followed by `<HomepageSectionTrustedByAlt customerStories={customerStories} />`.
3. Comment out or remove the `HomepageHeroAlt2` import.
