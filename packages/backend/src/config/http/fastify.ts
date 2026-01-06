import cors from '@fastify/cors';
import Fastify, { FastifyInstance } from 'fastify';
import { HTTPServer, RouteHandler } from '~/shared/HttpServer.js';

type FastifyHTTPServerParams = {
  host: string;
  isProduction: boolean;
  port: number;
};

export class FastifyHTTPServer implements HTTPServer {
  private readonly fastify: FastifyInstance;

  constructor(private readonly params: FastifyHTTPServerParams) {
    this.fastify = Fastify({
      disableRequestLogging: true,
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

  async start(): Promise<void> {
    await this.fastify.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    });

    this.fastify.listen({ host: this.params.host, port: this.params.port }, (err, address) => {
      if (err) {
        this.fastify.log.error(err);
        throw err;
      }
      this.fastify.log.info(`Server is running on ${address}`);
    });

    this.setupHealthCheckRoutes();
    this.setupRequestLogging();
  }

  async stop(): Promise<void> {
    await this.fastify.close();
  }

  setupHealthCheckRoutes(): void {
    this.fastify.get('/ping', (_, reply) => {
      return reply.status(200).send({ message: 'pong' });
    });

    this.fastify.get('/health-check', (_, reply) => {
      return reply.status(200).send({ status: 'healthy', uptime: process.uptime() });
    });
  }

  private setupRequestLogging(): void {
    this.fastify.addHook('preHandler', async (request) => {
      this.fastify.log.info(
        {
          method: request.method,
          url: request.url,
          body: request.body,
        },
        `${request.id} - Incoming request`
      );

      return Promise.resolve();
    });

    this.fastify.addHook('onSend', async (request, reply, payload) => {
      let parsedPayload = payload;
      if (typeof payload === 'string') {
        try {
          parsedPayload = JSON.parse(payload);
        } catch {
          parsedPayload = payload;
        }
      }

      this.fastify.log.info(
        {
          statusCode: reply.statusCode,
          method: request.method,
          url: request.url,
          body: parsedPayload,
        },
        `${request.id} - Request completed`
      );
    });
  }

  delete(path: string, handler: RouteHandler): void {
    this.fastify.delete(path, async (request, reply) => {
      await handler({ request, reply });
    });
  }

  get(path: string, handler: RouteHandler): void {
    this.fastify.get(path, async (request, reply) => {
      await handler({ request, reply });
    });
  }

  post(path: string, handler: RouteHandler): void {
    this.fastify.post(path, async (request, reply) => {
      await handler({ request, reply });
    });
  }

  put(path: string, handler: RouteHandler): void {
    this.fastify.put(path, async (request, reply) => {
      await handler({ request, reply });
    });
  }
}
