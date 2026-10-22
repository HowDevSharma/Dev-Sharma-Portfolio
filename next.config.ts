import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable hybrid static & server rendering
  output: "export",
  // output: "export"  // Keep disabled - contact form needs server-side functionality

  /* config options here */
};

export default nextConfig;
