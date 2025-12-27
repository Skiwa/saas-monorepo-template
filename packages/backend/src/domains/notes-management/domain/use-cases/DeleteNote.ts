import { Effect, pipe } from 'effect';
import { NoteId } from '@saas-monorepo-template/api-contracts';
import { NotesManagementDependencies } from '../../config/notes-management-container';
import PublicUseCase from '~/shared/UseCase';

type DeleteNoteDependencies = Pick<NotesManagementDependencies, 'notesRepository'>;

export type DeleteNoteParams = {
  id: NoteId;
};

type ExpectedErrors = never;

export class DeleteNote extends PublicUseCase<DeleteNoteParams, void, ExpectedErrors> {
  constructor(private readonly deps: DeleteNoteDependencies) {
    super();
  }

  execute(params: DeleteNoteParams): Effect.Effect<void, ExpectedErrors> {
    return pipe(
      this.deps.notesRepository.findOneById(params.id),
      Effect.flatMap((note) => {
        if (note === null) {
          return Effect.succeed(undefined);
        }

        note.delete();
        return this.deps.notesRepository.saveOne(note);
      })
    );
  }
}
