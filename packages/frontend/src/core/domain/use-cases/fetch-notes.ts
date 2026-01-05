import type { NotesGateway } from '../ports/notes-gateway';
import type { Note } from '../types/Note';
import { NoteMapper } from '../mappers/note-mapper';

export interface FetchNotesDependencies {
  notesGateway: NotesGateway;
}

export async function fetchNotes(deps: FetchNotesDependencies): Promise<Note[]> {
  const dtos = await deps.notesGateway.findAll();
  return NoteMapper.manyToDomain(dtos);
}
