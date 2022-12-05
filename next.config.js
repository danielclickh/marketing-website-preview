const path = require('path')

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    // Add any logic you want here, returning `true` to enable password protect.
    PASSWORD_PROTECT: process.env.ENVIRONMENT === 'staging'
  },
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clickhouse.com',
      },
    ],
  },
  i18n: {
    locales: ['default', 'en'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
