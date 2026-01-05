import type { V1 } from 'api-contracts';
import type { NotesGateway } from '../ports/notes-gateway';
import { NoteMapper } from '../mappers/note-mapper';
import type { Note } from '../types/Note';

export interface CreateNoteDependencies {
  notesGateway: NotesGateway;
}

export async function createNote(deps: CreateNoteDependencies): Promise<Note> {
  const dto: V1.api.CreateNoteDTO = {
    content: 'Note content',
    title: 'New note',
  };

  const createdDTO = await deps.notesGateway.createOne(dto);
  return NoteMapper.toDomain(createdDTO);
}
