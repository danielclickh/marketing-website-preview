/**
 * @type {import('next').NextConfig}
 */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' https://clickhouselearn.github.io;
  child-src https://clickhouselearn.github.io;
  style-src 'self' https://clickhouselearn.github.io;
  font-src 'self' https://clickhouselearn.github.io;
`

const securityHeaders = [{
  key: 'Content-Security-Policy',
  value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
}]

const nextConfig = {
  assetPrefix: 'https://clickhouselearn.github.io/home/',
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
