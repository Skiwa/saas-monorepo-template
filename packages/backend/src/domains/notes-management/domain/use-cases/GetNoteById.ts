import { Effect } from 'effect';
import { NoteId } from 'api-contracts';
import { NotesManagementDependencies } from '../../config/notes-management-container';
import PublicUseCase from '~/shared/UseCase';
import { Note } from '../entities/Note';
import { NoteNotFoundError } from '../errors/NoteNotFoundError';

type GetNoteByIdDependencies = Pick<NotesManagementDependencies, 'notesRepository'>;

export type GetNoteByIdParams = {
  id: NoteId;
};

type ExpectedErrors = NoteNotFoundError;

export class GetNoteById extends PublicUseCase<GetNoteByIdParams, Note, ExpectedErrors> {
  constructor(private readonly deps: GetNoteByIdDependencies) {
    super();
  }

  execute(params: GetNoteByIdParams): Effect.Effect<Note, ExpectedErrors> {
    return this.deps.notesRepository.findOneByIdOrFail(params.id);
  }
}
