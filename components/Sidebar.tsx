import React from 'react';
import { LayoutDashboard, CheckSquare, CreditCard, Users, Zap, ChevronRight, MessageSquare } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  activeTab: ViewState;
  onTabChange: (tab: ViewState) => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  id, 
  isActive, 
  onClick 
}: { 
  icon: React.ElementType, 
  label: string, 
  id: ViewState, 
  isActive: boolean, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      isActive
        ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-violet-600 border border-violet-100/50' 
        : 'text-slate-500 hover:bg-white/40 hover:text-slate-800 hover:border hover:border-white/40 border border-transparent'
    }`}
  >
    <Icon size={20} className={isActive ? 'text-violet-600' : 'text-slate-400 group-hover:text-slate-600'} />
    <span className="font-medium tracking-wide text-sm">{label}</span>
    {isActive && <ChevronRight size={16} className="ml-auto opacity-50 animate-pulse" />}
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-white/40 bg-white/30 backdrop-blur-2xl p-6 h-full relative z-20 shadow-[4px_0_30px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Zap size={18} className="text-white fill-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">NEXUS</h1>
      </div>

      <nav className="space-y-2 flex-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" id="dashboard" isActive={activeTab === 'dashboard'} onClick={() => onTabChange('dashboard')} />
        <SidebarItem icon={CheckSquare} label="Projects" id="projects" isActive={activeTab === 'projects'} onClick={() => onTabChange('projects')} />
        <SidebarItem icon={Users} label="Clients" id="clients" isActive={activeTab === 'clients'} onClick={() => onTabChange('clients')} />
        <SidebarItem icon={CreditCard} label="Finance" id="finance" isActive={activeTab === 'finance'} onClick={() => onTabChange('finance')} />
        <div className="pt-4 mt-4 border-t border-slate-200/60">
           <SidebarItem icon={MessageSquare} label="Nexus AI" id="chat" isActive={activeTab === 'chat'} onClick={() => onTabChange('chat')} />
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-200/60">
        <div className="flex items-center gap-3 px-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-white flex items-center justify-center overflow-hidden shadow-sm">
             <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700">Alex V.</p>
            <p className="text-xs text-slate-400 font-medium">Pro Tier</p>
          </div>
        </div>
      </div>
    </aside>
  );
};