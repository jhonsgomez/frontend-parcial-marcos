/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://127.0.0.1:8000/api/chat/"
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/media/profile_pictures/**',
            },
        ],
    },
};

export default nextConfig;
