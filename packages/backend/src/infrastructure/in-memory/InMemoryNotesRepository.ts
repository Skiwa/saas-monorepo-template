import { Effect } from 'effect';
import { NotesRepository } from '~/notes-management/adapters/outbound/NotesRepository';
import { Note } from '~/notes-management/domain/entities/Note';

export class InMemoryNotesRepository implements NotesRepository {
  private readonly notes: Note[] = [];

  findAll(): Effect.Effect<Note[]> {
    return Effect.succeed(this.notes);
  }

  saveOne(note: Note): Effect.Effect<void> {
    this.notes.push(note);
    return Effect.succeed(undefined);
  }
}
