import z from 'zod';

export const NoteDTOSchema = z.object({
  content: z.string(),
  createdAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  id: z.string(),
  title: z.string(),
});

export const CreateNoteDTOSchema = z.object({
  content: z.string(),
  title: z.string(),
});

export type NoteDTO = z.infer<typeof NoteDTOSchema>;

export type CreateNoteDTO = z.infer<typeof CreateNoteDTOSchema>;
