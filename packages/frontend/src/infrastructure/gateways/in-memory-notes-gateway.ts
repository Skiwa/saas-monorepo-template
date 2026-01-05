import type { NotesGateway } from '../../core/domain/ports/notes-gateway';
import { type V1, type NoteId, createNoteId } from 'api-contracts';

export class InMemoryNotesGateway implements NotesGateway {
  private readonly notes: Map<NoteId, V1.api.NoteDTO> = new Map();

  createOne(dto: V1.api.CreateNoteDTO): Promise<V1.api.NoteDTO> {
    const note: V1.api.NoteDTO = {
      content: dto.content,
      createdAt: new Date().toISOString(),
      id: createNoteId(),
      title: dto.title,
    };
    this.notes.set(note.id, note);
    return Promise.resolve(note);
  }

  deleteOne(id: NoteId): Promise<void> {
    const note = this.notes.get(id);
    if (!note) {
      throw new Error('Note not found');
    }
    this.notes.delete(id);
    return Promise.resolve();
  }

  findAll(): Promise<V1.api.NoteDTO[]> {
    return Promise.resolve(Array.from(this.notes.values()));
  }

  findOneById(id: NoteId): Promise<V1.api.NoteDTO | null> {
    return Promise.resolve(this.notes.get(id) ?? null);
  }

  updateOne(id: NoteId, note: V1.api.UpdateNoteDTO): Promise<void> {
    const existingNote = this.notes.get(id);
    if (!existingNote) {
      throw new Error('Note not found');
    }
    this.notes.set(id, { ...existingNote, ...note });

    return Promise.resolve();
  }
}
