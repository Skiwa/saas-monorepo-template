import { create } from 'zustand';
import type { NoteId } from 'api-contracts';
import type { Note } from '../domain/types/Note';
import { getContainer } from '../di/create-real-container';
import { fetchNotes } from '../domain/use-cases/fetch-notes';
import { createNote } from '../domain/use-cases/create-note';
import { deleteNote } from '../domain/use-cases/delete-note';
import {
  INITIAL_QUERY_COMMAND_RESULT,
  type QueryCommandResult,
  executeUseCaseAndUpdateState,
} from '.';

type NotesStoreState = {
  createNoteResult: QueryCommandResult;
  deleteNoteResult: QueryCommandResult;
  fetchNotesResult: QueryCommandResult;
  notes: Note[];
};

export type NotesStore = NotesStoreState & {
  createNote: () => Promise<void>;
  deleteNote: (id: NoteId) => Promise<void>;
  fetchNotes: () => Promise<void>;
};

const INITIAL_STATE: NotesStoreState = {
  createNoteResult: INITIAL_QUERY_COMMAND_RESULT,
  deleteNoteResult: INITIAL_QUERY_COMMAND_RESULT,
  fetchNotesResult: INITIAL_QUERY_COMMAND_RESULT,
  notes: [],
};

const container = getContainer();

export const useNotesStore = create<NotesStore>((set) => {
  const store: NotesStore = {
    ...INITIAL_STATE,
    createNote: async (): Promise<void> => {
      const createdNote = await executeUseCaseAndUpdateState({
        key: 'createNoteResult',
        set,
        useCase: () => createNote(undefined, container),
      });

      set((state) => ({ notes: [...state.notes, createdNote] }));
    },
    deleteNote: async (id: NoteId): Promise<void> => {
      await executeUseCaseAndUpdateState({
        key: 'deleteNoteResult',
        set,
        useCase: () => deleteNote({ id }, container),
      });

      set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
    },
    fetchNotes: async (): Promise<void> => {
      const notes = await executeUseCaseAndUpdateState({
        key: 'fetchNotesResult',
        set,
        useCase: () => fetchNotes(undefined, container),
      });

      set((state) => ({ ...state, notes }));
    },
  };
  return store;
});
