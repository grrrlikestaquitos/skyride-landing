import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only — no Node runtime. `next build`
  // therefore emits a fully prerendered site into `out/`.
  //
  // This constrains what the site may use: no Route Handlers that read the
  // request, no Server Actions, no redirects/rewrites/headers, no ISR, and no
  // dynamic routes without `generateStaticParams`. See
  // node_modules/next/dist/docs/01-app/02-guides/static-exports.md.
  output: "export",

  // The default image loader needs the optimizer server. Nothing here uses
  // next/image today; this keeps the build honest if something starts to.
  images: { unoptimized: true },
};

export default nextConfig;
