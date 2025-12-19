import Fastify from 'fastify';
import { config } from '../env';

export type DIContainer = {
  start: () => void;
  stop: () => Promise<void>;
};

export const container = (): DIContainer => {
  const isProduction = config.isProduction;

  const fastify = Fastify({
    logger: isProduction
      ? true
      : {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              ignore: 'pid,hostname',
              translateTime: 'HH:MM:ss Z',
            },
          },
        },
  });

  const start = (): void => {
    fastify.listen({ port: 3000 }, (err, address) => {
      if (err) {
        fastify.log.error(err);
        throw err;
      }
      fastify.log.info(`Server is running on ${address}`);
    });
  };

  const stop = async (): Promise<void> => {
    await fastify.close();
  };

  return {
    start,
    stop,
  };
};
