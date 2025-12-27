import { HTTPServer } from '~/shared/HttpServer.js';
import { NotesController } from '../controllers/NotesController';

export interface NotesManagementPublicControllers {
  notesController: NotesController;
}

export class NotesManagementPublicRouter {
  constructor(
    private readonly httpServer: HTTPServer,
    private readonly controllers: NotesManagementPublicControllers
  ) {}

  public registerRoutes(): void {
    this.httpServer.post('/notes', (context) =>
      this.controllers.notesController.createOne(context)
    );
    this.httpServer.get('/notes', (context) => this.controllers.notesController.getAll(context));
    this.httpServer.get('/notes/:id', (context) =>
      this.controllers.notesController.getOne(context)
    );
    this.httpServer.delete('/notes/:id', (context) =>
      this.controllers.notesController.deleteOne(context)
    );
    this.httpServer.put('/notes/:id', (context) =>
      this.controllers.notesController.updateOne(context)
    );
  }
}
