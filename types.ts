
export interface Project {
  id: string;
  title: string;
  category: 'Data Science' | 'Automation' | 'FinTech' | 'Open Source';
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  imageColor: string; 
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: 'Tutorial' | 'Notebook' | 'Architecture' | 'News';
  excerpt: string;
  readTime: string;
  codeSnippet?: string;
}

export interface Skill {
  name: string;
  level: number; 
  category: 'Backend' | 'Data' | 'DevOps' | 'Frontend';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'home' | 'architecture' | 'demo' | 'impact';

// Types for the Demo Simulation
export interface TransactionLog {
  id: string;
  timestamp: string;
  step: 'LOOKUP' | 'QUOTE' | 'TRANSFER';
  status: 'PENDING' | 'SUCCESS' | 'ERROR';
  details: string;
  payload: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
  desc: string;
  icon: string;
}

export interface AdminTransaction {
  id: string;
  beneficiary: string;
  phone: string;
  amount: number;
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  date: string;
  operator: 'MTN' | 'MOOV' | 'CELTIS' | 'UBA';
}

export interface BulkBatch {
  id: string;
  fileName: string;
  totalRecords: number;
  totalAmount: number;
  status: 'UPLOADED' | 'PROCESSING' | 'COMPLETED';
  progress: number;
}
