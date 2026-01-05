import { NoteId } from 'api-contracts';
import { NotFoundError } from '~/shared/ProjectErrors';

export class NoteNotFoundError extends NotFoundError {
  constructor(id: NoteId) {
    super({ message: `Note with id ${id} not found.` });
  }
}
