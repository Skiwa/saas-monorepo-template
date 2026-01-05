import { HomeTemplate } from '../templates/HomeTemplate';
import { useHomeViewModel } from './Home.viewmodel';

export function Home() {
  const viewModel = useHomeViewModel();
  return <HomeTemplate />;
}
