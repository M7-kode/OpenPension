import { Project, BlogPost, Skill } from './types';

export const SKILLS: Skill[] = [
  { name: 'Python (Pandas, Scikit)', level: 95, category: 'Data' },
  { name: 'Mojaloop API', level: 90, category: 'Backend' },
  { name: 'Docker & Kubernetes', level: 85, category: 'DevOps' },
  { name: 'React & TypeScript', level: 80, category: 'Frontend' },
  { name: 'CI/CD Pipelines', level: 85, category: 'DevOps' },
  { name: 'PostgreSQL / NoSQL', level: 88, category: 'Backend' },
];

export const PROJECTS: Project[] = [
  {
    id: 'mojaloop-pension',
    title: 'Pension Pay System',
    category: 'FinTech',
    description: 'Système complet de paiement des pensions interconnecté avec le switch national via l\'API Mojaloop. Gestion des DFSPs et réconciliation temps réel.',
    technologies: ['Mojaloop', 'Node.js', 'Redis', 'Docker'],
    featured: true,
    imageColor: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'data-pipeline-etl',
    title: 'Automated ETL Pipeline',
    category: 'Data Science',
    description: 'Pipeline d\'ingestion de données financières massives. Nettoyage automatique, détection d\'anomalies et chargement en Data Warehouse.',
    technologies: ['Python', 'Apache Airflow', 'Pandas', 'SQL'],
    featured: false,
    imageColor: 'from-emerald-600 to-green-500'
  },
  {
    id: 'fraud-detection',
    title: 'AI Fraud Detection',
    category: 'Data Science',
    description: 'Modèle de Machine Learning pour la détection de transactions frauduleuses sur les réseaux mobiles money.',
    technologies: ['TensorFlow', 'Scikit-learn', 'FastAPI'],
    featured: true,
    imageColor: 'from-purple-600 to-pink-500'
  },
  {
    id: 'infra-as-code',
    title: 'Open Source Cloud Infra',
    category: 'Automation',
    description: 'Déploiement automatisé d\'une infrastructure cloud souveraine utilisant Terraform et Ansible.',
    technologies: ['Terraform', 'Ansible', 'Linux'],
    featured: false,
    imageColor: 'from-orange-600 to-red-500'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Comprendre l\'architecture Mojaloop',
    date: '24 Oct 2024',
    category: 'Architecture',
    excerpt: 'Plongée technique dans les 3 couches de l\'API Mojaloop pour l\'interopérabilité financière.',
    readTime: '10 min',
    codeSnippet: 'await switch.quoteRequest({ amount: 100, currency: "XOF" });'
  },
  {
    id: '2',
    title: 'Optimiser Pandas pour 10M+ lignes',
    date: '10 Oct 2024',
    category: 'Notebook',
    excerpt: 'Techniques de vectorisation et utilisation de Dask pour traiter des datasets massifs localement.',
    readTime: '8 min',
    codeSnippet: 'import dask.dataframe as dd\ndf = dd.read_csv("big_data.csv")'
  },
  {
    id: '3',
    title: 'Automatiser vos rapports avec Python',
    date: '02 Oct 2024',
    category: 'Tutorial',
    excerpt: 'Génération automatique de PDF et envoi par email via SMTP et Jinja2.',
    readTime: '5 min'
  }
];
