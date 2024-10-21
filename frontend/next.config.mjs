/** @type {import('next').NextConfig} */
import generateRedirects from '../utils/generateRedirects.mjs'
const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  images: {
    remotePatterns: [{hostname: 'cdn.sanity.io'}, {hostname: 'source.unsplash.com'}],
    domains: ['cdn.shopify.com'],
  },
  reactStrictMode: true,
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  async redirects() {
    return generateRedirects()
  },
}

export default nextConfig
