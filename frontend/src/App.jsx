import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
      <div className="relative flex min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-text)]">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#111827',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '12px 16px',
              border: '1px solid #1f2937'
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22C55E',
                secondary: '#FFFFFF'
              }
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#DC2626',
                secondary: '#FFFFFF'
              }
            }
          }}
        />
      </div>
    </Router>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`page-transition ${transitionStage}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<AllContent />} />
        <Route path="/add" element={<AddContent />} />
        <Route path="/edit/:id" element={<EditContent />} />
      </Routes>
    </div>
  );
};

export default App;
