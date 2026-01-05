import { type NoteId } from 'api-contracts';

export type Note = {
  content: string;
  createdAt: Date;
  id: NoteId;
  title: string;
};
