import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, FileText, Settings, User, ArrowRight, Command } from 'lucide-react';

interface OmniCommandProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

export const OmniCommand: React.FC<OmniCommandProps> = ({ isOpen, onClose, onAction }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
        setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const suggestions = [
    { id: 'new-task', label: 'Create New Task', icon: Plus, shortcut: 'N' },
    { id: 'create-invoice', label: 'Create Invoice', icon: FileText, shortcut: 'I' },
    { id: 'search-clients', label: 'Search Clients', icon: User, shortcut: 'C' },
    { id: 'settings', label: 'System Settings', icon: Settings, shortcut: 'S' },
  ].filter(item => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-slate-500/20 backdrop-blur-sm transition-opacity" />

        {/* Modal */}
        <div 
            className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl border border-white/40 rounded-xl shadow-2xl overflow-hidden animate-[scaleIn_0.15s_ease-out] ring-1 ring-black/5"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100 bg-white/50">
                <Search size={20} className="text-slate-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-lg"
                />
                <div className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500">ESC</div>
            </div>

            <div className="py-2 max-h-[60vh] overflow-y-auto">
                {suggestions.length > 0 ? (
                    <div className="px-2 space-y-1">
                        <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Suggestions</div>
                        {suggestions.map((item, idx) => (
                            <button
                                key={item.id}
                                onClick={() => { onAction(item.id); onClose(); }}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors group ${idx === 0 ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                <item.icon size={18} className={idx === 0 ? 'text-violet-600' : 'text-slate-400 group-hover:text-slate-500'} />
                                <span className="flex-1 font-medium">{item.label}</span>
                                {idx === 0 && <ArrowRight size={16} className="text-violet-500 mr-2" />}
                                <span className="text-xs font-mono text-slate-400 border border-slate-200 rounded px-1.5 bg-white">{item.shortcut}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center text-slate-400">
                        <p>No commands found for "{query}"</p>
                    </div>
                )}
            </div>
            
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Command size={10}/> Omni-Command v2.1</span>
                <span>Use arrows to navigate</span>
            </div>
        </div>
    </div>
  );
};