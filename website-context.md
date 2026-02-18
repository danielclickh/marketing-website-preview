# ClickHouse Marketing Website — Full Context

This document describes the two codebases that power the ClickHouse marketing website and how they interact.

| System | Path | Tech | Purpose |
|---|---|---|---|
| **Marketing Website** | `marketing-website/` | Next.js 14 (Pages Router) | The public-facing website at `clickhouse.com` |
| **CMS** | `clickhouse-website/cms/` | Strapi 4.24 | Headless CMS that stores and serves content |

---

## 1. Architecture Overview

```
┌──────────────────────────┐         ┌──────────────────────────┐
│   Strapi CMS             │         │   Next.js Website        │
│   (clickhouse-website/   │  REST   │   (marketing-website/)   │
│    cms/)                 │ ──────> │                          │
│                          │  API    │   SSG / ISR via Vercel   │
│   MySQL database         │         │                          │
│   Port 1337              │         │   Port 3005 (dev)        │
└──────────┬───────────────┘         └──────────┬───────────────┘
           │                                    │
           │  Webhook (POST)                    │
           └────────────────────────────────────┘
             On content change, Strapi fires
             a webhook to /api/strapi-revalidate-webhook
             which triggers ISR revalidation
```

**Data flows one direction**: Strapi CMS → Next.js website. The website fetches content from Strapi's REST API at build time (SSG) and revalidates via ISR when content changes. The website never writes back to Strapi.

---

## 2. The CMS (`clickhouse-website/cms/`)

### Stack
- **Strapi 4.24.0** (headless CMS framework)
- **MySQL** database (`clickhouse_website`)
- **Node.js** 18–20

### Content Types (54 total)

The most important content types that the website consumes:

| Content Type | API ID | Description |
|---|---|---|
| **Blog Post** | `blog-posts` | Blog articles with dynamic zone sections |
| **Page** | `pages` | CMS-driven pages rendered via the catch-all `[...slug]` route |
| **Author** | `authors` | Writer profiles linked to blog posts and resources |
| **Event** | `events` | Company events with agendas, locations, forms |
| **Resource** | `resources` | Categorized resources (guides, engineering articles, etc.) |
| **Resource Category** | `resource-categories` | Categories for resources |
| **Integration** | `integrations` | Third-party integrations with support levels and logos |
| **Marketing Video** | `marketing-videos` | Video content with YouTube/Vimeo IDs |
| **Demo** | `demos` | Interactive demo entries |
| **User Story** | `user-stories` | Customer case studies |
| **News Item** | `news-items` | Press coverage and announcements |
| **OpenHouse** | `openhouses` | ClickHouse OpenHouse event pages |
| **In-Product Announcement** | `in-product-announcements` | Announcements shown inside ClickHouse Cloud console |
| **Global Announcement** | `global-announcements` | Header announcement banners with optional country targeting |
| **Pricing V2** | `pricing-v2` | Pricing plans, providers, and packages (single type) |

**Single types** (global config, not collections): `homepage`, `blog`, `cloud`, `click-house`, `footer`, `header`, `contact-us`, `our-story`, `pricing`, `career`, `demos-page`, `getting-started`, `newsletter-form`, `news-and-event`, `use-case`, `use-case-feature`.

### Dynamic Zones

Blog posts and pages use Strapi's **dynamic zones** — ordered lists of typed content blocks:

**Blog modules** (`blog-modules.*`):
- `markdown` — Rich text / markdown body
- `cta` — Call-to-action block
- `code-block` — Syntax-highlighted code (with language, runnable flag)
- `faqs` — FAQ accordion
- `youtube-video` — YouTube embed
- `video` — Self-hosted video with sources
- `image-gallery` — Image gallery
- `marketo-form` — Marketo form embed
- `summary` — Summary block

**Page modules** (`page-modules.*`):
- `markdown` — Rich text with optional heading anchors
- `cta-block` — CTA with primary/secondary links
- `waitlist-form` — Marketo waitlist form
- `faqs` — FAQ accordion
- `standard-cards` — Card grid
- `legal` — Legal content

### Reusable Components (133 total)

