import React from 'react';
import { Card } from './Card';
import { RevenueChart } from './RevenueChart';
import { PROJECTS, TASKS } from '../constants';
import { Project, Task, Invoice } from '../types';
import { DollarSign, Briefcase, Clock, ArrowUpRight, Plus, Calendar, MoreHorizontal, Zap } from 'lucide-react';

interface DashboardProps {
  onEnterFocusMode: () => void;
  onTaskSelect: (task: Task) => void;
  activeTaskId: number;
  invoices: Invoice[];
}

export const Dashboard: React.FC<DashboardProps> = ({ onEnterFocusMode, onTaskSelect, activeTaskId, invoices }) => {
  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full scroll-smooth">
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-[fadeIn_0.5s_ease-out]">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Overview</h2>
            <p className="text-slate-500">
              You have <span className="text-violet-600 font-bold border-b-2 border-violet-200">3 deadlines</span> approaching this week.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-lg shadow-slate-900/20 transition-all flex items-center gap-2">
              <Plus size={18} /> New Project
            </button>
            <button className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 rounded-lg font-medium border border-slate-200 transition-all flex items-center gap-2 shadow-sm">
              <Calendar size={18} /> Schedule
            </button>
          </div>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Monthly Revenue', value: '$14,250', change: '+12%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
            { label: 'Active Projects', value: '4', change: '2 in review', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
            { label: 'Hours Tracked', value: '32.5', change: 'This week', icon: Clock, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', border: 'border-fuchsia-100' },
          ].map((stat, i) => (
            <Card key={i} className="relative overflow-hidden group">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity ${stat.bg}`}></div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                    <stat.icon size={20} />
                </div>
                <span className="text-slate-500 font-medium text-sm">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2 relative z-10">
                <span className="text-3xl font-bold text-slate-800 tracking-tight">{stat.value}</span>
                <span className={`text-xs font-bold flex items-center gap-0.5 ${stat.color} bg-white px-1.5 py-0.5 rounded-full shadow-sm`}>
                  {stat.change.includes('+') && <ArrowUpRight size={12} />} {stat.change}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* MAIN SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-800">Liquid Revenue</h3>
                <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium">6 Months</span>
                </div>
              </div>
              <RevenueChart />
            </Card>

            <Card className="overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Active Projects</h3>
                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={20}/></button>
              </div>
              <div className="space-y-4">
                {PROJECTS.map((project: Project) => (
                  <div key={project.id} className="group p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-violet-200 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-700 group-hover:text-violet-700 transition-colors">{project.title}</h4>
                        <p className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">{project.client}</p>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm font-bold text-slate-700">{project.value}</span>
                        <span className={`text-[10px] uppercase tracking-wider font-bold ${
                            project.status === 'In Progress' ? 'text-violet-600' :
                            project.status === 'Review' ? 'text-amber-500' : 'text-slate-400'
                        }`}>{project.status}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div 
                                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full rounded-full shadow-sm group-hover:shadow-md transition-all duration-1000 ease-out" 
                                style={{ width: `${project.progress}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-slate-400 w-8 text-right font-medium">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* OMNI CONTEXT TASK LIST */}
            <Card className="h-full flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Next Actions</h3>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 border border-transparent hover:border-slate-200 transition-all">
                    <Plus size={16}/>
                </button>
              </div>
              
              <div className="space-y-3 flex-1">
                {TASKS.map((task: Task) => (
                  <div 
                    key={task.id} 
                    onClick={() => onTaskSelect(task)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 group relative overflow-hidden ${
                      activeTaskId === task.id 
                      ? 'bg-violet-50 border-violet-200 shadow-sm' 
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                    }`}
                  >
                    {activeTaskId === task.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500"></div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          activeTaskId === task.id ? 'border-violet-200 bg-violet-100' : 'border-slate-200 group-hover:border-slate-300'
                      }`}>
                        {activeTaskId === task.id && <div className="w-2.5 h-2.5 bg-violet-500 rounded-sm"></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${activeTaskId === task.id ? 'text-violet-900' : 'text-slate-700'}`}>{task.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold border border-slate-200">{task.tag}</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium"><Clock size={10} /> {task.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={onEnterFocusMode}
                className="w-full mt-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xl shadow-slate-900/10 hover:shadow-2xl transition-all flex items-center justify-center gap-2 group border border-white/10"
              >
                <Zap size={18} fill="currentColor" className="text-yellow-400" />
                <span>Enter Focus Mode</span>
              </button>
            </Card>

            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Recent Invoices</h3>
                    <span className="text-xs text-slate-400 font-medium">Last 30 days</span>
                </div>
                <div className="space-y-4">
                {invoices.map((inv: Invoice) => (
                    <div key={inv.id} className="flex items-center justify-between text-sm group cursor-default">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shadow-sm transition-all ${
                            inv.status === 'Paid' ? 'bg-emerald-500' : 
                            inv.status === 'Overdue' ? 'bg-rose-500' :
                            'bg-amber-500'
                        }`}></div>
                        <div>
                        <p className="text-slate-700 font-semibold">{inv.client}</p>
                        <p className="text-[10px] text-slate-400 font-mono tracking-wide">{inv.id}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-800 font-bold">${inv.amount}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${
                            inv.status === 'Paid' ? 'text-emerald-600' : 
                            inv.status === 'Overdue' ? 'text-rose-600' :
                            'text-amber-600'
                        }`}>{inv.status}</p>
                    </div>
                    </div>
                ))}
                </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};