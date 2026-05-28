/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/digital-twin',
        permanent: false
      }
    ];
  },
  turbopack: {
    root: new URL('.', import.meta.url).pathname
  }
};

export default nextConfig;
