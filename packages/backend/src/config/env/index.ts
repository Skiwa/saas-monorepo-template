import { config as dotenvConfig } from 'dotenv-safe';
import { z } from 'zod';

dotenvConfig();

const EnvSchema = z.object({
  env: z.enum(['development', 'production']),
  httpServer: z.object({
    host: z.string(),
    port: z.coerce.number(),
  }),
});

export const config = EnvSchema.parse({
  env: process.env['SERVER_ENV'],
  httpServer: {
    host: process.env['SERVER_HTTP_HOST'],
    port: process.env['SERVER_HTTP_PORT'],
  },
});
