import Fastify, { FastifyInstance } from 'fastify';
import { HTTPServer } from './http-server.js';

type FastifyHTTPServerParams = {
  host: string;
  isProduction: boolean;
  port: number;
};

export class FastifyHTTPServer implements HTTPServer {
  private readonly fastify: FastifyInstance;

  constructor(private readonly params: FastifyHTTPServerParams) {
    this.fastify = Fastify({
      logger: this.params.isProduction
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
  }

  start(): void {
    this.fastify.listen({ host: this.params.host, port: this.params.port }, (err, address) => {
      if (err) {
        this.fastify.log.error(err);
        throw err;
      }
      this.fastify.log.info(`Server is running on ${address}`);
    });

    this.setHealthCheckRoutes();
  }

  async stop(): Promise<void> {
    await this.fastify.close();
  }

  setHealthCheckRoutes(): void {
    this.fastify.get('/ping', (_, reply) => {
      return reply.status(200).send({ message: 'pong' });
    });

    this.fastify.get('/health-check', (_, reply) => {
      return reply.status(200).send({ status: 'healthy', uptime: process.uptime() });
    });
  }
}
