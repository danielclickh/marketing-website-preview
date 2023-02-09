// @ts-check
const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'app/**/*.module.scss'), path.join(__dirname, 'components/**/*.module.scss')],
  },
  async headers() {
    return [
      {
        source: "/:path",
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          { key: 'Cache-Control', value: 'max-age=0, must-revalidate' },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/events/:slug',
        destination: '/company/events/:slug',
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://cms.clickhouse.com:1337/api/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/slack',
        destination: 'https://join.slack.com/t/clickhousedb/shared_invite/zt-1odt9tfm9-buj~8q0lVXwer9hSYO1OHA',
        permanent: true,
      },
      {
        source: '/benchmark/dbms',
        destination: 'https://benchmark.clickhouse.com/',
        permanent: true,
      },
      {
        source: '/clickhouse-cloud',
        destination: '/cloud',
        permanent: true,
      },
      {
        source: '/support/case',
        destination: 'https://support.clickhouse.com',
        permanent: false,
      },
      {
        source: '/trust/security',
        destination: 'https://trust.clickhouse.com',
        permanent: false,
      },
      {
        source: '/legal/agreements/private-preview-terms-of-service',
        destination: '/legal/agreements/terms-of-service',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
