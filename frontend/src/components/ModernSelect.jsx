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
      {label && <p className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#374151] mb-2">{label}</p>}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex h-11 w-full items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] transition-all duration-200',
          open && 'border-[#3B82F6] ring-2 ring-[#BFDBFE]'
        )}
      >
        <span>{activeOption?.label || placeholder}</span>
        <svg
          className={cn('h-4 w-4 text-[#6B7280] transition-transform duration-200', open && 'rotate-180')}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
            className="fixed z-[9999] space-y-1 rounded-lg border border-[#E5E7EB] bg-white p-1.5 shadow-xl"
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
                    'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-all duration-150',
                    active
                      ? 'bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]'
                      : 'text-[#374151] hover:bg-[#F9FAFB]'
                  )}
                >
                  <span>{option.label}</span>
                  {active && (
                    <svg className="h-4 w-4 text-[#3B82F6]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
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
