import { NotesTemplate } from '../templates/NotesTemplate';
import { useNotesViewModel } from './Notes.viewmodel';

export function Notes() {
  const viewModel = useNotesViewModel();
  return <NotesTemplate />;
}
