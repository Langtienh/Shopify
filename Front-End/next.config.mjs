/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cellphones.com.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn2.cellphones.com.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.cellphones.com.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
