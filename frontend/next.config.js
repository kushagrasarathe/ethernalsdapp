/** @type {import('next').NextConfig} */

const optimizedImages = require('next-optimized-images');

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig;
module.exports = optimizedImages();