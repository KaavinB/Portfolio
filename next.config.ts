import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A lockfile further up the tree would otherwise be picked as the workspace root.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
