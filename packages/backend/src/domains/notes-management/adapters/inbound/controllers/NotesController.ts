import { Effect } from 'effect';
import _ from 'lodash';
import { V1, NoteIdSchema } from '@saas-monorepo-template/api-contracts';
import { Context } from '~/shared/HttpServer.js';
import { NotesManagementUseCases } from '~/domains/notes-management/config/notes-management-container';
import { NoteTitle } from '~/domains/notes-management/domain/value-objects/NoteTitle';
import { NoteContent } from '~/domains/notes-management/domain/value-objects/NoteContent';
import Controller from '~/shared/Controller';
import { NoteMapper } from '~/domains/notes-management/mappers/NoteMapper';

export class NotesController extends Controller {
  constructor(private readonly useCases: NotesManagementUseCases) {
    super();
  }

  async createOne(context: Context): Promise<void> {
    await Effect.Do.pipe(
      Effect.bind('validPayload', () =>
        this.validateSchema({ payload: context.request.body, schema: V1.api.CreateNoteDTOSchema })
      ),
      Effect.bind('title', ({ validPayload }) => NoteTitle.create(validPayload.title)),
      Effect.bind('content', ({ validPayload }) => NoteContent.create(validPayload.content)),
      Effect.flatMap(({ title, content }) =>
        this.useCases.createNote.execute({
          content,
          title,
        })
      ),
      Effect.map((note) => ({
        body: {
          message: 'Note created successfully',
          data: NoteMapper.toDTO(note),
        },
        httpCode: 201,
      })),
      this.runEffectToJson(context)
    );
  }

  async getAll(context: Context): Promise<void> {
    await Effect.Do.pipe(
      Effect.bind('notes', () => this.useCases.getAllNotes.execute()),
      Effect.map(({ notes }) => ({
        body: {
          data: NoteMapper.manyToDTO(notes),
        },
        httpCode: 200,
      })),
      this.runEffectToJson(context)
    );
  }

  async deleteOne(context: Context): Promise<void> {
    await Effect.Do.pipe(
      Effect.bind('id', () =>
        this.validateSchema({
          payload: (context.request.params as { id: string }).id,
          schema: NoteIdSchema,
        })
      ),
      Effect.flatMap(({ id }) => this.useCases.deleteNote.execute({ id })),
      Effect.map(() => ({
        body: {
          message: 'Note deleted successfully',
        },
        httpCode: 200,
      })),
      this.runEffectToJson(context)
    );
  }
}
