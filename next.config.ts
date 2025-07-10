import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Don't fail build on ESLint errors
  },
};

export default nextConfig;
