import { Effect } from 'effect';
import { Note } from '../../domain/entities/Note';

export interface NotesRepository {
  findAll(): Effect.Effect<Note[]>;
  saveOne(note: Note): Effect.Effect<void>;
}
