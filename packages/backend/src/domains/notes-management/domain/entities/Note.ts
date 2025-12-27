import z from 'zod';
import { BaseEntity } from '~/shared/Entity.js';
import { NoteTitle, NoteTitleSchema } from '../value-objects/NoteTitle';
import { NoteContent, NoteContentSchema } from '../value-objects/NoteContent';
import { Effect } from 'effect/index';
import { createNoteId, NoteIdSchema } from '@saas-monorepo-template/api-contracts';

const NoteStateSchema = z.object({
  content: NoteContentSchema,
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
  id: NoteIdSchema,
  title: NoteTitleSchema,
});

export type NoteState = z.infer<typeof NoteStateSchema>;

export type NoteCreateParams = {
  title: NoteTitle;
  content: NoteContent;
};
export class Note extends BaseEntity<NoteState> {
  private constructor(state: NoteState) {
    super(NoteStateSchema.parse(state));
  }

  static create(params: NoteCreateParams): Note {
    return new Note({
      content: params.content.value,
      createdAt: new Date(),
      deletedAt: null,
      id: createNoteId(),
      title: params.title.value,
    });
  }

  static fromState(state: NoteState): Note {
    return new Note(NoteStateSchema.parse(state));
  }

  get content(): NoteContent {
    return Effect.runSync(NoteContent.create(this.state.content));
  }

  get title(): NoteTitle {
    return Effect.runSync(NoteTitle.create(this.state.title));
  }

  delete(): void {
    this.state.deletedAt = new Date();
  }
}
