/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Add GLB/GLTF file support
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models',
          outputPath: 'static/models',
          name: '[name].[hash].[ext]',
        },
      },
    });

    // Important: return the modified config
    return config;
  },
  // Enable static exports for the app
  output: 'export',
  // Optional: Add a trailing slash to all paths
  trailingSlash: true,
  // Optional: Configure image optimization
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

module.exports = nextConfig;
