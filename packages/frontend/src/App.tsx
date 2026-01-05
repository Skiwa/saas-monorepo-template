import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Notes } from './components/pages/Notes';
import { Header } from './components/organisms/Header';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
