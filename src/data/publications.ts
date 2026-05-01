export interface Publication {
  id: string
  title: string
  venue: string
  year: number
  status: 'published' | 'under review' | 'preprint' | 'unpublished'
  description: string
  blurDescription?: boolean
  pdf?: string
  tags: string[]
}

export const publications: Publication[] = [
  {
    id: 'fmri-harmonisation',
    title: 'fMRI Harmonisation',
    venue: 'NeurIPS 2026',
    year: 2026,
    status: 'under review',
    description:
      'Novel approach to multi-site fMRI data harmonisation, enabling cross-scanner compatibility for large-scale neuroimaging studies.',
    blurDescription: true,
    tags: ['fMRI', 'Neuroimaging', 'Harmonisation', 'NeurIPS'],
  },
  {
    id: 'gnn-llm-survey',
    title: 'Towards Temporal Reasoning: A Survey of Temporal GNN/LLM Hybrids',
    venue: 'Group Research · Team of 4',
    year: 2025,
    status: 'unpublished',
    description:
      'First taxonomy dedicated to Temporal GNN-LLM Hybrids (TGLH) — combining GNNs with LLMs for temporal reasoning over dynamic graphs. Categorises LLM-centred, GNN-centred, and fusion-based architectures across 100+ citations, covering benchmarks for temporal question answering, forecasting, and graph generation.',
    pdf: '/GNNsAndLLMs.pdf',
    tags: ['GNN', 'LLM', 'Temporal Reasoning', 'Dynamic Graphs', 'Survey'],
  },
]
