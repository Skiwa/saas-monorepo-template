import { config as dotenvConfig } from 'dotenv-safe';

dotenvConfig();

export const config = {
  isProduction: process.env['NODE_ENV'] === 'production',
  httpServer: {
    host: process.env['SERVER_HTTP_HOST'] || 'api.local.localhost',
    port: process.env['SERVER_HTTP_PORT'] || 3003,
  },
};
