/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com'], // Example: Add any external image domains here
  },
};

module.exports = nextConfig;