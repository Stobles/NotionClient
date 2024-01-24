import withPlaiceholder from "@plaiceholder/next";

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

export default withPlaiceholder(nextConfig);
