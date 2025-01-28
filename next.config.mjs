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
  reactStrictMode: true, // Activa el modo estricto de React para detectar problemas comunes
  swcMinify: true, // Optimiza el código para producción usando SWC
};

export default nextConfig;