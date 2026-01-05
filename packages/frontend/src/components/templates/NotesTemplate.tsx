import type { NoteId } from 'api-contracts';
import { Add } from '@mui/icons-material';
import type { Note } from '../../core/domain/types/Note';
import { Note as NoteComponent } from '../atoms/Note';

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
          style={{ color: 'red', padding: '12px', backgroundColor: '#fee', borderRadius: '4px' }}
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
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ margin: 0 }}>Notes</h1>
        <button
          onClick={createNote}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#45a049';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4CAF50';
          }}
        >
          <Add />
          Create note
        </button>
      </div>
      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'flex-start',
          }}
        >
          {notes.map((note) => (
            <NoteComponent key={note.id} note={note} deleteNote={deleteNote} />
          ))}
        </div>
      )}
    </div>
  );
}
