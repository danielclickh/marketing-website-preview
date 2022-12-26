// @ts-check
const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig ={
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['default', 'en'],
    defaultLocale: 'default',
    localeDetection: false,
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
    ]
  },
}

module.exports = nextConfig