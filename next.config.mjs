import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_BASE_URL: "http://localhost:4000",
    CLIENT_BASE_URL: "http://localhost:3000",
  },
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

export default withPlaiceholder(nextConfig);
