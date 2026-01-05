import type { NoteId } from 'api-contracts';
import type { Container } from '../../di/create-real-container';
import type { UseCase } from '.';

type DeleteNoteDependencies = Pick<Container, 'notesGateway'>;

type DeleteNoteParams = {
  id: NoteId;
};

export const deleteNote: UseCase<DeleteNoteParams, void> = async (
  { id },
  { notesGateway }: DeleteNoteDependencies
): Promise<void> => {
  await notesGateway.deleteOne(id);
};
