import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../utils/cn';

const ModernSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  className
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [dropdownRect, setDropdownRect] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current) return;
      const clickedInsideTrigger = containerRef.current.contains(event.target);
      const clickedInsideDropdown = dropdownRef.current?.contains(event.target);
      if (!clickedInsideTrigger && !clickedInsideDropdown) {
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
      className={cn('relative w-full', open ? 'z-50' : 'z-10', className)}
    >
      {label && <p className="section-title">{label}</p>}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex h-12 w-full items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] transition',
          open && 'border-[#3B82F6] ring-2 ring-[#93C5FD]'
        )}
      >
        <span>{activeOption?.label || placeholder}</span>
        <svg
          className={cn('h-4 w-4 text-[#6B7280] transition-transform', open && 'rotate-180')}
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
            ref={dropdownRef}
            className="fixed z-[9999] space-y-1 rounded-lg border border-[#E5E7EB] bg-white p-2 shadow-lg"
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
                    'flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium transition',
                    active
                      ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]'
                      : 'text-[#374151] hover:bg-[#F3F4F6]'
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
