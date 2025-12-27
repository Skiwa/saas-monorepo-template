import { Effect } from 'effect';
import { NoteId } from '@saas-monorepo-template/api-contracts';
import { Note } from '../../domain/entities/Note';

export interface NotesRepository {
  findAll(): Effect.Effect<Note[]>;
  findOneById(id: NoteId): Effect.Effect<Note | null>;
  saveOne(note: Note): Effect.Effect<void>;
}
