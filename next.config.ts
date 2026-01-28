import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedHosts: ["*"],
  },
};

export default nextConfig;
