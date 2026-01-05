import { Add } from '@mui/icons-material';

export interface CreateButtonProps {
  onClick: () => void;
  label?: string;
}

export function CreateButton({ onClick, label = 'Create note' }: CreateButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        fontSize: '16px',
        fontWeight: 'bold',
        gap: '8px',
        padding: '10px 20px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#45a049';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#4CAF50';
      }}
    >
      <Add />
      {label}
    </button>
  );
}
