/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "res-console.cloudinary.com",
      "lh3.googleusercontent.com",
      "cdn.pixabay.com",
    ],
  },
};

export default nextConfig;
