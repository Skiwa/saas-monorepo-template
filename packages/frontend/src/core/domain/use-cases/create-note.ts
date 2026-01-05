import type { V1 } from 'api-contracts';
import type { NotesGateway } from '../ports/notes-gateway';

export interface CreateNoteDependencies {
  notesGateway: NotesGateway;
}

export async function createNote(deps: CreateNoteDependencies): Promise<void> {
  const dto: V1.api.CreateNoteDTO = {
    title: 'New note',
    content: 'Note content',
  };
  await deps.notesGateway.createOne(dto);
}

