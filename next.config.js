/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.clerk.dev", "cdn.sanity.io"],
  },
};

module.exports = nextConfig;
