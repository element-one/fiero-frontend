const { version } = require('./package.json')
const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    version,
  },
  images: {
    domains: [
      'googleusercontent.com',
      'harpoon-app-dev.s3.us-east-2.amazonaws.com',
      'harpoon-app-prod.s3.us-east-2.amazonaws.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  serverRuntimeConfig: {},
  async rewrites() {
    return process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
          },
        ]
      : []
  },
}

module.exports = nextConfig

module.exports = withSentryConfig(
  module.exports,
  {
    silent: true,
    org: 'glass-fv',
    project: 'drumbeat-frontend',
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
  }
)
