import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_BASE_URL: "https://api.stoble.ru",
    CLIENT_BASE_URL: "https://stoble.ru",
  },
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

export default withPlaiceholder(nextConfig);
