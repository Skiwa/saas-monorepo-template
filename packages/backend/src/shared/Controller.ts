import { Cause, Effect, Either, Exit, Option } from 'effect';
import z, { ZodSchema } from 'zod';
import { Context } from './HttpServer.js';
import { DuplicateError, ForbiddenError, NotFoundError, ValidationError } from './ProjectErrors';

export type Response = {
  body: {
    data?: unknown;
    message?: string;
  };
  httpCode: number;
};

type ValidatePayloadParams<T extends ZodSchema> = {
  payload: unknown;
  schema: T;
};

export default abstract class Controller {
  protected constructor() {}

  protected mapProjectErrorToResponse(error: Error): Response {
    const body: Response['body'] = { message: error.message };

    if (error instanceof ValidationError) {
      return {
        body,
        httpCode: 400,
      };
    }

    if (error instanceof NotFoundError) {
      return {
        body,
        httpCode: 404,
      };
    }

    if (error instanceof DuplicateError) {
      return {
        body,
        httpCode: 409,
      };
    }

    if (error instanceof ForbiddenError) {
      return {
        body,
        httpCode: 403,
      };
    }

    return {
      body: { message: 'Internal Server Error' },
      httpCode: 500,
    };
  }

  protected runEffect =
    () =>
    async (effect: Effect.Effect<Response, Error>): Promise<Response> => {
      const exit = await Effect.runPromiseExit(effect);

      return Exit.match(exit, {
        onSuccess: (response) => {
          return {
            body: response.body,
            httpCode: response.httpCode,
          };
        },
        onFailure: (cause) => {
          // TODO: Use pino
          console.log('Internal Server Error', cause);
          const error = Cause.failureOption(cause);
          if (Option.isSome(error)) {
            return this.mapProjectErrorToResponse(error.value);
          }

          return {
            body: { message: 'Internal Server Error' },
            httpCode: 500,
          };
        },
      });
    };

  protected runEffectToJson =
    (context: Context) =>
    async (effect: Effect.Effect<Response, Error>): Promise<void> => {
      const runnable = this.jsonBaseMapper(effect);
      const response = await this.runEffect()(runnable);
      await context.reply.status(response.httpCode).type('application/json').send(response.body);
    };

  protected jsonBaseMapper<E extends Error>(
    result: Effect.Effect<Response, E>
  ): Effect.Effect<Response, Error> {
    return Effect.flatMap(Effect.either(result), (either): Effect.Effect<Response> => {
      if (Either.isRight(either)) {
        const result = either.right;
        return Effect.succeed({
          body: result.body,
          httpCode: result.httpCode,
        });
      }

      const error = either.left;
      const body = { message: error.message };

      if (error instanceof ValidationError) {
        return Effect.succeed({
          body: {
            issues: error.issues,
            message: error.message,
          },
          httpCode: 400,
        });
      }

      if (error instanceof NotFoundError) {
        return Effect.succeed({
          body,
          httpCode: 404,
        });
      }

      if (error instanceof DuplicateError) {
        return Effect.succeed({
          body,
          httpCode: 409,
        });
      }

      if (error instanceof ForbiddenError) {
        return Effect.succeed({
          body,
          httpCode: 403,
        });
      }

      return Effect.die(error);
    });
  }

  protected validateSchema<T extends ZodSchema>(
    params: ValidatePayloadParams<T>
  ): Effect.Effect<z.infer<T>, ValidationError> {
    const { payload, schema } = params;

    const parseResult = schema.safeParse(payload);
    if (parseResult.success) {
      return Effect.succeed<z.infer<T>>(parseResult.data);
    }

    return Effect.fail(
      new ValidationError({ message: 'Invalid payload', issues: parseResult.error.issues })
    );
  }
}
