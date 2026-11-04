import type { NextConfig } from "next";

import { legacyFssaiServiceAliases, legacyFssaiServiceSlugs } from "./lib/service-route-config";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return {
      // Use the existing request-rendered compatibility route for query-aware 308s.
      // Corporate service pages retain their existing static generation behavior.
      beforeFiles: [{
        source: `/corporate/:slug(${[...legacyFssaiServiceSlugs, ...Object.keys(legacyFssaiServiceAliases)].join("|")})`,
        destination: "/fssai/:slug",
      }],
    };
  },
  async redirects() {
    return [
      {
        source: "/approval/lmpc-pcr-certificate",
        destination: "/approval/packaged-commodity-registration",
        permanent: true,
      },
      {
        source: "/approval/model-approval-certificate",
        destination: "/approval/model-approval",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
