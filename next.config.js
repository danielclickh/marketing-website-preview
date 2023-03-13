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
          'https://clickhousedb.slack.com/join/shared_invite/zt-1qv2pq5z9-kWw7R4DIIockiNuOiLGUBg#/shared-invite/email',
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
        source: '/trust/security',
        destination: 'https://trust.clickhouse.com',
        permanent: false
      },
      {
        source: '/blog/en/:path*',
        destination: '/blog/:path*',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
