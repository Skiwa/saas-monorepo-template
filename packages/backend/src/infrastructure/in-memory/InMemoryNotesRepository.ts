import { Effect } from 'effect';
import { NoteId } from '@saas-monorepo-template/api-contracts';
import { NotesRepository } from '~/notes-management/adapters/outbound/NotesRepository';
import { Note, NoteState } from '~/notes-management/domain/entities/Note';
import { NoteNotFoundError } from '~/domains/notes-management/domain/errors/NoteNotFoundError';

export class InMemoryNotesRepository implements NotesRepository {
  private readonly notes: Map<NoteId, NoteState> = new Map();

  findAll(): Effect.Effect<Note[]> {
    return Effect.succeed(
      Array.from(this.notes.values())
        .filter((noteState) => noteState.deletedAt === null)
        .map((noteState) => Note.fromState(noteState))
    );
  }

  findOneByIdOrFail(id: NoteId): Effect.Effect<Note, NoteNotFoundError> {
    const noteState = this.notes.get(id);
    if (!noteState) {
      return Effect.fail(new NoteNotFoundError(id));
    }

    return Effect.succeed(Note.fromState(noteState));
  }

  saveOne(note: Note): Effect.Effect<void> {
    const state = note.toState();

    this.notes.set(state.id, state);
    return Effect.succeed(undefined);
  }
}
