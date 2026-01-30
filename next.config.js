// @ts-check
const path = require('path')
const strapiApiUrl =
  process.env.STRAPI_API_URL ?? 'https://cms.clickhouse-dev.com:1337'
//process.env.STRAPI_API_URL ?? 'http://localhost:1337'
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'src/styles'),
      path.join(__dirname, 'src/components/**/*.module.scss'),
      path.join(__dirname, 'src/pages/**/*.module.scss')
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cms.clickhouse-dev.com',
        port: '1337',
        pathname: '/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3005',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'clickhouse.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '**.clickhouse.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/**'
      }
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          },
          { key: 'Cache-Control', value: 'max-age=0, must-revalidate' }
        ]
      }
    ]
  },
  // @ts-ignore
  async rewrites() {
    // @link https://nextjs.org/docs/13/pages/api-reference/next-config-js/rewrites
    return {
      // These rewrites are checked after headers/redirects
      // and before all files including _next/public files which
      // allows overriding page files
      beforeFiles: [
        // This rewrite fixes an issue with the <Link> component
        {
          source: '/docs/:path*',
          destination: 'https://clickhouse.com/docs/:path*'
        },
        {
          source: '/uploads/:path*',
          destination: `${strapiApiUrl}/uploads/:path*`
        },
        {
          source: '/blog/:slug.md',
          destination: '/api/blog/:slug'
        }
      ],

      // These rewrites are checked after both pages/public files
      // and dynamic routes are checked
      fallback: [
        {
          source: '/events/:slug',
          destination: '/company/events/:slug'
        },
        {
          source: '/en/:path*',
          destination: '/:path*'
        },
        {
          source: '/api/:path*',
          destination: `${strapiApiUrl}/api/:path*`
        }
      ]
    }
  },
  async redirects() {
    return [
      {
        source: '/tutorial(.html)?',
        destination: '/docs/en/quick-start',
        permanent: true
      },
      {
        source: '/reference_en(.html)?',
        destination: '/docs/en/intro',
        permanent: true
      },
      {
        source: '/reference_ru(.html)?',
        destination: '/docs/ru',
        permanent: true
      },
      {
        source: '/slack',
        destination:
          'https://join.slack.com/t/clickhousedb/shared_invite/zt-2nvsplppi-I7FnTTjR9zCLAbOZnyqb4g',
        permanent: true
      },
      {
        source: '/benchmark(.html)?',
        destination: 'https://benchmark.clickhouse.com/',
        permanent: true
      },
      {
        source: '/benchmark/dbms(.html)?',
        destination: 'https://benchmark.clickhouse.com/',
        permanent: true
      },
      {
        source: '/benchmark/hardware(.html)?',
        destination: 'https://benchmark.clickhouse.com/hardware/',
        permanent: true
      },
      {
        source: '/benchmark_hardware(.html)?',
        destination: 'https://benchmark.clickhouse.com/hardware/',
        permanent: true
      },
      {
        source: '/benchmark/versions(.html)?',
        destination: 'https://benchmark.clickhouse.com/versions/',
        permanent: true
      },
      {
        source: '/benchmark_versions(.html)?',
        destination: 'https://benchmark.clickhouse.com/versions/',
        permanent: true
      },
      {
        source: '/clickhouse-cloud',
        destination: '/cloud',
        permanent: true
      },
      {
        source: '/support/case',
        destination: 'https://support.clickhouse.com',
        permanent: false
      },
      {
        source: '/blog/en/:path*',
        destination: '/blog/:path*',
        permanent: true
      },
      {
        source: '/lexicon',
        destination: '/engineering-resources',
        permanent: true
      },
      {
        source: '/company/events/v23-2-release-webinar',
        destination: 'https://www.youtube.com/watch?v=2o0vRMMIrkY',
        permanent: true
      },
      {
        source: '/company/events/v22-12-release-webinar',
        destination: 'https://www.youtube.com/watch?v=sREupr6uc2k',
        permanent: true
      },
      {
        source: '/company/events/202505-global-open-house',
        destination: '/openhouse',
        permanent: true
      },
      {
        source: '/company/events/v21-10-release-webinar',
        destination: 'https://www.youtube.com/watch?v=b9MeoOtAivQ',
        permanent: true
      },
      {
        source: '/company/events/2023-01-26-clickhouse-onboarding-workshop',
        destination: '/company/events/clickhouse-onboarding-workshop',
        permanent: true
      },
      {
        source: '/company/events/v22-3-release-webinar',
        destination: 'https://www.youtube.com/watch?v=GzeANZzPras',
        permanent: true
      },
      {
        source: '/company/events/v22-5-release-webinar',
        destination: 'https://www.youtube.com/watch?v=jkXmXrmjaKQ',
        permanent: true
      },
      {
        source: '/company/events/v21-12-release-webinar',
        destination: 'https://www.youtube.com/watch?v=6qi_S9CEqa4',
        permanent: true
      },
      {
        source: '/company/events/v22-4-release-webinar',
        destination: 'https://www.youtube.com/watch?v=aFQs_zoYoXY',
        permanent: true
      },
      {
        source: '/company/events/cloud-beta',
        destination: 'https://www.youtube.com/watch?v=gpSarJ-R8Iw',
        permanent: true
      },
      {
        source: '/trust/security',
        destination: 'https://trust.clickhouse.com/',
        permanent: true
      },
      {
        source: '/customer-stories',
        destination: '/use-cases',
        permanent: true
      },

      {
        source: '/qr/kubecon-amsterdam-2023',
        destination:
          '/company/events/kubecon-amsterdam-2023?utm_source=kubecon&utm_medium=event&utm_campaign=cup',
        permanent: true
      },
      {
        source: '/blog/the-click-house-community',
        destination: '/slack',
        permanent: true
      },
      {
        source: '/blog/2020/the-clickhouse-community',
        destination: '/slack',
        permanent: true
      },
      {
        source: '/blog/clickhouse-fully-supports-joins',
        destination: '/blog/clickhouse-fully-supports-joins-part1',
        permanent: true
      },
      {
        source: '/blog/clickhouse-fully-supports-joins-part2',
        destination: '/blog/clickhouse-fully-supports-joins-hash-joins-part2',
        permanent: true
      },
      {
        source: '/blog/clickhouse-fully-supports-joins-part3',
        destination:
          '/blog/clickhouse-fully-supports-joins-full-sort-partial-merge-part3',
        permanent: true
      },
      {
        source: '/blog/clickhouse-fully-supports-joins-part4',
        destination: '/blog/clickhouse-fully-supports-joins-direct-join-part4',
        permanent: true
      },
      {
        source: '/company/events/v23-5-release-webinar',
        destination: 'https://www.youtube.com/watch?v=o8Gj1ClU71M',
        permanent: true
      },
      {
        source: '/blog/2021/clickhouse-raises-250m-series-b',
        destination:
          '/blog/click-house-raises-a-250m-series-b-at-a-2b-valuationand-we-are-hiring',
        permanent: true
      },
      {
        source: '/blog/2021/clickhouse-v21.11-released',
        destination: '/blog/click-house-v2111-released',
        permanent: true
      },
      {
        source: '/blog/2018/concept-cloud-mergetree-tables',
        destination: '/blog/concept-cloud-merge-tree-tables',
        permanent: true
      },
      {
        source: '/blog/2021/fuzzing-clickhouse',
        destination: '/blog/fuzzing-click-house',
        permanent: true
      },
      {
        source: '/blog/2021/clickhouse-inc',
        destination: '/blog/introducing-click-house-inc',
        permanent: true
      },
      {
        source: '/blog/2021/performance-test-1',
        destination: '/blog/testing-the-performance-of-click-house',
        permanent: true
      },
      {
        source: '/blog/2021/clickhouse-v21.12-released',
        destination: '/blog/whats-new-in-clickhouse-21-12',
        permanent: true
      },
      {
        source: '/blog/2022/clickhouse-v22.1-released',
        destination: '/blog/whats-new-in-clickhouse-22-1',
        permanent: true
      },
      {
        source: '/blog/2016/yandex-opensources-clickhouse',
        destination: '/blog/yandex-opensources-click-house',
        permanent: true
      },
      {
        source: '/blog/2021/tests-visualization',
        destination:
          '/blog/decorating-a-christmas-tree-with-the-help-of-flaky-tests',
        permanent: true
      },
      {
        source: '/blog/2020/pixel-benchmark',
        destination: '/blog/running-click-house-on-an-android-phone',
        permanent: true
      },
      {
        source: '/blog/2021/reading-from-external-memory',
        destination:
          '/blog/a-journey-to-io_uring-aio-and-modern-storage-devices',
        permanent: true
      },
      {
        source: '/use-cases/logging',
        destination: '/use-cases/observability',
        permanent: true
      },
      {
        source: '/use-cases/logging-and-metrics',
        destination: '/use-cases/observability',
        permanent: true
      },
      {
        source: '/jp/use-cases/logging-and-metrics',
        destination: '/jp/use-cases/observability',
        permanent: true
      },
      {
        source: '/use-cases/business-intelligence',
        destination: '/use-cases/data-warehousing',
        permanent: true
      },
      {
        source: '/support/policy',
        destination: '/legal/support-services-policy',
        permanent: true
      },
      {
        source: '/try',
        destination:
          'https://console.clickhouse.cloud/signUp?utm_medium=video&utm_source=clickhouse&utm_campaign=testimonials',
        permanent: true
      },
      {
        source: '/support/agreement',
        destination: '/legal/agreements/support',
        permanent: true
      },
      {
        source: '/support/professional-services-agreement',
        destination: '/legal/agreements/professional-services',
        permanent: true
      },
      {
        source: '/videos/managing-clickhouse-dictionaires-at-cloudflare',
        destination: '/videos/managing-clickhouse-dictionaries-at-cloudflare',
        permanent: true
      },
      {
        source: '/company/events/202312-amer-clickhouse-fundamentals',
        destination: '/company/events/clickhouse-workshop',
        permanent: true
      },
      {
        source: '/company/events/202311-emea-clickhouse-fundamentals',
        destination: '/company/events/clickhouse-workshop',
        permanent: true
      },
      {
        source: '/company/events/202311-amer-clickhouse-fundamentals',
        destination: '/company/events/clickhouse-workshop',
        permanent: true
      },
      {
        source:
          '/blog/how-clickhouse-powers-ahrefs-the-worlds-largest-web-crawler',
        destination:
          '/blog/how-clickhouse-powers-ahrefs-the-worlds-most-active-web-crawler',
        permanent: true
      },
      {
        source: '/events/202312-amer-clickhouse-fundamentals',
        destination: '/company/events/clickhouse-workshop',
        permanent: true
      },
      {
        source: '/events/202311-emea-clickhouse-fundamentals',
        destination: '/company/events/clickhouse-workshop',
        permanent: true
      },
      {
        source: '/events/202311-amer-clickhouse-fundamentals',
        destination: '/company/events/clickhouse-workshop',
        permanent: true
      },
      {
        source:
          '/blog/optimizing-your-customer-facing-analytics-experience-with-cumul-io-and-clickhouse',
        destination:
          '/blog/optimizing-your-customer-facing-analytics-experience-with-luzmo-and-clickhouse',
        permanent: true
      },
      {
        source:
          '/blog/bluesky-json-bench-clickhouse-vs-mongodb-elasticsearch-duckdb-postgresql',
        destination:
          '/blog/json-bench-clickhouse-vs-mongodb-elasticsearch-duckdb-postgresql',
        permanent: true
      },
      {
        source: '/reinvent-2023',
        destination: '/company/contact',
        permanent: true
      },
      {
        source: '/reinvent-2023/vip-party',
        destination: '/company/contact',
        permanent: true
      },
      {
        source: '/company/events/clickhouse-workshop',
        destination: '/company/events/clickhouse-fundamentals',
        permanent: true
      },
      {
        source: '/blog/index.xml',
        destination: '/rss.xml',
        permanent: true
      },
      {
        source: '/company/events/202402-cloud-update-live',
        destination: '/videos/clickhouse-cloud-update-call-feb2024',
        permanent: true
      },
      {
        source: '/company/events/v24-1-community-release-call',
        destination: 'https://www.youtube.com/watch?v=pBF9g0wGAGs',
        permanent: true
      },
      {
        source: '/careers',
        destination: '/company/careers',
        permanent: true
      },
      {
        source: '/launch-week',
        destination: '/launch-week/may-2024',
        permanent: true
      },
      {
        source: '/launchweek',
        destination: '/launch-week/may-2024',
        permanent: true
      },
      {
        source: '/cloud/azure-waitlist',
        destination: '/cloud',
        permanent: true
      },
      {
        source: '/cloud/clickpipes-postgres-cdc-connector',
        destination: '/cloud/clickpipes/postgres-cdc-connector',
        permanent: true
      },
      {
        source: '/blog',
        has: [
          {
            type: 'query',
            key: 'category',
            value: 'customer-stories'
          }
        ],
        permanent: true,
        destination: '/blog?category=user-stories'
      },
      {
        source: '/media',
        destination: 'https://brandfolder.com/clickhouse/media-kit',
        permanent: true
      },
      {
        source: '/company/news-events',
        destination: '/company/events',
        permanent: true
      },
      {
        source: '/air-gapped',
        destination: '/government',
        permanent: true
      },
      {
        source: '/o11y',
        destination: '/use-cases/observability?loc=o11y',
        permanent: true
      },
      {
        source: '/olly',
        destination: '/use-cases/observability?loc=olly',
        permanent: true
      },
      {
        source:
          '/blog/why-openai-chose-clickhouse-for-petabyte-scale-observability',
        destination:
          '/blog/why-openai-uses-clickhouse-for-petabyte-scale-observability',
        permanent: true
      },
      {
        source: '/company/events/202508-APJ-Manila-Data&AIConference',
        destination: '/company/events/202508-APJ-Manila-DataAIConference',
        permanent: true
      },
      {
        source: '/cloud/hyperdx-waitlist',
        destination: '/cloud/clickstack-private-preview',
        permanent: true
      },
      {
        source: '/houseparty/vegas-2024',
        destination: '/houseparty/the-sql',
        permanent: true
      },
      {
        source: '/cloud/manage/cloud-tiers',
        destination: '/docs/cloud/manage/cloud-tiers',
        permanent: true
      },
      {
        source: '/blog/clickhouse-group-by-parallel-replicas-8900-cores',
        destination: '/blog/clickhouse-parallel-replicas',
        permanent: true
      },
      {
        source: '/lexicon/:path*',
        destination: '/resources/engineering/:path*',
        permanent: true
      },
      {
        source: '/engineering-resources/:path*',
        destination: '/resources/engineering/:path*',
        permanent: true
      }
    ]
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
