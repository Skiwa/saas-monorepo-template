import { Effect } from 'effect/index';
import { isEqual } from 'lodash';
import { ValidationError } from './ProjectErrors';
import z from 'zod';

type ValidateSchemaParams<T> = {
  errorMessage: string;
  value: unknown;
  schema: z.ZodSchema<T>;
};

export abstract class ValueObject<T> {
  public readonly value: T;

  constructor(props: T) {
    this.value = Object.freeze(props);
  }

  public equals(valueObject: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) {
      return false;
    }

    return isEqual(this.value, valueObject.value);
  }

  public static validateSchema<T>(
    params: ValidateSchemaParams<T>
  ): Effect.Effect<T, ValidationError> {
    const { value, schema, errorMessage } = params;

    const parseResult = schema.safeParse(value);

    if (parseResult.success) {
      return Effect.succeed(parseResult.data);
    }

    return Effect.fail(
      new ValidationError({ message: errorMessage, issues: parseResult.error.issues })
    );
  }
}
