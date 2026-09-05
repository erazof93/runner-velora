import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'end';
}

const isSelectable = (item: DropdownItem) => !item.divider && !item.disabled;

export function Dropdown({ trigger, items, align = 'end' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const select = (item: DropdownItem) => {
    if (!isSelectable(item)) return;
    item.onClick?.();
    close();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center"
      >
        {trigger}
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-40 mt-2 min-w-[12rem] overflow-hidden rounded-lg border border-dark-600 bg-dark-800 py-1 shadow-lg ${
            align === 'end' ? 'right-0' : 'left-0'
          }`}
        >
          {items.map((item, index) =>
            item.divider ? (
              // oxlint-disable-next-line no-array-index-key -- separadores sin identidad propia
              <div key={`divider-${index}`} className="my-1 h-px bg-dark-600" />
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => select(item)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors disabled:opacity-50 hover:bg-dark-700 ${
                  item.danger ? 'text-error' : 'text-slate-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
