
export interface Project {
  id: number;
  title: string;
  client: string;
  status: 'In Progress' | 'Review' | 'Pending' | 'Completed';
  deadline: string;
  progress: number;
  value: string;
  description?: string;
  tags?: string[];
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  totalValue: string;
  projectsCount: number;
  avatar: string;
}

export interface Task {
  id: number;
  title: string;
  project: string;
  tag: 'Design' | 'Meeting' | 'Dev';
  time: string;
}

export interface Invoice {
  id: string;
  client: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'dashboard' | 'projects' | 'clients' | 'finance' | 'chat';
