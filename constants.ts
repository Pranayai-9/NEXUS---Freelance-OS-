
import { Project, Task, Invoice, Client } from './types';

export const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: "Fintech App Redesign", 
    client: "NeoBank Corp", 
    status: "In Progress", 
    deadline: "Oct 24", 
    progress: 65, 
    value: "$12,400",
    description: "Complete overhaul of the mobile banking interface with focus on accessibility.",
    tags: ["Mobile", "UX/UI", "Figma"]
  },
  { 
    id: 2, 
    title: "AI Marketing Dashboard", 
    client: "Sentient.ai", 
    status: "Review", 
    deadline: "Oct 12", 
    progress: 90, 
    value: "$8,500",
    description: "React-based dashboard for visualizing marketing sentiment analysis.",
    tags: ["React", "Data Viz", "AI"]
  },
  { 
    id: 3, 
    title: "E-commerce Migration", 
    client: "ShopifyPlus", 
    status: "Pending", 
    deadline: "Nov 01", 
    progress: 10, 
    value: "$5,200",
    description: "Migrating legacy store data to Shopify Plus environment.",
    tags: ["Shopify", "Migration", "Backend"]
  },
  {
    id: 4,
    title: "Corporate Identity System",
    client: "Global Logistics",
    status: "Completed",
    deadline: "Sep 15",
    progress: 100,
    value: "$15,000",
    description: "Full rebrand including logo, typography, and stationaries.",
    tags: ["Branding", "Print", "Strategy"]
  }
];

export const CLIENTS: Client[] = [
  {
    id: "C-001",
    name: "Sarah Connors",
    company: "NeoBank Corp",
    email: "sarah@neobank.com",
    phone: "+1 (555) 012-3456",
    status: "Active",
    totalValue: "$45,200",
    projectsCount: 3,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  },
  {
    id: "C-002",
    name: "Michael Chang",
    company: "Sentient.ai",
    email: "m.chang@sentient.ai",
    phone: "+1 (555) 987-6543",
    status: "Active",
    totalValue: "$22,800",
    projectsCount: 2,
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d"
  },
  {
    id: "C-003",
    name: "Emma Wright",
    company: "ShopifyPlus",
    email: "emma.w@shopify.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    totalValue: "$5,200",
    projectsCount: 1,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    id: "C-004",
    name: "David Ross",
    company: "Global Logistics",
    email: "dross@globallogistics.com",
    phone: "+1 (555) 222-3333",
    status: "Inactive",
    totalValue: "$15,000",
    projectsCount: 1,
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d"
  }
];

export const TASKS: Task[] = [
  { id: 1, title: "Design System Handoff", project: "Fintech App", tag: "Design", time: "2h" },
  { id: 2, title: "Client Discovery Call", project: "Sentient.ai", tag: "Meeting", time: "45m" },
  { id: 3, title: "Fix Mobile Nav Bug", project: "Fintech App", tag: "Dev", time: "1h 30m" },
];

export const INVOICES: Invoice[] = [
  { id: "INV-001", client: "NeoBank Corp", date: "Oct 01", amount: "4,200.00", status: "Paid" },
  { id: "INV-002", client: "Sentient.ai", date: "Sep 28", amount: "2,150.00", status: "Pending" },
  { id: "INV-003", client: "ShopifyPlus", date: "Sep 15", amount: "1,800.00", status: "Overdue" },
];
