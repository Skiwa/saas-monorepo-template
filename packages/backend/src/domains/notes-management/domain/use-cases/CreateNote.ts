import { Effect, pipe } from 'effect';
import { NotesManagementDependencies } from '../../config/notes-management-container';
import { NoteContent } from '../value-objects/NoteContent';
import { NoteTitle } from '../value-objects/NoteTitle';
import PublicUseCase from '~/shared/UseCase';
import { Note } from '../entities/Note';

type CreateNoteDependencies = Pick<NotesManagementDependencies, 'notesRepository'>;

export type CreateNoteParams = {
  title: NoteTitle;
  content: NoteContent;
};

type ExpectedErrors = never;

export class CreateNote extends PublicUseCase<CreateNoteParams, Note, ExpectedErrors> {
  constructor(private readonly deps: CreateNoteDependencies) {
    super();
  }

  execute(params: CreateNoteParams): Effect.Effect<Note, ExpectedErrors> {
    const note = Note.create({
      content: params.content,
      title: params.title,
    });

    return pipe(
      this.deps.notesRepository.saveOne(note),
      Effect.map(() => note)
    );
  }
}
