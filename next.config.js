/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/universal-ai-life-os",

  reactStrictMode: true,

  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'api.dicebear.com']
  }
};

module.exports = nextConfig;
