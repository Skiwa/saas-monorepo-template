import type { Container } from '../../di/create-real-container';

export type UseCase<Params, Response> = (
  params: Params,
  dependencies: Container
) => Promise<Response>;
