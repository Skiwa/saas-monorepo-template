import { useNotesStore } from '../../core/stores/notes-store';

export function useNotesViewModel() {
  const { notes, fetchNotesResult, fetchNotes, createNote, deleteNote } = useNotesStore();

  return {
    createNote,
    deleteNote,
    errorNotes: fetchNotesResult.error,
    fetchNotes,
    isLoadingNotes: fetchNotesResult.isLoading,
    notes,
  };
}
