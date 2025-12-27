import { z } from 'zod';
import { ValueObject } from '~/shared/ValueObject.js';
import { ValidationError } from '~/shared/ProjectErrors';
import { Effect, pipe } from 'effect';

export const NoteContentSchema: z.ZodString = z.string().min(1).max(500);
type NoteContentProps = z.infer<typeof NoteContentSchema>;

export class NoteContent extends ValueObject<NoteContentProps> {
  static create(value: unknown): Effect.Effect<NoteContent, ValidationError> {
    return pipe(
      this.validateSchema({
        errorMessage: 'Invalid note content',
        schema: NoteContentSchema,
        value,
      }),
      Effect.map((validValue) => new NoteContent(validValue))
    );
  }
}
