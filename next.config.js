/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/hub/memory-games',
    assetPrefix: '/hub/memory-games/',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