Strapi components are reusable field groups (not React components). Key ones:
- `global.seo` — SEO metadata (title, description, image, schema, canonical, robots)
- `global.link` — Reusable link (text, href, target)
- `blog.blog-author` — Author info block
- `blog.blog-promotion` — Promotional banner
- `event.hosted-by`, `event.agenda`, `event.event-location`, `event.event-form`
- `pricing-v2.*` — Pricing plan, provider, data source, use case, perk, package

### Lifecycle Hooks

- **Blog posts**: Auto-calculate `reading_time` field after create/update based on word count across content + dynamic zone sections. Uses the `countable` library.
- **Resources**: Validate thumbnail requirement based on category's `requiresThumbnail` setting.
- **In-product announcements**: Validate no overlapping date ranges.

### Custom Plugins

1. **`clickhouse-algolia`** — Syncs content to Algolia search index (`marketing_site`). Transforms blog posts, demos, events, integrations, videos, resources, and resource categories. Filters out staging-only and Japanese content.

2. **`non-blocking-validation`** — Shows admin panel warnings (non-blocking). Currently validates that blog posts include at least one CTA.

### Configuration

- **Deep populate plugin** (`@magictm/strapi-plugin-deep-populate`): Configured with `minDepth: 10`, `maxDepth: 15`. Enables `?populate=deep` query parameter for fetching nested relationships without manually specifying each level.
- **API limits**: Default 1000, max 1000, `withCount: true`.
- **CORS**: Wide open (`origin: ['*']`).
- **Database scripts**:
  - `npm run dump` — Dumps your local MySQL to `clickhouse_website_dump.sql` (commit this in PRs after CMS changes)
  - `npm run restore` — Restores from the committed `clickhouse_website_dump.sql` into local MySQL
  - `npm run restore-staging` — Pulls directly from the **production** database into local MySQL (also updates the dump file). Requires `STAGING_DATABASE_*` credentials in `cms/.env`.

### Staging Content

Many content types have a `StagingOnly` (or `stagingOnly`) boolean field. When `true`, the content is only visible on staging environments. The website filters this based on `NEXT_PUBLIC_IS_PROD`.

---

## 3. The Marketing Website (`marketing-website/`)

### Stack
- **Next.js 14.2.35** (Pages Router, with minimal App Router for sitemap/RSS)
- **React 18.2.0** + **TypeScript 5.7.3**
- **Tailwind CSS** with custom theme
- **Deployed on Vercel**

### Directory Structure

```
src/
├── app/                    # App Router (sitemap.ts, rss.xml, llms.txt only)
├── components/             # Main component library (~110 components)
├── components-cleaned/     # Refactored component library (~61 components)
├── data/                   # Static data (comparisons, learn resources)
├── fonts/                  # Custom fonts
├── hooks/                  # React hooks
├── lib/                    # Utilities and API clients
│   ├── api/strapi/         # Strapi REST client (the core CMS integration)
│   ├── galaxy/             # Galaxy 3D visualization
│   ├── m3ter/              # M3ter pricing API
│   ├── utils/              # General utilities
│   └── videos/             # Video helpers
├── pages/                  # Pages Router (135+ pages)
│   ├── api/                # API routes (webhook, blog markdown, videos, image)
│   ├── blog/               # Blog listing and posts
│   ├── cloud/              # Cloud product pages
│   ├── company/            # Company pages (careers, contact, events, news)
│   ├── comparison/         # Competitor comparison pages
│   ├── industries/         # Industry-specific pages
│   ├── integrations/       # Integration catalog
│   ├── jp/                 # Japanese localization (parallel routes)
│   ├── resources/          # Resource center
│   ├── use-cases/          # Use case pages
│   ├── videos/             # Video catalog
│   └── [...slug].tsx       # Catch-all for CMS-driven pages
├── styles/                 # Global SCSS styles
└── types/                  # TypeScript definitions
    └── strapi.d.ts         # Comprehensive Strapi type definitions (~13k lines)
```

### Key Pages and How They Get Data

