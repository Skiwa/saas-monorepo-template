import { useEffect } from 'react';
import { NotesTemplate } from '../templates/NotesTemplate';
import { useNotesViewModel } from './Notes.viewmodel';

export function Notes() {
  const { createNote, deleteNote, errorNotes, fetchNotes, isLoadingNotes, notes } =
    useNotesViewModel();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <NotesTemplate
      createNote={createNote}
      deleteNote={deleteNote}
      error={errorNotes}
      isLoading={isLoadingNotes}
      notes={notes}
    />
  );
}
