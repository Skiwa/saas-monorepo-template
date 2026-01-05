import type { Container } from '../../di/create-real-container';
import type { UseCase } from '.';
import type { Note } from '../types/Note';
import { NoteMapper } from '../mappers/note-mapper';

type FetchNotesDependencies = Pick<Container, 'notesGateway'>;

export const fetchNotes: UseCase<void, Note[]> = async (
  _,
  { notesGateway }: FetchNotesDependencies
): Promise<Note[]> => {
  const dtos = await notesGateway.findAll();
  return NoteMapper.manyToDomain(dtos);
};
