import { Effect, pipe } from 'effect';
import { NoteId } from 'api-contracts';
import { NotesManagementDependencies } from '../../config/notes-management-container';
import PublicUseCase from '~/shared/UseCase';
import { NoteNotFoundError } from '../errors/NoteNotFoundError';

type DeleteNoteDependencies = Pick<NotesManagementDependencies, 'notesRepository'>;

export type DeleteNoteParams = {
  id: NoteId;
};

type ExpectedErrors = NoteNotFoundError;

export class DeleteNote extends PublicUseCase<DeleteNoteParams, void, ExpectedErrors> {
  constructor(private readonly deps: DeleteNoteDependencies) {
    super();
  }

  execute(params: DeleteNoteParams): Effect.Effect<void, ExpectedErrors> {
    return pipe(
      this.deps.notesRepository.findOneByIdOrFail(params.id),
      Effect.flatMap((note) => {
        note.delete();
        return this.deps.notesRepository.saveOne(note);
      })
    );
  }
}
