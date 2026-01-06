import type { NotesGateway } from '../../core/domain/ports/notes-gateway';
import { type V1, type NoteId } from 'api-contracts';
import { ApiGateway } from './api-gateway';

type ApiNotesGatewayParams = {
  apiUrl: string;
};

export class ApiNotesGateway extends ApiGateway implements NotesGateway {
  constructor(params: ApiNotesGatewayParams) {
    super(params);
  }

  async createOne(dto: V1.api.CreateNoteDTO): Promise<V1.api.NoteDTO> {
    return this.post<V1.api.NoteDTO>('/notes', dto);
  }

  async deleteOne(id: NoteId): Promise<void> {
    return this.delete<void>(`/notes/${id}`);
  }

  async findAll(): Promise<V1.api.NoteDTO[]> {
    return this.get<V1.api.NoteDTO[]>('/notes');
  }

  async findOneById(id: NoteId): Promise<V1.api.NoteDTO> {
    return this.get<V1.api.NoteDTO>(`/notes/${id}`);
  }

  async updateOne(id: NoteId, note: V1.api.UpdateNoteDTO): Promise<void> {
    await this.put<void>(`/notes/${id}`, note);
  }
}
