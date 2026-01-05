import type { NotesGateway } from '../domain/ports/notes-gateway';
import { InMemoryNotesGateway } from '../../infrastructure/gateways/in-memory-notes-gateway';

export interface Container {
  notesGateway: NotesGateway;
}

let containerInstance: Container | undefined;

export function createRealContainer(): Container {
  if (containerInstance === undefined) {
    containerInstance = {
      notesGateway: new InMemoryNotesGateway(),
    };
  }
  return containerInstance;
}

export function getContainer(): Container {
  if (containerInstance === undefined) {
    return createRealContainer();
  }
  return containerInstance;
}
