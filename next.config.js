/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        pathname: '/img/wn/**',
      },
    ],
  },
  transpilePackages: ['leaflet'],
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 