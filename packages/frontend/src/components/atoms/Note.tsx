import { useState } from 'react';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { Note } from '../../core/domain/types/Note';

export interface NoteProps {
  index: number;
  note: Note;
  onDeleteClick: () => void;
}

export function Note({ note, onDeleteClick, index }: NoteProps) {
  const [isHovered, setIsHovered] = useState(false);

  const rotation = (index % 2) * 2.5;

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick();
  };

  return (
    <div
      style={{
        backgroundColor: '#ffeb3b',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Comic Sans MS", "Marker Felt", "Arial", sans-serif',
        margin: '12px',
        maxWidth: '280px',
        minHeight: '220px',
        minWidth: '220px',
        padding: '20px',
        position: 'relative',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.2s ease',
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
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
            },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#d32f2f',
            padding: '4px',
            position: 'absolute',
            right: '4px',
            top: '4px',
            zIndex: 20,
          }}
          aria-label="Delete note"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}

      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '2px',
          height: '4px',
          left: '50%',
          position: 'absolute',
          top: '8px',
          transform: 'translateX(-50%)',
          width: '40px',
        }}
      />

      <div
        style={{
          borderBottom: '2px solid rgba(0, 0, 0, 0.15)',
          marginBottom: '14px',
          marginTop: '8px',
          paddingBottom: '10px',
        }}
      >
        <h3
          style={{
            color: '#1a1a1a',
            fontSize: '20px',
            fontWeight: 'bold',
            margin: 0,
            textShadow: '0 1px 1px rgba(255, 255, 255, 0.5)',
            wordBreak: 'break-word',
          }}
        >
          {note.title}
        </h3>
      </div>

      <p
        style={{
          color: '#2c2c2c',
          flex: 1,
          fontSize: '15px',
          lineHeight: '1.6',
          margin: 0,
          marginBottom: '16px',
          overflow: 'hidden',
          wordBreak: 'break-word',
        }}
      >
        {note.content}
      </p>

      <div
        style={{
          borderTop: '1px dashed rgba(0, 0, 0, 0.15)',
          color: '#666',
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          marginTop: 'auto',
          paddingTop: '12px',
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
