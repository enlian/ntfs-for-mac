import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
};

export default nextConfig;
