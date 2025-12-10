import React, { useState, useEffect } from 'react';
import { X, DollarSign, User, Calendar, Check } from 'lucide-react';
import { Invoice } from '../types';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoice: Partial<Invoice>) => void;
  initialData?: Invoice | null;
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<Invoice['status']>('Pending');

  useEffect(() => {
    if (initialData) {
        setClient(initialData.client);
        setAmount(initialData.amount);
        setDate(initialData.date); 
        setStatus(initialData.status);
    } else {
        setClient('');
        setAmount('');
        setDate('');
        setStatus('Pending');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id, 
      client,
      amount,
      date,
      status
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease-out]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/50">
          <h2 className="text-lg font-bold text-slate-800">{initialData ? 'Edit Invoice' : 'New Invoice'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Client Name"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Oct 01"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-800 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Pending', 'Paid', 'Overdue'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-2 rounded-lg text-sm font-semibold border transition-all ${
                    status === s 
                      ? s === 'Paid' ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm'
                      : s === 'Overdue' ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                      : 'bg-amber-50 border-amber-200 text-amber-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Check size={18} />
              {initialData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};