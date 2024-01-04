/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                //protocol: "https",
                hostname: "yt3.ggpht.com",
                //port: "443",
                //pathname: "*",
            },
            {
                //protocol: "https",
                hostname: "i.ytimg.com",
                //port: "443",
                //pathname: "*",
            },
        ],
    },
};

module.exports = nextConfig;