| Route | Data Source | Rendering |
|---|---|---|
| `/` (homepage) | `getStaticProps` → Strapi (`homepage`, customer stories) | SSG + ISR |
| `/blog` | Client-side via Algolia search | SSG shell |
| `/blog/[slug]` | `getStaticProps` → Strapi (`blog-posts`) | SSG + ISR |
| `/company/events` | `getStaticProps` → Strapi (`events`) | SSG + ISR |
| `/company/events/[slug]` | `getStaticProps` → Strapi (`events`) | SSG + ISR |
| `/integrations` | `getStaticProps` → Strapi (`integrations`) | SSG + ISR |
| `/integrations/[slug]` | `getStaticProps` → Strapi (`integrations`) | SSG + ISR |
| `/videos` | `getStaticProps` → Strapi (`marketing-videos`) | SSG + ISR |
| `/resources/[category]/[slug]` | `getStaticProps` → Strapi (`resources`) | SSG + ISR |
| `/pricing` | `getStaticProps` → Strapi (`pricing-v2`) + M3ter API | SSG + ISR |
| `/[...slug]` (catch-all) | `getStaticProps` → Strapi (`pages`) | SSG + ISR (`fallback: 'blocking'`) |
| `/comparison/[slug]` | `getStaticProps` → static data in `src/data/` | SSG |
| `/jp/*` | Same as English equivalents but with Japanese content | SSG + ISR |

### The Catch-All Route (`[...slug].tsx`)

Any URL not matched by a specific page file falls through to `src/pages/[...slug].tsx`. This route queries Strapi's `pages` content type by `path` field. Content editors can create arbitrary pages in the CMS by setting a `path` value (e.g., `legal/privacy-policy`), and the website will render them automatically using `StrapiDynamicPageModules` to assemble the page from dynamic zone sections.

### components/ vs components-cleaned/

The codebase has two component directories:
- **`components/`** — The original component library (~110 components). Contains the primary layout, navigation, forms, and page-specific components.
- **`components-cleaned/`** — A newer, refactored set (~61 components). Contains cleaned-up versions of some components, plus CMS-specific renderers like `StrapiDynamicBlogModules` and `StrapiDynamicPageModules`, `StrapiImage`, etc.

Both are actively used. The migration from `components/` to `components-cleaned/` appears to be gradual and ongoing.

### Tailwind Theme

