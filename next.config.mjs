import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_BASE_URL: "https://api.stoble.ru",
    CLIENT_BASE_URL: "https://stoble.ru",
    UPLOADTHING_SECRET:
      "sk_live_b17fc24dc5ef37f5fd5acf97ff8a0ffc6fad8b1d4fa79ae14aae38b315162a57",
    UPLOADTHING_APP_ID: "jbbz3rwknz",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
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
