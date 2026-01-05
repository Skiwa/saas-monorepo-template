import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Notes } from './components/pages/Notes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/notes">Notes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
