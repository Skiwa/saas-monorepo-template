import { UUIDSchema } from './schemas';
import { z } from 'zod';

export const NoteIdSchema = UUIDSchema.brand('NoteId');
export type NoteId = z.infer<typeof NoteIdSchema>;
export const createNoteId = (id: string = crypto.randomUUID()): NoteId => NoteIdSchema.parse(id);
