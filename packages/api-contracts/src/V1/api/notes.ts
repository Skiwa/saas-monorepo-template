import z from 'zod';
import { NoteIdSchema } from '../../shared/ids';

export const NoteDTOSchema = z.object({
  content: z.string(),
  createdAt: z.iso.datetime(),
  id: NoteIdSchema,
  title: z.string(),
});

export const CreateNoteDTOSchema = z.object({
  content: z.string(),
  title: z.string(),
});

export const UpdateNoteDTOSchema = z.object({
  content: z.string(),
  title: z.string(),
});

export type NoteDTO = z.infer<typeof NoteDTOSchema>;
export type CreateNoteDTO = z.infer<typeof CreateNoteDTOSchema>;
export type UpdateNoteDTO = z.infer<typeof UpdateNoteDTOSchema>;
