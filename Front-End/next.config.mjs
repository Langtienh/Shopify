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
    ],
  },
};

export default nextConfig;
