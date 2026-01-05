import type { V1, NoteId } from 'api-contracts';

export interface NotesGateway {
  createOne(note: V1.api.CreateNoteDTO): Promise<V1.api.NoteDTO>;
  deleteOne(id: NoteId): Promise<void>;
  findAll(): Promise<V1.api.NoteDTO[]>;
  findOneById(id: NoteId): Promise<V1.api.NoteDTO | null>;
  updateOne(id: NoteId, note: V1.api.UpdateNoteDTO): Promise<void>;
}
