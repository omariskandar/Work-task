import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './ui/button';
import { cn } from '../utils/cn';

const navLinks = [
  { label: 'Library', path: '/' },
  { label: 'Add Content', path: '/add' }
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current;
      const beyondThreshold = currentY > 80;

      if (isOpen) {
        setIsHidden(false);
      } else if (isScrollingDown && beyondThreshold) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentY <= 0 ? 0 : currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-white/10 bg-[var(--color-background)] text-white transition-transform duration-300',
        isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6] text-sm font-semibold text-white shadow-sm">
            CM
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
              Content Manager
            </p>
            <p className="text-base font-semibold tracking-tight text-white">Workspace</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-1.5 py-1 text-sm font-medium text-white/80 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'rounded-md px-4 py-1.5 transition-all duration-200',
                isActive(link.path)
                  ? 'bg-white text-[#0F172A] font-semibold shadow-sm'
                  : 'hover:bg-white/10'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden rounded-lg border border-white/20 bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[var(--color-background)] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'rounded-lg px-4 py-2.5 text-sm font-medium text-white/80 transition-all',
                  isActive(link.path) ? 'bg-white text-[#0F172A] font-semibold' : 'bg-white/5 hover:bg-white/10'
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
