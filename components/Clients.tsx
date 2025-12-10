
import React from 'react';
import { Mail, Phone, ExternalLink, Briefcase, TrendingUp, MoreVertical, UserPlus } from 'lucide-react';
import { Client } from '../types';
import { Card } from './Card';

interface ClientsProps {
  clients: Client[];
}

export const Clients: React.FC<ClientsProps> = ({ clients }) => {
  return (
    <div className="p-6 md:p-8 h-full overflow-y-auto animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Clients</h2>
          <p className="text-slate-500">Manage relationships and contact details.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-lg shadow-slate-900/10 transition-all flex items-center gap-2">
            <UserPlus size={18} /> Add Client
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="relative group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-4 right-4">
                <button className="text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>
            
            <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full p-1 bg-white border border-slate-100 shadow-sm mb-4 relative">
                    <img 
                        src={client.avatar} 
                        alt={client.name} 
                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <span className={`absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full ${
                        client.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}></span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{client.name}</h3>
                <p className="text-sm font-medium text-violet-600">{client.company}</p>
                <span className={`mt-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                    client.status === 'Active' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                    {client.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Projects</p>
                    <p className="text-xl font-bold text-slate-800 flex items-center justify-center gap-1">
                        <Briefcase size={14} className="text-slate-400"/> {client.projectsCount}
                    </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Lifetime</p>
                    <p className="text-xl font-bold text-slate-800 flex items-center justify-center gap-1">
                        <TrendingUp size={14} className="text-emerald-500"/> {client.totalValue}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <a href={`mailto:${client.email}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-600 group/link">
                    <div className="p-2 bg-violet-50 text-violet-600 rounded-lg group-hover/link:bg-violet-100 transition-colors">
                        <Mail size={16} />
                    </div>
                    <span className="font-medium truncate">{client.email}</span>
                </a>
                <a href={`tel:${client.phone}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-600 group/link">
                    <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg group-hover/link:bg-cyan-100 transition-colors">
                        <Phone size={16} />
                    </div>
                    <span className="font-medium">{client.phone}</span>
                </a>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center">
                <button className="text-xs font-bold text-slate-400 hover:text-violet-600 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    View Full Profile <ExternalLink size={12} />
                </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
