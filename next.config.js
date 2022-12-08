/**
 * @type {import('next').NextConfig}
 */

const debug = process.env.NODE_ENV !== 'production'

const nextConfig = {
  assetPrefix: debug ? '/' : 'https://clickhouse.com/learn/',
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig
