# Contributing to the ClickHouse Marketing Website

## Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [Yarn](https://yarnpkg.com/) v4+

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ClickHouse/marketing-website.git
cd marketing-website
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

Copy the example env file and fill in the required values:

```bash
cp .env.example .env
```

Most features work without all keys set. The key ones for local development:

| Variable | Purpose |
|---|---|
| `STRAPI_API_URL` | CMS content (defaults to remote staging) |
| `STRAPI_API_KEY` | Required to fetch CMS data |
| `NEXT_PUBLIC_ALGOLIA_*` | Search functionality |

### 4. Generate pre-build data files

These scripts fetch GitHub star counts and pricing data from external APIs. The repo ships with committed snapshots, but you can refresh them:

```bash
yarn pre-build
```

> You only need to re-run this when you want fresh data. The committed files are sufficient for most development work.

### 5. Start the dev server

```bash
yarn dev
```

The site will be available at [http://localhost:3005](http://localhost:3005).

---

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start local dev server on port 3005 |
| `yarn build` | Build for production |
| `yarn pre-build` | Refresh GitHub stars and pricing data files |
| `yarn lint` | Run ESLint and Prettier checks |
| `yarn format` | Auto-format source files with Prettier |
| `yarn build-index` | Build Algolia search index |
| `yarn sync-algolia` | Push search index to Algolia |
| `yarn deploy` | Full production build + index sync |

---

## CMS

Content is managed via Strapi. By default, the dev server points to the remote staging CMS.

To switch to a local CMS instance:

```bash
yarn cms:local    # point to http://localhost:1337
yarn cms:remote   # point back to remote staging
```

These commands edit `.env.local`, so make sure that file exists (you can create it as a copy of `.env`).

> **Note:** These commands use `sed -i ''` (macOS/BSD syntax) and will not work on Linux. On Linux, manually edit the `STRAPI_API_URL` value in `.env.local`.

---

## Pull Requests

- Branch off `main`
- Keep PRs focused — one feature or fix per PR
- Run `yarn lint` before opening a PR
