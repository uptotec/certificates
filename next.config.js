/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  experimental: {
    legacyBrowsers: false,
    outputFileTracingExcludes: ['**canvas**'],
  },
};

module.exports = nextConfig;
