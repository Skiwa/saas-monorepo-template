import type { NotesGateway } from '../domain/ports/notes-gateway';
import { ApiNotesGateway } from '../../infrastructure/gateways/api-notes-gateway';
import { config } from '../../config';

export type Container = {
  notesGateway: NotesGateway;
};

let containerInstance: Container | undefined;

function createRealContainer(): Container {
  if (containerInstance !== undefined) {
    return containerInstance;
  }

  containerInstance = {
    notesGateway: new ApiNotesGateway({ apiUrl: config.API_URL }),
  };

  return containerInstance;
}

export function getContainer(): Container {
  if (containerInstance === undefined) {
    return createRealContainer();
  }
  return containerInstance;
}
