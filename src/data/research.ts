import { CAMAD_PAPER } from '@/data/links'
import type { PhotoKey } from '@/data/photos'

export interface ResultRow {
  setup: string
  accuracy: string
  macroF1: string
}

export interface Paper {
  id: string
  title: string
  authors?: string
  venue: string
  status: 'published' | 'in-submission' | 'report'
  statusLabel: string
  summary: string
  /** Under review: the abstract is shown blurred until publication. */
  embargoed?: boolean
  pdf?: string
  photo?: PhotoKey
  photoAlt?: string
  results?: { caption: string; rows: ResultRow[]; notes: string[] }
  tags: string[]
}

export const papers: Paper[] = [
  {
    id: 'camad',
    title: 'Mind the Semantic Gap: Tool-Grounded Generation and Semantic Validation of YANG Telecom Topologies',
    authors: 'Dániel Sajben, Laszlo Toka',
    venue: 'IEEE CAMAD 2026',
    status: 'published',
    statusLabel: 'Published · first author',
    summary:
      'A telecom topology can pass every YANG schema check and still be unable to carry the service it was built for. We pair an Actor-Critic generator for RFC 8345 topologies with a validator in which an open-weight LLM interprets deterministic graph checks for paths, bandwidth, latency, feedback links and ontology compatibility.',
    pdf: CAMAD_PAPER,
    photo: 'camad',
    photoAlt: 'Dániel presenting the paper at IEEE CAMAD 2026, slide titled “How a verdict is made — and why we prune first”.',
    results: {
      caption: 'Semantic validation on 50 Industry 4.0 digital-twin scenarios',
      rows: [
        { setup: 'Qwen3 32B · diagnostic', accuracy: '94.0%', macroF1: '0.915' },
        { setup: 'Qwen2.5 32B · diagnostic', accuracy: '92.0%', macroF1: '0.890' },
        { setup: 'Qwen2.5 32B · single round', accuracy: '90.0%', macroF1: '0.838' },
      ],
      notes: [
        'Single-round mode cuts median runtime from 56.5 s to 25.5 s (about 2.2× faster).',
        'Synthesis accepts 110 unique topologies from 500 combinatorial intents.',
      ],
    },
    tags: ['LLM agents', 'Tool use', 'YANG / RFC 8345', '5G/6G'],
  },
  {
    id: 'harmonisation',
    title: 'Multi-site fMRI harmonisation',
    authors: 'Dániel Sajben et al.',
    venue: 'Medical Image Analysis (journal)',
    status: 'in-submission',
    statusLabel: 'In submission',
    summary:
      'A harmonisation approach that removes scanner-specific variation from fMRI so cohorts from different sites can be studied together, compared against established baselines across several cohorts.',
    embargoed: true,
    tags: ['fMRI', 'Neuroimaging', 'Harmonisation'],
  },
  {
    id: 'survey',
    title: 'Towards Temporal Reasoning: A Survey of Temporal GNN/LLM Hybrids',
    authors: 'Team of four',
    venue: 'Group research report · 2025',
    status: 'report',
    statusLabel: 'Technical report',
    summary:
      'The first taxonomy of models that combine graph neural networks with large language models to reason over graphs that change in time: LLM-centred, GNN-centred and fusion designs across 100+ papers, with the benchmarks used for temporal QA and forecasting.',
    pdf: '/GNNsAndLLMs.pdf',
    tags: ['GNN', 'LLM', 'Dynamic graphs'],
  },
]
