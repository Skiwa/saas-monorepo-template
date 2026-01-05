import { create } from 'zustand';
import type { NoteId } from 'api-contracts';
import type { Note } from '../domain/types/Note';
import { getContainer } from '../di/create-real-container';
import { fetchNotes, type FetchNotesDependencies } from '../domain/use-cases/fetch-notes';
import { createNote, type CreateNoteDependencies } from '../domain/use-cases/create-note';
import { deleteNote, type DeleteNoteDependencies } from '../domain/use-cases/delete-note';

export interface NotesStore {
  createNote: () => Promise<void>;
  deleteNote: (id: NoteId) => Promise<void>;
  error: string | null;
  fetchNotes: () => Promise<void>;
  isLoading: boolean;
  notes: Note[];
}

const container = getContainer();

const fetchNotesDependencies: FetchNotesDependencies = {
  notesGateway: container.notesGateway,
};

const createNoteDependencies: CreateNoteDependencies = {
  notesGateway: container.notesGateway,
};

const deleteNoteDependencies: DeleteNoteDependencies = {
  notesGateway: container.notesGateway,
};

export const useNotesStore = create<NotesStore>((set) => {
  const store: NotesStore = {
    error: null,
    isLoading: false,
    notes: [],
    fetchNotes: async (): Promise<void> => {
      set({ isLoading: true, error: null });
      try {
        const notes: Note[] = await fetchNotes(fetchNotesDependencies);
        set({ notes, isLoading: false });
      } catch (error: unknown) {
        const errorMessage: string =
          error instanceof Error ? error.message : 'Une erreur est survenue';
        set({
          error: errorMessage,
          isLoading: false,
        });
      }
    },
    createNote: async (): Promise<void> => {
      set({ isLoading: true, error: null });
      try {
        await createNote(createNoteDependencies);
        const notes: Note[] = await fetchNotes(fetchNotesDependencies);
        set({ notes, isLoading: false });
      } catch (error: unknown) {
        const errorMessage: string =
          error instanceof Error ? error.message : 'Une erreur est survenue';
        set({
          error: errorMessage,
          isLoading: false,
        });
      }
    },
    deleteNote: async (id: NoteId): Promise<void> => {
      set({ isLoading: true, error: null });
      try {
        await deleteNote(id, deleteNoteDependencies);
        const notes: Note[] = await fetchNotes(fetchNotesDependencies);
        set({ notes, isLoading: false });
      } catch (error: unknown) {
        const errorMessage: string =
          error instanceof Error ? error.message : 'Une erreur est survenue';
        set({
          error: errorMessage,
          isLoading: false,
        });
      }
    },
  };
  return store;
});
