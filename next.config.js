/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    domains: ["images.ctfassets.net", "cdn.sanity.io","ydnjcrmmrqnylligfbpk.supabase.co"],
  },
};

module.exports = nextConfig;
