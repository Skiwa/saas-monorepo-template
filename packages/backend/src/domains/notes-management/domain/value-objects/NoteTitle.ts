import { z } from 'zod';
import { ValueObject } from '~/shared/ValueObject.js';

export const NoteTitleSchema: z.ZodString = z.string().min(1).max(100);
type NoteTitleProps = z.infer<typeof NoteTitleSchema>;

export class NoteTitle extends ValueObject<NoteTitleProps> {
  static create(value: unknown): NoteTitle {
    return new NoteTitle(NoteTitleSchema.parse(value));
  }
}
