import { CAMAD_PAPER } from '@/data/links'
import type { PhotoKey } from '@/data/photos'

export type ProjectCategory = 'research' | 'ai' | 'competition' | 'web'

// Project images are the owner's own artefacts, never stock: his photos
// (public/photos/) or figures and frames from his work (public/projects/):
// fmri-thesis-sr.jpg = super-resolved slices from the thesis (Fig. 4.18),
// self-driving-demo.jpg = a frame of public/demo.mp4. Projects without an
// artefact are listed without an image.

export interface Project {
  id: string
  title: string
  summary: string
  category: ProjectCategory
  tags: string[]
  /** Own photo or an artefact from the work itself (public/projects/). None = listed without an image. */
  photo?: PhotoKey
  banner?: string
  imageAlt?: string
  /** object-position for the image when the subject is off-centre. */
  imagePosition?: string
  github?: string
  kaggle?: string
  paper?: string
  pdf?: string
  /** Label for the PDF link; defaults to “PDF”. */
  pdfLabel?: string
  video?: string
  /** Wide card on large screens. */
  wide?: boolean
}

export const projects: Project[] = [
  {
    id: 'telecom-semantic-gap',
    title: 'Tool-grounded validation of telecom topologies',
    summary:
      'An Actor-Critic loop that generates RFC 8345 YANG topologies and accepts them only when a tool-grounded LLM validator, running open-weight models locally, agrees they carry the intended service. Built with Ericsson, published at IEEE CAMAD 2026.',
    category: 'research',
    tags: ['LLM agents', 'Qwen', 'Graph tools', 'Synthetic data'],
    photo: 'camad',
    imagePosition: 'object-[18%_50%]',
    imageAlt: 'Dániel presenting the paper at IEEE CAMAD 2026, slide titled “How a verdict is made — and why we prune first”.',
    paper: CAMAD_PAPER,
    wide: true,
  },
  {
    id: 'survival-analysis',
    title: 'Survival analysis with tabular foundation models',
    summary:
      'TUM practical with two co-authors: can tabular foundation models (TabPFN, TabICL, TARTE) improve survival prediction? We tested FM embeddings and survival stacking against CoxPH, DeepSurv, XGBoost, RSF and Neural Fine-Gray, including competing risks. C-index 0.87 on SEER and 0.884 on PBC; presented as a poster at TUM.',
    category: 'research',
    tags: ['TabPFN', 'TabICL', 'Survival stacking', 'Spark'],
    photo: 'tum',
    imageAlt: 'Dániel and his co-authors beside their poster on tabular foundation models at TUM.',
    github: 'https://github.com/Laminfr/TFM_for_Medical_Prognostic_Task',
    pdf: '/papers/tum-tabular-foundation-models-report.pdf',
    pdfLabel: 'Read the report',
  },
  {
    id: 'fmri-super-resolution',
    title: 'fMRI super-resolution with latent diffusion',
    summary:
      'Bachelor thesis: a latent diffusion model in PyTorch that super-resolves fMRI brain scans and generates synthetic scans for augmentation. Won an award at the Scientific Students’ Conference (TDK) in 2025.',
    category: 'research',
    tags: ['PyTorch', 'Diffusion models', 'Medical imaging'],
    banner: '/projects/fmri-thesis-sr.jpg',
    imageAlt: 'Six axial fMRI slices, glowing green on black, super-resolved by the thesis model (classifier-free guidance 7.5).',
    github: 'https://github.com/SajbenDani/Thesis',
    pdf: '/thesis.pdf',
    pdfLabel: 'Thesis',
  },
  {
    id: 'skin-cancer',
    title: 'Skin cancer classifier',
    summary:
      'A multi-modal model: CNN transfer learning on dermoscopy images plus a random forest on patient metadata, trained on 380K+ samples. 90% accuracy on a balanced test set after tackling heavy class imbalance. Team of three.',
    category: 'ai',
    tags: ['TensorFlow', 'CNN', 'Random forest', 'Class imbalance'],
    github: 'https://github.com/SajbenDani/MoleCancerDetection',
  },
  {
    id: 'wids-wildfire-2026',
    title: 'WiDS Datathon 2026: wildfire survival',
    summary:
      'Predicting which safety zones a wildfire reaches first, with tabular foundation models (TabPFN, Mitra), random survival forests and XGBoost, tuned for a hybrid of C-index and weighted Brier score.',
    category: 'competition',
    tags: ['TabPFN', 'XGBoost', 'Survival analysis', 'Feature engineering'],
    kaggle: 'https://www.kaggle.com/competitions/WiDSWorldWide_GlobalDathon26',
  },
  {
    id: 'gnn-llm-survey',
    title: 'Survey of temporal GNN–LLM hybrids',
    summary:
      'A taxonomy of models that join graph neural networks and language models to reason over graphs that change in time, across 100+ papers and their benchmarks. Team of four.',
    category: 'research',
    tags: ['GNN', 'LLM', 'Temporal reasoning'],
    pdf: '/GNNsAndLLMs.pdf',
  },
  {
    id: 'self-driving-car',
    title: 'Self-driving car simulation',
    summary:
      'Neural networks written from scratch in plain JavaScript, no ML libraries. Cars learn to drive through traffic as a genetic algorithm evolves their behaviour over generations.',
    category: 'ai',
    tags: ['JavaScript', 'Neural networks', 'Genetic algorithm'],
    banner: '/projects/self-driving-demo.jpg',
    imageAlt: 'Frame from the simulation: cars on a three-lane road and, beside it, the live neural network steering the lead car.',
    github: 'https://github.com/SajbenDani/SelfDrivingCar',
    video: '/demo.mp4',
    wide: true,
  },
  {
    id: 'exercise-logger',
    title: 'Exercise logger',
    summary:
      'A React and TypeScript app for logging workouts and charting progress, with lean data fetching from public APIs.',
    category: 'web',
    tags: ['React', 'TypeScript', 'Material UI'],
    github: 'https://github.com/SajbenDani/ExerciseLogger',
  },
  {
    id: 'game-of-life',
    title: 'Conway’s Game of Life',
    summary:
      'My first programming project: the Game of Life in Java with a hand-built Swing interface. Where it started.',
    category: 'web',
    tags: ['Java', 'Swing', 'OOP'],
    github: 'https://github.com/SajbenDani/Java_Game_Of_Life',
  },
]

export const projectFilters: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Research', value: 'research' },
  { label: 'ML', value: 'ai' },
  { label: 'Contests', value: 'competition' },
  { label: 'Web', value: 'web' },
]
