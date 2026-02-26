/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "*.replit.dev",
    "*.repl.co",
    "*.janeway.replit.dev",
  ],
};

export default nextConfig;
