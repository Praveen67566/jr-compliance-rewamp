import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Production runs behind HTTPS/load-balancer infrastructure. Supplying the
  // canonical CMS origin lets Strapi generate correct admin and media URLs;
  // proxy.koa trusts only the proxy headers when explicitly enabled.
  url: env('PUBLIC_URL', ''),
  proxy: {
    koa: env.bool('IS_PROXIED', false),
  },
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
