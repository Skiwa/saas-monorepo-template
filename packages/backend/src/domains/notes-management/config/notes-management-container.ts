import { InMemoryNotesRepository } from '~/infrastructure/in-memory/InMemoryNotesRepository';
import { NotesRepository } from '../adapters/outbound/NotesRepository';
import { CreateNote } from '../domain/use-cases/CreateNote';
import { DeleteNote } from '../domain/use-cases/DeleteNote';
import { UpdateNote } from '../domain/use-cases/UpdateNote';
import { NotesController } from '../adapters/inbound/controllers/NotesController';
import { NotesManagementPublicRouter } from '../adapters/inbound/routers/PublicRouter';
import { HTTPServer } from '~/shared/HttpServer';
import { GetAllNotes } from '../domain/use-cases/GetAllNotes';
import { GetNoteById } from '../domain/use-cases/GetNoteById';

export type NotesManagementContainerParams = {
  httpServer: HTTPServer;
};

export type NotesManagementDependencies = {
  notesRepository: NotesRepository;
};

export type NotesManagementUseCases = {
  createNote: CreateNote;
  deleteNote: DeleteNote;
  getAllNotes: GetAllNotes;
  getNoteById: GetNoteById;
  updateNote: UpdateNote;
};

export type NotesManagementControllers = {
  notesController: NotesController;
};

export type NotesManagementDiContainer = {
  controllers: NotesManagementControllers;
  dependencies: NotesManagementDependencies;
  publicRouter: NotesManagementPublicRouter;
  useCases: NotesManagementUseCases;
};

const buildDependencies = (): NotesManagementDependencies => ({
  notesRepository: new InMemoryNotesRepository(),
});

const buildUseCases = (deps: NotesManagementDependencies): NotesManagementUseCases => ({
  createNote: new CreateNote(deps),
  deleteNote: new DeleteNote(deps),
  getAllNotes: new GetAllNotes(deps),
  getNoteById: new GetNoteById(deps),
  updateNote: new UpdateNote(deps),
});

const buildControllers = (useCases: NotesManagementUseCases): NotesManagementControllers => ({
  notesController: new NotesController(useCases),
});

export const notesManagementContainer = (
  params: NotesManagementContainerParams
): NotesManagementDiContainer => {
  const dependencies = buildDependencies();
  const useCases = buildUseCases(dependencies);
  const controllers = buildControllers(useCases);

  const publicRouter = new NotesManagementPublicRouter(params.httpServer, controllers);

  return { controllers, dependencies, publicRouter, useCases };
};
