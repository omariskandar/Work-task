import { useState } from 'react';
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

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-[#111827] text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B82F6] text-base font-semibold text-white">
            CM
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
              Content Manager
            </p>
            <p className="text-lg font-semibold tracking-tight text-white">Workspace</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-1 text-sm font-medium text-white/80 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'rounded-full px-4 py-2 transition-all',
                isActive(link.path)
                  ? 'bg-white text-[#111827]'
                  : 'hover:bg-white/20'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden rounded-full border border-white/20 bg-white/10 p-2 text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/5 bg-[#111827] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'rounded-2xl px-4 py-3 text-white/80 transition-all',
                  isActive(link.path) ? 'bg-white text-[#111827]' : 'bg-white/10 hover:bg-white/20'
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
