
import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Calendar, ArrowUpRight, Clock, Layers } from 'lucide-react';
import { Project } from '../types';
import { Card } from './Card';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [filter, setFilter] = useState<'All' | 'In Progress' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'All' 
        ? true 
        : filter === 'Completed' 
            ? p.status === 'Completed'
            : p.status !== 'Completed';
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 h-full overflow-y-auto animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Projects</h2>
          <p className="text-slate-500">Manage your active work and deliveries.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:border-violet-500/50 outline-none shadow-sm transition-all w-64"
             />
          </div>
          <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-lg shadow-slate-900/10 transition-all flex items-center gap-2">
            <Plus size={18} /> New Project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-slate-200/60 pb-1">
        {(['All', 'In Progress', 'Completed'] as const).map((tab) => (
            <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all relative ${
                    filter === tab 
                    ? 'text-violet-600 bg-white shadow-sm border-x border-t border-slate-100' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }`}
            >
                {tab}
                {filter === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />}
            </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden flex flex-col h-full">
            {/* Status Indicator Stripe */}
            <div className={`absolute top-0 left-0 w-1 h-full ${
                project.status === 'Completed' ? 'bg-emerald-500' :
                project.status === 'In Progress' ? 'bg-violet-500' :
                project.status === 'Review' ? 'bg-amber-500' : 'bg-slate-300'
            }`}></div>
            
            <div className="mb-4 flex justify-between items-start pl-3">
               <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                       project.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                       project.status === 'In Progress' ? 'bg-violet-50 text-violet-600 border-violet-100' :
                       project.status === 'Review' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                       'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>
                    {project.status}
                  </span>
               </div>
               <button className="text-slate-400 hover:text-slate-600 transition-colors">
                 <MoreHorizontal size={18} />
               </button>
            </div>

            <div className="pl-3 mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-violet-700 transition-colors">{project.title}</h3>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                    <Layers size={14} className="text-slate-400"/> {project.client}
                </p>
            </div>
            
            {project.description && (
                <p className="pl-3 text-sm text-slate-600 mb-6 line-clamp-2 leading-relaxed opacity-80">
                    {project.description}
                </p>
            )}

            <div className="mt-auto pl-3 pt-4 border-t border-slate-100">
               <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                     <Clock size={14} className="text-slate-400"/>
                     <span>Due {project.deadline}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{project.value}</span>
               </div>
               
               <div className="space-y-1.5">
                   <div className="flex justify-between text-xs">
                       <span className="text-slate-400 font-medium">Progress</span>
                       <span className="text-violet-600 font-bold">{project.progress}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full transition-all duration-1000 ${
                            project.status === 'Completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
                         }`}
                         style={{ width: `${project.progress}%` }}
                       ></div>
                   </div>
               </div>

               {project.tags && (
                   <div className="flex gap-2 mt-4 flex-wrap">
                       {project.tags.map(tag => (
                           <span key={tag} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded font-medium">
                               {tag}
                           </span>
                       ))}
                   </div>
               )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
