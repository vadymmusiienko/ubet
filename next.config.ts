import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    /* Allowed images here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "www.gravatar.com",
            },
        ],
    },
};

export default nextConfig;
