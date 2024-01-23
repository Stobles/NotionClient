/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
