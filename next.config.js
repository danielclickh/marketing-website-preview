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
}

module.exports = nextConfig
