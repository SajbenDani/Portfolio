export type FilterCategory = 'all' | 'ai' | 'web' | 'research' | 'competition'

export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: FilterCategory
  tags: string[]
  github?: string
  demo?: string
  video?: string
  pdf?: string
  primaryLink?: string   // overrides github for card-click URL
  achievement?: string
  isPrivate?: boolean
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'fmri-super-resolution',
    title: 'fMRI Super-Resolution & Harmonisation',
    description:
      'Thesis research applying Latent Diffusion Models to fMRI brain scan super-resolution and multi-site harmonisation. Enables cross-scanner compatibility for large-scale neuroimaging studies — submitted to NeurIPS 2026.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=500&fit=crop&auto=format',
    category: 'research',
    tags: ['Python', 'PyTorch', 'Diffusion Models', 'Generative AI', 'Medical Imaging'],
    github: 'https://github.com/SajbenDani/Thesis',
    featured: true,
  },
  {
    id: 'wids-wildfire-2026',
    title: 'WiDS Datathon 2026 · Wildfire Survival Prediction',
    description:
      'Top 50 placement in the Women in Data Science Global Datathon 2026. Predicted wildfire patient survival outcomes from a tabular dataset using tabular foundation models (TabPFN, Mitra), RSF and XGBoost baselines, feature engineering, VIF score calculation, correlation analysis, hyperparameter tuning, random seed search, and confident prediction augmentation. Optimised towards Hybrid Score = 0.3 × C-index + 0.7 × (1 − Weighted Brier Score) and participated in community discussions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format',
    category: 'competition',
    tags: ['Python', 'TabPFN', 'XGBoost', 'RSF', 'Survival Analysis', 'Feature Engineering'],
    github: 'https://www.kaggle.com/competitions/WiDSWorldWide_GlobalDathon26',
    achievement: 'Top 50 / ~2,000 · Score 0.9775',
    featured: true,
  },
  {
    id: 'survival-analysis',
    title: 'Survival Analysis · Tabular Foundation Models',
    description:
      'Research project at TUM investigating Tabular Foundation Models (Tarte, TabPFN, TabICL) for medical prognostic tasks. Benchmarked against DeepSurv, XGBoost, and RSF via survival stacking. Addressed competing risks and extended the Neural Fine-Gray repository. Awarded grade 1.0; presented at a TUM university research conference.',
    image: '/assets/survival-analysis-conference.jpg',
    category: 'research',
    tags: ['Python', 'PyTorch', 'TabPFN', 'Survival Analysis', 'Competing Risks', 'Neural Fine-Gray'],
    github: 'https://github.com/Laminfr/TFM_for_Medical_Prognostic_Task',
    featured: true,
  },
  {
    id: 'telecom-agentic',
    title: 'Agentic Telecommunication Semantic Check',
    description: 'Ericsson × BME Research — content not yet public.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&auto=format',
    category: 'ai',
    tags: ['LLM', 'AI Agents', 'Ericsson', 'BME'],
    isPrivate: true,
    featured: false,
  },
  {
    id: 'gnn-llm-survey',
    title: 'Towards Temporal Reasoning: Temporal GNN/LLM Hybrid Survey',
    description:
      'First taxonomy dedicated to Temporal GNN-LLM Hybrids (TGLH) — architectures combining Graph Neural Networks with Large Language Models for temporal reasoning over dynamic graphs. Categorises LLM-centred, GNN-centred, and fusion-based approaches, covering 100+ papers with benchmarks for temporal question answering, forecasting, and graph generation. Co-authored by a team of 4.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format',
    category: 'research',
    tags: ['GNN', 'LLM', 'Temporal Reasoning', 'Dynamic Graphs', 'Survey'],
    pdf: '/GNNsAndLLMs.pdf',
    primaryLink: '/GNNsAndLLMs.pdf',
    featured: false,
  },
  {
    id: 'self-driving-car',
    title: 'Self-Driving Car Simulation',
    description:
      'Built a self-driving car simulation leveraging neural networks in pure JavaScript — no external ML libraries. The AI learns to navigate traffic through a genetic algorithm that evolves driving behaviour over generations.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format',
    category: 'ai',
    tags: ['JavaScript', 'Neural Networks', 'Genetic Algorithm', 'Canvas API'],
    github: 'https://github.com/SajbenDani/SelfDrivingCar',
    video: '/demo.mp4',
    featured: true,
  },
  {
    id: 'mole-cancer-detection',
    title: 'Mole Cancer Detection',
    description:
      'Deep learning model achieving 90% accuracy (on a balanced test set) for early melanoma detection. Built a CNN with TensorFlow on dermoscopy image datasets, tackling heavy class imbalance with augmentation and resampling strategies. Developed in a team of 3.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop&auto=format',
    category: 'ai',
    tags: ['Python', 'TensorFlow', 'CNN', 'Class Imbalance', 'Medical AI'],
    github: 'https://github.com/SajbenDani/MoleCancerDetection',
    featured: true,
  },
  {
    id: 'exercise-logger',
    title: 'Exercise Logger',
    description:
      'Full-stack fitness tracking application built with React, TypeScript and Material-UI. Features workout logging, progress charts, and a clean responsive interface with efficient and optimal data fetching via public APIs.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop&auto=format',
    category: 'web',
    tags: ['React', 'TypeScript', 'Material-UI', 'Public APIs'],
    github: 'https://github.com/SajbenDani/ExerciseLogger',
    featured: true,
  },
  {
    id: 'game-of-life',
    title: 'Conway\'s Game of Life',
    description:
      'My first programming project — Conway\'s Game of Life built entirely in Java, including a custom Java Swing UI. Marks the beginning of my software development journey and demonstrates core OOP and UI principles.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format',
    category: 'web',
    tags: ['Java', 'Java Swing', 'OOP', 'Simulation'],
    github: 'https://github.com/SajbenDani/Java_Game_Of_Life',
    featured: false,
  },
]
