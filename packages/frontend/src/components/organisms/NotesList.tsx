import { useState } from 'react';
import type { NoteId } from 'api-contracts';
import type { Note } from '../../core/domain/types/Note';
import { Note as NoteComponent } from '../atoms/Note';
import { ConfirmationDialog } from '../modal/ConfirmationDialog';

export interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: NoteId) => Promise<void>;
}

export function NotesList({ notes, onDeleteNote }: NotesListProps) {
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const handleDeleteClick = (note: Note) => {
    setNoteToDelete(note);
  };

  const handleConfirmDelete = async () => {
    if (!noteToDelete) {
      return;
    }

    await onDeleteNote(noteToDelete.id);
    setNoteToDelete(null);
  };

  const handleCancelDelete = () => {
    setNoteToDelete(null);
  };

  const message = noteToDelete
    ? `Are you sure you want to delete the note "${noteToDelete.title}"? This action cannot be undone.`
    : '';

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'flex-start',
        }}
      >
        {notes.map((note, index) => (
          <NoteComponent
            key={note.id}
            index={index}
            note={note}
            onDeleteClick={() => handleDeleteClick(note)}
          />
        ))}
      </div>
      <ConfirmationDialog
        confirmLabel="Delete"
        isDestructive={true}
        message={message}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        open={noteToDelete !== null}
        title="Delete note"
      />
    </>
  );
}
