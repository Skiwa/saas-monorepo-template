import { Effect, pipe } from 'effect';
import { NoteId } from '@saas-monorepo-template/api-contracts';
import { NotesManagementDependencies } from '../../config/notes-management-container';
import { NoteContent } from '../value-objects/NoteContent';
import { NoteTitle } from '../value-objects/NoteTitle';
import PublicUseCase from '~/shared/UseCase';
import { Note } from '../entities/Note';
import { NoteNotFoundError } from '../errors/NoteNotFoundError';

type UpdateNoteDependencies = Pick<NotesManagementDependencies, 'notesRepository'>;

export type UpdateNoteParams = {
  content: NoteContent;
  id: NoteId;
  title: NoteTitle;
};

type ExpectedErrors = NoteNotFoundError;

export class UpdateNote extends PublicUseCase<UpdateNoteParams, Note, ExpectedErrors> {
  constructor(private readonly deps: UpdateNoteDependencies) {
    super();
  }

  execute(params: UpdateNoteParams): Effect.Effect<Note, ExpectedErrors> {
    return pipe(
      this.deps.notesRepository.findOneByIdOrFail(params.id),
      Effect.map((note) => note.setContent(params.content).setTitle(params.title)),
      Effect.tap((note) => this.deps.notesRepository.saveOne(note))
    );
  }
}
