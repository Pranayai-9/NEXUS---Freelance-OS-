
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DeepFlowHUD } from './components/DeepFlowHUD';
import { OmniCommand } from './components/OmniCommand';
import { CreateInvoiceModal } from './components/CreateInvoiceModal';
import { Finance } from './components/Finance';
import { AIChat } from './components/AIChat';
import { Projects } from './components/Projects';
import { Clients } from './components/Clients';
import { Search, Bell, Menu } from 'lucide-react';
import { ViewState, Task, Invoice } from './types';
import { TASKS, INVOICES, PROJECTS, CLIENTS } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewState>('dashboard');
  const [focusMode, setFocusMode] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task>(TASKS[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Invoice State
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Omni-Command with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(prev => !prev);
      }
      // Close things with ESC
      if (e.key === 'Escape') {
        setCommandOpen(false);
        setFocusMode(false);
        setInvoiceModalOpen(false);
        setEditingInvoice(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandAction = (actionId: string) => {
    console.log(`Executing: ${actionId}`);
    if (actionId === 'create-invoice') {
      setEditingInvoice(null);
      setInvoiceModalOpen(true);
    } else if (actionId === 'new-task') {
       // logic for new task
    } else if (actionId === 'search-clients') {
       setActiveTab('clients');
    }
  };

  const handleSaveInvoice = (invoiceData: Partial<Invoice>) => {
    if (invoiceData.id) {
        // Update existing
        setInvoices(prev => prev.map(inv => inv.id === invoiceData.id ? { ...inv, ...invoiceData } as Invoice : inv));
    } else {
        // Create new
        const id = `INV-${String(invoices.length + 1).padStart(3, '0')}`;
        setInvoices([{ ...invoiceData, id } as Invoice, ...invoices]);
    }
  };

  const openCreateModal = () => {
    setEditingInvoice(null);
    setInvoiceModalOpen(true);
  };

  const openEditModal = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setInvoiceModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-violet-200 overflow-hidden flex relative">
      
      {/* 1. Deep Flow HUD Overlay */}
      <DeepFlowHUD 
        isActive={focusMode} 
        onClose={() => setFocusMode(false)} 
        activeTask={activeTask}
      />

      {/* 2. Omni-Command Palette */}
      <OmniCommand 
        isOpen={commandOpen} 
        onClose={() => setCommandOpen(false)} 
        onAction={handleCommandAction}
      />

      {/* 3. Create/Edit Invoice Modal */}
      <CreateInvoiceModal 
        isOpen={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        onSubmit={handleSaveInvoice}
        initialData={editingInvoice}
      />

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 4. Left Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 transform md:relative md:translate-x-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <Sidebar activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }} />
      </div>

      {/* 5. Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-gradient-to-br from-slate-50 via-white to-blue-50">
        
        {/* Top Header */}
        <header className="h-16 md:h-20 border-b border-white/40 bg-white/40 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 z-20 shrink-0">
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:text-slate-800">
                <Menu size={20} />
            </button>
            <div 
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/60 border border-slate-200/60 rounded-lg w-72 lg:w-96 hover:border-violet-200 transition-colors cursor-pointer group shadow-sm"
                onClick={() => setCommandOpen(true)}
            >
              <Search size={16} className="text-slate-400 group-hover:text-violet-500" />
              <span className="text-sm text-slate-400 group-hover:text-slate-600 select-none">Quick Actions...</span>
              <div className="ml-auto flex gap-1">
                 <span className="text-[10px] border border-slate-200 rounded px-1.5 py-0.5 text-slate-500 bg-slate-50">⌘K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => setFocusMode(true)} className="text-xs font-bold uppercase tracking-wider text-violet-600 hover:text-violet-700 transition-colors hidden sm:block">
                Focus Mode
            </button>
            <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
            <div className="relative group cursor-pointer">
              <Bell size={20} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'dashboard' && (
            <Dashboard 
                onEnterFocusMode={() => setFocusMode(true)} 
                onTaskSelect={setActiveTask}
                activeTaskId={activeTask.id}
                invoices={invoices}
            />
          )}
          {activeTab === 'finance' && (
            <Finance 
              invoices={invoices} 
              onCreateInvoice={openCreateModal}
              onEditInvoice={openEditModal}
            />
          )}
          {activeTab === 'chat' && (
            <AIChat />
          )}
          {activeTab === 'projects' && (
            <Projects projects={PROJECTS} />
          )}
          {activeTab === 'clients' && (
            <Clients clients={CLIENTS} />
          )}
        </div>
      </main>
    </div>
  );
}
