/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['image.flaticon.com', 'images.pexels.com', 'i.ibb.co', 'modinatheme.com', 'libra-novel.vercel.app', 'res.cloudinary.com'],
  },
};
