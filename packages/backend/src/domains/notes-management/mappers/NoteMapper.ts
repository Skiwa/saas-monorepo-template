import { V1 } from 'api-contracts';
import { Note } from '../domain/entities/Note';

export class NoteMapper {
  static toDTO(note: Note): V1.api.NoteDTO {
    const state = note.toState();

    const dto: V1.api.NoteDTO = {
      content: state.content,
      createdAt: state.createdAt.toISOString(),
      id: state.id,
      title: state.title,
    };

    return V1.api.NoteDTOSchema.parse(dto);
  }

  static manyToDTO(notes: Note[]): V1.api.NoteDTO[] {
    return notes.map((note) => this.toDTO(note));
  }
}
