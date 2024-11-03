/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'default',
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
                port: "",
                pathname: "/**"
            }
        ]
    },
};

export default nextConfig;
