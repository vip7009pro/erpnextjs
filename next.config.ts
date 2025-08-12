import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cmsvina4285.com/**')],
  },
  /* config options here */
};

export default nextConfig;
