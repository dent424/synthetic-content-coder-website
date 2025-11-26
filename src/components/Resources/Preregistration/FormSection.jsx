import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function FormSection({ title, sectionNumber, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-medium flex items-center justify-center">
            {sectionNumber}
          </span>
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronDown size={20} className="text-slate-500" />
        ) : (
          <ChevronRight size={20} className="text-slate-500" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 py-4 space-y-4 border-t border-slate-200">
          {children}
        </div>
      )}
    </div>
  );
}
