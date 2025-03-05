/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/donovanbailey/products/api_featured_images/**',
      },
    ],
  },
  reactStrictMode: true, 
};

export default nextConfig;