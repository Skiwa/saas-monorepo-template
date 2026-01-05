import type { NotesGateway } from '../domain/ports/notes-gateway';
import { InMemoryNotesGateway } from '../../infrastructure/gateways/in-memory-notes-gateway';

export type Container = {
  notesGateway: NotesGateway;
};

let containerInstance: Container | undefined;

function createRealContainer(): Container {
  if (containerInstance !== undefined) {
    return containerInstance;
  }

  containerInstance = {
    notesGateway: new InMemoryNotesGateway(),
  };

  return containerInstance;
}

export function getContainer(): Container {
  if (containerInstance === undefined) {
    return createRealContainer();
  }
  return containerInstance;
}
