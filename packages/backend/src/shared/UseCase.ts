import { Effect } from 'effect';

export interface IPublicUseCase<Params, Response, Errors extends Error> {
  execute(request?: Params): Effect.Effect<Response, Errors>;
}

export default abstract class PublicUseCase<
  Params,
  Response,
  Errors extends Error,
> implements IPublicUseCase<Params, Response, Errors> {
  public abstract execute(request: Params): Effect.Effect<Response, Errors>;
}
