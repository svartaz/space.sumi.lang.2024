import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  experimental: {
    urlImports: ['https://sumi.space/'],
  },
};

export default nextConfig;