Custom design tokens in `tailwind.config.js`:
- **Colors**: `ch-yellow` (#EBFF00), `ch-teal` (#003D30), `primary-300` (accent yellow), extensive `neutral` scale
- **Breakpoints**: Standard + custom mid-breakpoints (`sm-mid: 480px`, `md-mid: 880px`, `lg-mid: 1100px`, `xl-mid: 1420px`)
- **Fonts**: Inter (sans), Inconsolata (mono), Basier (display)
- **Plugins**: `@tailwindcss/typography` (with dark/light prose), custom gradient masks, hover variants

---

## 4. How They Connect — The Integration Layer

### 4.1 Strapi REST Client (`src/lib/api/strapi/index.ts`)

The core integration. All CMS data fetching goes through this module.

**Configuration**:
- API URL: `STRAPI_API_URL` env var (default: `https://cms.clickhouse-dev.com:1337`)
- Auth: Bearer token via `STRAPI_API_KEY` env var

**Key functions**:
- `request(path, params)` — Raw fetch with auth, query string serialization (via `qs`), and in-memory caching during builds
- `findAll(path, params)` — Fetch paginated list, cleans Strapi response format
- `findOne(path, params)` — Fetch single entry
- `fetchAll(path, params)` — Recursively fetches all pages of a paginated result
- `cleanStrapiObject(element)` — Transforms Strapi's nested `{ data: { id, attributes: { ... } } }` format into flat objects
- `getStagingOnlyFilters()` — Returns filter to exclude staging content in production
- `getAbsoluteMediaUrl(path)` — Converts relative upload paths to absolute CMS URLs
- `getProxiedMediaUrl(path)` — Converts to proxied URL via the website's `/uploads/` rewrite

**Service classes** (pre-configured `StrapiEntryService<T>` instances):
- `blogService` — Blog posts (staging-filtered, deep populate)
- `resourcesService` — Resources (staging-filtered, deep populate)
- `eventsService` — Events (staging-filtered, deep populate)
- `pagesService` — Dynamic pages (staging-filtered, deep populate)
- `marketingVideosService` — Videos (deep populate)
- `authorsService` — Authors (deep populate)
- `resourceCategoriesService` — Resource categories (deep populate)

### 4.2 Media Proxy (`next.config.js` rewrites)

Strapi-hosted uploads are proxied through the website so they appear to come from `clickhouse.com`:

```
/uploads/:path* → {STRAPI_API_URL}/uploads/:path*
```

This means CMS media URLs like `/uploads/image.png` are served via the website's domain. Next.js image optimization is also configured to accept images from the CMS hostname.

### 4.3 API Proxy (fallback rewrite)

The website also proxies Strapi's API as a fallback:

```
/api/:path* → {STRAPI_API_URL}/api/:path*
```

This means any `/api/` request not handled by a Next.js API route falls through to Strapi. This is used for things like the in-product announcement endpoint (`/api/in-product-announcement/current`) which the ClickHouse Cloud console calls directly.

### 4.4 ISR Revalidation Webhook

When content changes in Strapi, a webhook fires a POST request to:

```
POST /api/strapi-revalidate-webhook
Header: isr-auth-token: {STRAPI_WEBHOOK_TOKEN}
Body: { uid: "api::blog-post.blog-post", entry: { slug: "...", ... } }
```

The webhook handler in `src/pages/api/strapi-revalidate-webhook.ts`:
1. Validates the auth token
2. Looks up the content type UID in a handler map
3. Determines which pages need revalidation based on the content type and entry data
4. Calls `response.revalidate(path)` for each affected page
5. Returns immediately (revalidation runs asynchronously via `waitUntil`)

**Content type → page mappings** (examples):
- `blog-post` change → revalidates `/blog/{slug}`, `/jp/blog/{slug}`, author pages, `/openhouse`
- `event` change → revalidates `/company/events`, `/company/events/{slug}`, `/learn`
- `page` change → revalidates `/{path}`
- `homepage` change → revalidates `/`, plus many pages that use homepage data (use cases, comparisons, learn pages, etc.)
- `integration` change → revalidates `/integrations`, `/integrations/{slug}`, JP equivalents

### 4.5 Blog Markdown API

Blog posts are also served as markdown at `/blog/{slug}.md` (rewritten to `/api/blog/{slug}`). This API route:
1. Fetches the blog from Strapi
2. Generates front matter (title, date, author, category, excerpt)
3. Converts dynamic zone sections to markdown via `strapiDynamicBlogModulesMarkdown()`
4. Appends the standard content field
5. Rewrites CMS media URLs to proxied absolute URLs
6. Returns with aggressive CDN caching (`s-maxage=31536000, stale-while-revalidate`)

This is used to serve blog content in a crawlable, portable format.

### 4.6 Global Announcement Banner (Client-Side Fetched)

The header announcement banner is powered by the `global-announcement` collection type in Strapi and fetched **client-side** so changes are reflected immediately without a build (~60s CDN cache).

**Flow:**
1. `Header` component detects visitor's country via ipinfo.io (cached in cookie)
2. Fetches `GET /api/announcement?country={code}` — a Next.js API route
3. The API route queries Strapi for all enabled `global-announcements` and applies resolution logic:
   - If an entry's `country` field (comma-separated codes) matches the visitor, use it
   - Otherwise, fall back to the first entry with no `country` set (global default)
4. Returns `{ text, url }` or `{}` if nothing enabled

This replaces the previously hardcoded banner values in `Header/index.tsx` and the commented-out Japan-specific override.

---

## 5. Search (Algolia)

Search is powered by Algolia with a dual-sync approach:

### CMS-side (real-time sync)
The `clickhouse-algolia` Strapi plugin syncs content to the `marketing_site` Algolia index whenever content is created, updated, or deleted. It transforms each content type into a normalized search record with `type`, `title`, `description`, `datetime`, and `attributes`.

### Website-side (build-time sync)
The `sync-algolia` script (run during deploy via `npm run deploy`) builds and pushes an additional search index from the website side. This catches content that isn't in Strapi (static pages, comparisons, etc.).

### Client-side search
The website uses `algoliasearch` and `react-instantsearch` for client-side search, powered by a `GlobalSearchProvider` component. The Algolia app ID and search API key are public env vars.

---

## 6. Other External Services

| Service | Purpose | Integration Point |
|---|---|---|
| **Algolia** | Full-text search | CMS plugin + website build script + client-side |
| **GrowthBook** | A/B testing / feature flags | Client-side SDK (`NEXT_PUBLIC_GROWTHBOOK_*`) |
| **M3ter** | Cloud pricing API | `src/lib/m3ter/` — fetched at build time for pricing page |
| **Stripe** | Payment buttons | Client-side (`NEXT_PUBLIC_STRIPE_BUTTON_PUBLISHABLE_KEY`) |
| **Marketo** | Marketing forms | Embedded forms in blog/event/page modules |
| **Vercel** | Hosting and deployment | ISR, edge functions, cron jobs |
| **GitHub API** | Star count for header | Build-time script (`create-githubstars-file`) → `public/githubApiData.json` |
| **Slack** | Notifications | `SLACK_TOKEN` env var |

---

## 7. Build and Deploy Pipeline

### Development
```bash
# Marketing website (port 3005)
cd marketing-website && npm run dev

# CMS (port 1337)
cd clickhouse-website/cms && npm run develop
```

The dev server connects to the CMS at `STRAPI_API_URL` (default: `https://cms.clickhouse-dev.com:1337`). For local CMS development, change this to `http://localhost:1337`.

### Production Build
The `npm run deploy` script runs:
1. `create-githubstars-file` — Fetch GitHub star count
2. `create-pricing-file` — Fetch pricing data from M3ter
3. `next build` — Build the static site (fetches all content from Strapi)
4. `build-index` — Build the search index JSON
5. `sync-algolia` — Push search index to Algolia

### Vercel Cron
A cron job runs every 10 minutes at `/api/checkInstallScript` to monitor the install script.

---

## 8. Internationalization

Japanese localization lives under the `/jp/` route prefix. The approach is **parallel routes** — separate page files in `src/pages/jp/` that mirror the English structure. Content in Strapi is filtered by category (e.g., blog posts with `category: "Japanese"` render at `/jp/blog/`).

The sitemap generator (`src/app/sitemap.ts`) merges Japanese and English entries with `hreflang` alternates.

---

## 9. Type Safety

The website has comprehensive TypeScript types for all Strapi content in `src/types/strapi.d.ts` (~13,000 lines). This includes:
- All content type interfaces (`EntryBlogPost`, `EntryResource`, `EntryEvent`, etc.)
- All component interfaces (`ComponentSeo`, `BlogModules`, `PageModules`, etc.)
- Type-safe API request parameters (`ApiRequestParams<T>`, `ApiFilters<T>`)
- Type-safe populate and field path helpers (`PopulatePath<T>`, `DotPath<T>`)

The `StrapiEntryService<T>` class is generic, providing type-safe CRUD for each content type.

---

## 10. Key Environment Variables

### Marketing Website
| Variable | Purpose |
|---|---|
| `STRAPI_API_URL` | CMS base URL (default: `https://cms.clickhouse-dev.com:1337`) |
| `STRAPI_API_KEY` | Bearer token for CMS API auth |
| `STRAPI_WEBHOOK_TOKEN` | Shared secret for ISR webhook validation |
| `NEXT_PUBLIC_IS_PROD` | `"true"` in production — controls staging content filtering |
| `ALGOLIA_ADMIN_KEY` | Algolia admin key for index sync |
| `NEXT_PUBLIC_ALGOLIA_APP_ID` | Algolia app ID for search |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` | Algolia search-only key |
| `M3TER_*` | M3ter API credentials for pricing |
| `NEXT_PUBLIC_GROWTHBOOK_*` | GrowthBook A/B testing config |

### CMS
| Variable | Purpose |
|---|---|
| `DATABASE_HOST/PORT/NAME/USERNAME/PASSWORD` | MySQL connection |
| `ALGOLIA_APP_ID` / `ALGOLIA_ADMIN_KEY` | Algolia sync (plugin disabled if not set) |
| `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT` | Strapi security |
