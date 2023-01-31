// @ts-check
const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig ={
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'app/**/*.module.scss'), path.join(__dirname, 'components/**/*.module.scss')],
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
    ]
  },
}

module.exports = nextConfig
