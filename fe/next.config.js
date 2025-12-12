/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      // If you have other domains like AWS S3 or Supabase, add them here
    ],
  }
};

module.exports = nextConfig;
