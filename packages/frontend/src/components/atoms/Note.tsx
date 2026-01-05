import { useMemo, useState } from 'react';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { NoteId } from 'api-contracts';
import type { Note } from '../../core/domain/types/Note';

export interface NoteProps {
  note: Note;
  deleteNote: (id: NoteId) => Promise<void>;
}

export function Note({ note, deleteNote }: NoteProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const rotation = useMemo(() => {
    return (Math.random() - 0.5) * 4;
  }, []);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteNote(note.id);
  };

  return (
    <div
      style={{
        backgroundColor: '#ffeb3b',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '12px',
        minWidth: '220px',
        maxWidth: '280px',
        minHeight: '220px',
        transform: `rotate(${rotation}deg)`,
        position: 'relative',
        fontFamily: '"Comic Sans MS", "Marker Felt", "Arial", sans-serif',
        border: 'none',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.05)`;
        e.currentTarget.style.zIndex = '10';
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg)`;
        e.currentTarget.style.zIndex = '1';
        setIsHovered(false);
      }}
      >
      {isHovered && (
        <IconButton
          onClick={handleDelete}
          size="small"
          sx={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#d32f2f',
            padding: '4px',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
            },
            zIndex: 20,
          }}
          aria-label="Delete note"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}

      <div
        style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '4px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '2px',
        }}
      />
      
      <div
        style={{
          borderBottom: '2px solid rgba(0, 0, 0, 0.15)',
          paddingBottom: '10px',
          marginBottom: '14px',
          marginTop: '8px',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            wordBreak: 'break-word',
            textShadow: '0 1px 1px rgba(255, 255, 255, 0.5)',
          }}
        >
          {note.title}
        </h3>
      </div>
      
      <p
        style={{
          margin: 0,
          fontSize: '15px',
          color: '#2c2c2c',
          lineHeight: '1.6',
          wordBreak: 'break-word',
          marginBottom: '16px',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {note.content}
      </p>
      
      <div
        style={{
          fontSize: '11px',
          color: '#666',
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px dashed rgba(0, 0, 0, 0.15)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ marginBottom: '4px' }}>
          <strong>ID:</strong> {note.id}
        </div>
        <div>
          <strong>Created:</strong> {formatDate(note.createdAt)}
        </div>
      </div>
    </div>
  );
}

