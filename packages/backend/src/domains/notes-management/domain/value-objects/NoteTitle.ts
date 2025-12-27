import { z } from 'zod';
import { ValueObject } from '~/shared/ValueObject.js';
import { ValidationError } from '~/shared/ProjectErrors';
import { Effect, pipe } from 'effect';

export const NoteTitleSchema: z.ZodString = z.string().min(1).max(200);
type NoteTitleProps = z.infer<typeof NoteTitleSchema>;

export class NoteTitle extends ValueObject<NoteTitleProps> {
  static create(value: unknown): Effect.Effect<NoteTitle, ValidationError> {
    return pipe(
      this.validateSchema({ errorMessage: 'Invalid note title', schema: NoteTitleSchema, value }),
      Effect.map((validValue) => new NoteTitle(validValue))
    );
  }
}
