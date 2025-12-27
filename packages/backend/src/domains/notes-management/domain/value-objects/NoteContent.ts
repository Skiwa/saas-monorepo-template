import { z } from 'zod';
import { ValueObject } from '~/shared/ValueObject.js';

export const NoteContentSchema: z.ZodString = z.string().min(1).max(200);
type NoteContentProps = z.infer<typeof NoteContentSchema>;

export class NoteContent extends ValueObject<NoteContentProps> {
  static create(value: unknown): NoteContent {
    return new NoteContent(NoteContentSchema.parse(value));
  }
}
