// @ts-check
const path = require('path')
const strapiApiUrl =
  process.env.STRAPI_API_URL ?? 'http://cms.clickhouse.com:1337'
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'components/**/*.module.scss'),
      path.join(__dirname, 'pages/**/*.module.scss')
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
  async rewrites() {
    return [
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
        destination: 'http://cms.clickhouse.com:1337/api/:path*'
      },
      {
        source: '/uploads/:path*',
        destination: `${strapiApiUrl}/uploads/:path*`
      },
      {
        source: '/sitemap.xml',
        destination: `${strapiApiUrl}/sitemap/index.xml`
      }
    ]
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
          'https://join.slack.com/t/clickhousedb/shared_invite/zt-1ut4tmoty-TQjXoHtsspfN8xXBpAmLkA',
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
      }
    ]
  }
}

module.exports = nextConfig
