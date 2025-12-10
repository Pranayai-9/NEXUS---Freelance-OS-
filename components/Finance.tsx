import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Edit, ChevronDown } from 'lucide-react';
import { Invoice } from '../types';
import { Card } from './Card';

interface FinanceProps {
  invoices: Invoice[];
  onCreateInvoice: () => void;
  onEditInvoice?: (invoice: Invoice) => void;
}

export const Finance: React.FC<FinanceProps> = ({ invoices, onCreateInvoice, onEditInvoice }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const totalRevenue = invoices
    .filter(i => i.status === 'Paid')
    .reduce((acc, curr) => acc + parseFloat(curr.amount.replace(/,/g, '')), 0);
  
  const pendingAmount = invoices
    .filter(i => i.status === 'Pending')
    .reduce((acc, curr) => acc + parseFloat(curr.amount.replace(/,/g, '')), 0);

  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = filterStatus === 'All' || inv.status === filterStatus;
    const matchesSearch = 
        inv.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
        inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Finance</h2>
          <p className="text-slate-500">Manage your earnings and invoices.</p>
        </div>
        <button 
          onClick={onCreateInvoice}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-lg shadow-slate-900/10 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="relative overflow-hidden">
           <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
           <p className="text-slate-500 font-medium mb-1 relative z-10">Total Revenue</p>
           <h3 className="text-3xl font-bold text-slate-800 relative z-10">${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
        </Card>
        <Card className="relative overflow-hidden">
           <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-50"></div>
           <p className="text-slate-500 font-medium mb-1 relative z-10">Pending Invoices</p>
           <h3 className="text-3xl font-bold text-slate-800 relative z-10">${pendingAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
        </Card>
      </div>

      {/* Invoice List */}
      <Card noPadding className="overflow-hidden flex flex-col bg-white/70">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/40">
          <h3 className="font-bold text-slate-700">
            {filterStatus === 'All' ? 'All Invoices' : `${filterStatus} Invoices`}
          </h3>
          <div className="flex items-center gap-3 w-full md:w-auto">
            
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients or IDs..." 
                className="w-full bg-white border border-slate-200 rounded-lg py-1.5 pl-9 pr-4 text-sm text-slate-700 focus:border-violet-500/50 outline-none shadow-sm transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10">
                    <Filter size={14} />
                </div>
                <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 hover:border-violet-200 rounded-lg py-1.5 pl-9 pr-8 text-sm text-slate-700 focus:border-violet-500/50 outline-none shadow-sm cursor-pointer transition-all"
                >
                    <option value="All">All Statuses</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronDown size={12} />
                </div>
            </div>

          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-400">
              <tr>
                <th className="px-6 py-3 tracking-wider">Invoice ID</th>
                <th className="px-6 py-3 tracking-wider">Client</th>
                <th className="px-6 py-3 tracking-wider">Date</th>
                <th className="px-6 py-3 tracking-wider">Amount</th>
                <th className="px-6 py-3 tracking-wider">Status</th>
                <th className="px-6 py-3 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => (
                    <tr 
                        key={inv.id} 
                        onClick={() => onEditInvoice && onEditInvoice(inv)}
                        className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                    >
                    <td className="px-6 py-4 font-mono text-slate-600 font-medium">{inv.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{inv.client}</td>
                    <td className="px-6 py-4">{inv.date}</td>
                    <td className="px-6 py-4 text-slate-800 font-bold">${inv.amount}</td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold border ${
                        inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                        inv.status === 'Overdue' ? 'bg-rose-50 text-rose-600 border-rose-200' : 
                        'bg-amber-50 text-amber-600 border-amber-200'
                        }`}>
                        {inv.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                            {onEditInvoice && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEditInvoice(inv);
                                    }}
                                    className="p-1.5 hover:bg-violet-50 rounded text-slate-400 hover:text-violet-600 transition-colors"
                                >
                                    <Edit size={16} />
                                </button>
                            )}
                            <button 
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors"
                            >
                                <Download size={16} />
                            </button>
                        </div>
                    </td>
                    </tr>
                ))
              ) : (
                  <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                          No invoices found matching your filters.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};