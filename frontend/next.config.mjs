// import generateRedirects from '../utils/generateRedirects.mjs'

/** @type {import('next').NextConfig} */
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
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  // async redirects() {
  //   return generateRedirects()
  // },
}

export default nextConfig
