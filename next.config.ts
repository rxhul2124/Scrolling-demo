import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for GitHub Pages */
  output: "export",

  /* Set basePath if deploying to a subpath, e.g. /scrolling-demo */
  // basePath: "/scrolling-demo",

  /* Disable image optimization for static export */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
