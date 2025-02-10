// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = createNextIntlPlugin('./app/i18n/request.ts')({
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
      allowedOrigins: ['*'],
    },
  },
  // La propriété i18n a été retirée pour l'App Router.
});

export default nextConfig;
