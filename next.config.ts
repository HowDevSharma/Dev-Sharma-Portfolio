import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for most pages, keep API routes dynamic
  output: "export",
  // Required for static export with App Router
  distDir: "out",
  // Ensure assets are correctly referenced
  assetPrefix: "./",
  // Optional: add basePath if deploying to subdirectory
  // basePath: "/your-repo-name",
};


export default nextConfig;
