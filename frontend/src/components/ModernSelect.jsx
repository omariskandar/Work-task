import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../utils/cn';

const ModernSelect = ({ label, value, onChange, options = [], placeholder = 'Select option' }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [dropdownRect, setDropdownRect] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const updateRect = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownRect({
        width: rect.width,
        left: rect.left,
        top: rect.bottom + 12 // 12px gap
      });
    };

    if (open) {
      updateRect();
      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', updateRect, true);
    }

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [open]);

  const activeOption = options.find((option) => option.value === value);

  return (
    <div
      ref={containerRef}
      className={cn('relative', open ? 'z-50' : 'z-10')}
    >
      {label && (
        <p className="mb-2 text-sm font-medium text-white/70 uppercase tracking-[0.25em]">
          {label}
        </p>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex h-12 w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 text-sm font-medium text-white transition-all',
          open && 'border-cyan-300/70 bg-white/10 shadow-[0_12px_40px_rgba(6,182,212,0.35)]'
        )}
      >
        <span>{activeOption?.label || placeholder}</span>
        <svg
          className={cn('h-4 w-4 text-white/70 transition-transform', open && 'rotate-180')}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open &&
        dropdownRect &&
        createPortal(
          <div
            className="fixed z-[9999] space-y-1 rounded-3xl border border-white/10 bg-[#050b18]/95 p-2 shadow-[0_20px_70px_rgba(2,6,23,0.9)] backdrop-blur-2xl"
            style={{
              top: dropdownRect.top,
              left: dropdownRect.left,
              width: dropdownRect.width
            }}
          >
            {options.map((option) => {
              const active = option.value === value;
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
                    active
                      ? 'bg-white/10 text-white border border-white/15'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <span>{option.label}</span>
                  {active && (
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
};

export default ModernSelect;
