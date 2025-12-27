import { config } from '../env';
import { FastifyHTTPServer } from '../http/fastify-app';

export type DIContainer = {
  start: () => void;
  stop: () => Promise<void>;
};

export const container = (): DIContainer => {
  const {
    env,
    httpServer: { host, port },
  } = config;

  const httpServer = new FastifyHTTPServer({ isProduction: env === 'production', host, port });

  const start = (): void => {
    httpServer.start();
  };

  const stop = async (): Promise<void> => {
    await httpServer.stop();
  };

  return {
    start,
    stop,
  };
};
