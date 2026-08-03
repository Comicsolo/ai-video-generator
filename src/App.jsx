import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import GeneratePage from './pages/GeneratePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';

export default function App() {
  const [page, setPage] = useState('generate');

  return (
    <div className="min-h-screen">
      <Navbar page={page} setPage={setPage} />
      {page === 'generate' ? <GeneratePage /> : <HistoryPage />}
    </div>
  );
}
