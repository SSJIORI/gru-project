import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import TranslatorPage from './pages/TranslatorPage.jsx';

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-porcelain font-sans text-ink">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/translator" element={<TranslatorPage />} />
      </Routes>
      <Toaster position="bottom-center" toastOptions={{ className: 'font-sans' }} />
    </main>
  );
}
