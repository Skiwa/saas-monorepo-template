import type { V1 } from 'api-contracts';
import type { Container } from '../../di/create-real-container';
import type { UseCase } from '.';
import { NoteMapper } from '../mappers/note-mapper';
import type { Note } from '../types/Note';

type CreateNoteDependencies = Pick<Container, 'notesGateway'>;

type CreateNoteParams = void;

export const createNote: UseCase<CreateNoteParams, Note> = async (
  _,
  { notesGateway }: CreateNoteDependencies
): Promise<Note> => {
  const dto: V1.api.CreateNoteDTO = {
    content: 'Note content',
    title: 'New note',
  };

  const createdDTO = await notesGateway.createOne(dto);
  return NoteMapper.toDomain(createdDTO);
};
