import type { V1 } from 'api-contracts';
import type { Note } from '../types/Note';

export class NoteMapper {
  static toDomain(dto: V1.api.NoteDTO): Note {
    return {
      content: dto.content,
      createdAt: new Date(dto.createdAt),
      id: dto.id,
      title: dto.title,
    };
  }

  static manyToDomain(dtos: V1.api.NoteDTO[]): Note[] {
    return dtos.map((dto) => this.toDomain(dto));
  }
}

