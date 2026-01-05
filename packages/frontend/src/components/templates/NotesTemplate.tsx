import type { NoteId } from 'api-contracts';
import type { Note } from '../../core/domain/types/Note';
import { LoadingState } from '../atoms/LoadingState';
import { NotesHeader } from '../molecules/NotesHeader';
import { NotesList } from '../organisms/NotesList';

export interface NotesTemplateProps {
  createNote: () => Promise<void>;
  deleteNote: (id: NoteId) => Promise<void>;
  notes: Note[];
  isLoading: boolean;
  error: string | null;
}

export function NotesTemplate({
  notes,
  isLoading,
  error,
  createNote,
  deleteNote,
}: NotesTemplateProps) {
  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Notes</h1>
        <div
          style={{ backgroundColor: '#fee', borderRadius: '4px', color: 'red', padding: '12px' }}
        >
          Error: {error}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Notes</h1>
        <LoadingState />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <NotesHeader onCreateClick={createNote} />
      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        <NotesList notes={notes} onDeleteNote={deleteNote} />
      )}
    </div>
  );
}
