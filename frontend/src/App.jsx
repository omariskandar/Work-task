import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllContent from './pages/AllContent';
import AddContent from './pages/AddContent';
import EditContent from './pages/EditContent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="relative flex min-h-screen flex-col bg-transparent text-white">
        <div className="noise" aria-hidden="true" />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<AllContent />} />
            <Route path="/add" element={<AddContent />} />
            <Route path="/edit/:id" element={<EditContent />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0f172a',
              color: '#fff',
              borderRadius: '999px',
              padding: '12px 16px',
              border: '1px solid rgba(255,255,255,0.12)'
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22d3ee',
                secondary: '#030712'
              }
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#f472b6',
                secondary: '#030712'
              }
            }
          }}
        />
      </div>
    </Router>
  );
}

export default App;
