import { config } from '../env';
import { FastifyHTTPServer } from '../http/fastify.js';
import { notesManagementContainer } from '~/domains/notes-management/config/notes-management-container';

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

  const notesManagement = notesManagementContainer({ httpServer });

  const publicRouters = [notesManagement.publicRouter];

  const start = (): void => {
    httpServer.start();
    publicRouters.forEach((router) => router.registerRoutes());
  };

  const stop = async (): Promise<void> => {
    await httpServer.stop();
  };

  return {
    start,
    stop,
  };
};
