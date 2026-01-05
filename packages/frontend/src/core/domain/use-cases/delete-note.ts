import type { NoteId } from 'api-contracts';
import type { NotesGateway } from '../ports/notes-gateway';

export interface DeleteNoteDependencies {
  notesGateway: NotesGateway;
}

export async function deleteNote(id: NoteId, deps: DeleteNoteDependencies): Promise<void> {
  await deps.notesGateway.deleteOne(id);
}

