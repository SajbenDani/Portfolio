export type FilterCategory = 'all' | 'ai' | 'web' | 'research' | 'competition'

// Showcase banner images live in public/projects/ (1200×750 JPEG, named by project id).
// Sources: Unsplash (Unsplash License — free commercial use, no attribution required),
// except fmri-super-resolution.jpg, adapted from Miller AH, Jones JF, Drake DF, Tian H,
// Unger ER, Pagnoni G (2014), PLoS ONE 9(5): e98156, doi:10.1371/journal.pone.0098156 — CC BY 4.0.

export interface Project {
  id: string
  title: string
  description: string
  /** Banner photo shown on the showcase laptop screen ("/projects/<id>.jpg"). */
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
    image: '/projects/fmri-super-resolution.jpg',
    title: 'fMRI Super-Resolution & Harmonisation',
    description:
      'Thesis research applying Latent Diffusion Models to fMRI brain scan super-resolution and synthetic data generation. Enables enhanced data quality for large-scale neuroimaging studies.',
    category: 'research',
    tags: ['Python', 'PyTorch', 'Diffusion Models', 'Generative AI', 'Medical Imaging'],
    github: 'https://github.com/SajbenDani/Thesis',
    featured: true,
  },
  {
    id: 'wids-wildfire-2026',
    image: '/projects/wids-wildfire-2026.jpg',
    title: 'WiDS Datathon 2026 · Wildfire Survival Prediction',
    description:
      'Competed in the Women in Data Science Global Datathon 2026. Predicted which safety areas will get hit first by the fire using tabular foundation models (TabPFN, Mitra), RSF and XGBoost baselines, feature engineering, VIF score calculation, correlation analysis, and hyperparameter tuning. Optimised towards Hybrid Score = 0.3 × C-index + 0.7 × (1 − Weighted Brier Score).',
    category: 'competition',
    tags: ['Python', 'TabPFN', 'XGBoost', 'RSF', 'Survival Analysis', 'Feature Engineering'],
    github: 'https://www.kaggle.com/competitions/WiDSWorldWide_GlobalDathon26',
    featured: true,
  },
  {
    id: 'survival-analysis',
    image: '/projects/survival-analysis.jpg',
    title: 'Survival Analysis · Tabular Foundation Models',
    description:
      'Research project at TUM investigating Tabular Foundation Models (Tarte, TabPFN, TabICL) for medical prognostic tasks. Benchmarked against DeepSurv, XGBoost, and RSF via survival stacking. Addressed competing risks and worked with the Neural Fine-Gray repository. Awarded grade 1.0; presented at a TUM university research conference.',
    category: 'research',
    tags: ['Python', 'PyTorch', 'TabPFN', 'Survival Analysis', 'Competing Risks', 'Neural Fine-Gray'],
    github: 'https://github.com/Laminfr/TFM_for_Medical_Prognostic_Task',
    featured: true,
  },
  {
    id: 'telecom-agentic',
    image: '/projects/telecom-agentic.jpg',
    title: 'Agentic Telecommunication Semantic Check',
    description: 'Ericsson × BME Research — content not yet public.',
    category: 'ai',
    tags: ['LLM', 'AI Agents', 'Ericsson', 'BME'],
    isPrivate: true,
    featured: false,
  },
  {
    id: 'gnn-llm-survey',
    image: '/projects/gnn-llm-survey.jpg',
    title: 'Towards Temporal Reasoning: Temporal GNN/LLM Hybrid Survey',
    description:
      'First taxonomy dedicated to Temporal GNN-LLM Hybrids (TGLH) — architectures combining Graph Neural Networks with Large Language Models for temporal reasoning over dynamic graphs. Categorises LLM-centred, GNN-centred, and fusion-based approaches across 100+ papers, including benchmarks for temporal QA and forecasting. Co-authored by a team of 4.',
    category: 'research',
    tags: ['GNN', 'LLM', 'Temporal Reasoning', 'Dynamic Graphs', 'Survey'],
    pdf: '/GNNsAndLLMs.pdf',
    primaryLink: '/GNNsAndLLMs.pdf',
    featured: false,
  },
  {
    id: 'self-driving-car',
    image: '/projects/self-driving-car.jpg',
    title: 'Self-Driving Car Simulation',
    description:
      'Built a self-driving car simulation leveraging neural networks in pure JavaScript — no external ML libraries. The AI learns to navigate traffic through a genetic algorithm that evolves driving behaviour over generations.',
    category: 'ai',
    tags: ['JavaScript', 'Neural Networks', 'Genetic Algorithm', 'Canvas API'],
    github: 'https://github.com/SajbenDani/SelfDrivingCar',
    video: '/demo.mp4',
    featured: true,
  },
  {
    id: 'mole-cancer-detection',
    image: '/projects/mole-cancer-detection.jpg',
    title: 'Mole Cancer Detection',
    description:
      'Deep learning model achieving 90% accuracy (on a balanced test set) for early melanoma detection. Built a CNN with TensorFlow on dermoscopy image datasets, tackling heavy class imbalance with augmentation and resampling strategies. Developed in a team of 3.',
    category: 'ai',
    tags: ['Python', 'TensorFlow', 'CNN', 'Class Imbalance', 'Medical AI'],
    github: 'https://github.com/SajbenDani/MoleCancerDetection',
    featured: true,
  },
  {
    id: 'exercise-logger',
    image: '/projects/exercise-logger.jpg',
    title: 'Exercise Logger',
    description:
      'Full-stack fitness tracking application built with React, TypeScript and Material-UI. Features workout logging, progress charts, and a clean responsive interface with efficient and optimal data fetching via public APIs.',
    category: 'web',
    tags: ['React', 'TypeScript', 'Material-UI', 'Public APIs'],
    github: 'https://github.com/SajbenDani/ExerciseLogger',
    featured: true,
  },
  {
    id: 'game-of-life',
    image: '/projects/game-of-life.jpg',
    title: 'Conway\'s Game of Life',
    description:
      'My first programming project — Conway\'s Game of Life built entirely in Java, including a custom Java Swing UI. Marks the beginning of my software development journey and demonstrates core OOP and UI principles.',
    category: 'web',
    tags: ['Java', 'Java Swing', 'OOP', 'Simulation'],
    github: 'https://github.com/SajbenDani/Java_Game_Of_Life',
    featured: false,
  },
]
