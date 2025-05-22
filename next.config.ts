/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
  },
}

module.exports = nextConfig