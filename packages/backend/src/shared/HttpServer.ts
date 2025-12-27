import { FastifyRequest, FastifyReply } from 'fastify';

export type Context = {
  request: FastifyRequest;
  reply: FastifyReply;
};

export type RouteHandler = (context: Context) => Promise<void>;

export interface HTTPServer {
  delete(path: string, handler: RouteHandler): void;
  get(path: string, handler: RouteHandler): void;
  post(path: string, handler: RouteHandler): void;
  put(path: string, handler: RouteHandler): void;
  setupHealthCheckRoutes: () => void;
  start: () => void;
  stop: () => Promise<void>;
}
