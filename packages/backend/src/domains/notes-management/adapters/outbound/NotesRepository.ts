import { Effect } from 'effect';
import { NoteId } from '@saas-monorepo-template/api-contracts';
import { Note } from '../../domain/entities/Note';
import { NoteNotFoundError } from '../../domain/errors/NoteNotFoundError';

export interface NotesRepository {
  findAll(): Effect.Effect<Note[]>;
  findOneByIdOrFail(id: NoteId): Effect.Effect<Note, NoteNotFoundError>;
  saveOne(note: Note): Effect.Effect<void>;
}
