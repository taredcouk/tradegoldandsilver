import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Allows any host to access the dev server, which is required for the live preview
    allowedHosts: ["all"],
  },
};

export default nextConfig;
