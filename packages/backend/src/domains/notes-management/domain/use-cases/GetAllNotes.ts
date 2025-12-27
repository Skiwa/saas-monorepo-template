import { Effect } from 'effect';
import { NotesManagementDependencies } from '../../config/notes-management-container';
import PublicUseCase from '~/shared/UseCase';
import { Note } from '../entities/Note';

type GetAllNotesDependencies = Pick<NotesManagementDependencies, 'notesRepository'>;

export type GetAllNotesParams = void;

type ExpectedErrors = never;

export class GetAllNotes extends PublicUseCase<GetAllNotesParams, Note[], ExpectedErrors> {
  constructor(private readonly deps: GetAllNotesDependencies) {
    super();
  }

  execute(): Effect.Effect<Note[], ExpectedErrors> {
    return this.deps.notesRepository.findAll();
  }
}
