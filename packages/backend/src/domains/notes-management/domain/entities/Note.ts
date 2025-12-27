import z from 'zod';
import crypto from 'crypto';
import { BaseEntity } from '~/shared/Entity.js';
import { NoteTitle, NoteTitleSchema } from '../value-objects/NoteTitle';
import { NoteContent, NoteContentSchema } from '../value-objects/NoteContent';

const NoteStateSchema = z.object({
  content: NoteContentSchema,
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
  id: z.string(),
  title: NoteTitleSchema,
});

export type NoteState = z.infer<typeof NoteStateSchema>;

export type NoteCreateParams = {
  title: NoteTitle;
  content: NoteContent;
};
export class Note extends BaseEntity<NoteState> {
  constructor(state: NoteState) {
    super(NoteStateSchema.parse(state));
  }

  static create(params: NoteCreateParams): Note {
    return new Note({
      content: params.content.value,
      createdAt: new Date(),
      deletedAt: null,
      id: crypto.randomUUID(),
      title: params.title.value,
    });
  }

  get content(): NoteContent {
    return NoteContent.create(this.state.content);
  }

  get title(): NoteTitle {
    return NoteTitle.create(this.state.title);
  }

  delete(): void {
    this.state.deletedAt = new Date();
  }
}
