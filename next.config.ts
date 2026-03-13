import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source:
          "/eye-drop-days-supply-guides/brimonidine-tartrate-timolol-maleate",
        destination: "/how-to-calculate-eye-drop-days-supply",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
