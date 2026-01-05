import { useNotesStore } from '../../core/stores/notes-store';

export function useNotesViewModel() {
  const { notes, isLoading, error, fetchNotes, createNote, deleteNote } = useNotesStore();

  return {
    createNote,
    deleteNote,
    errorNotes: error,
    fetchNotes,
    isLoadingNotes: isLoading,
    notes,
  };
}
