import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // This site only uses local static images; keep the image optimizer from
    // fetching attacker-controlled remote content.
    unoptimized: true,
  },
};

export default nextConfig;
