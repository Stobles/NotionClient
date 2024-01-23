/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.stoble.ru/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
