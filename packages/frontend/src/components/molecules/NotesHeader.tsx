import { CreateButton } from '../atoms/CreateButton';

export interface NotesHeaderProps {
  onCreateClick: () => void;
}

export function NotesHeader({ onCreateClick }: NotesHeaderProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}
    >
      <h1 style={{ margin: 0 }}>Notes</h1>
      <CreateButton onClick={onCreateClick} />
    </div>
  );
}
