import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "images.pexels.com",
      "res.cloudinary.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
