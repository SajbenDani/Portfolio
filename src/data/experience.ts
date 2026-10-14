export interface Role {
  id: string
  role: string
  org: string
  period: string
  location: string
  kind: 'work' | 'research' | 'education'
  current?: boolean
  points: string[]
  tags: string[]
  link?: { label: string; href: string }
}

/** Source: DanielSajben_CV.pdf (Oct 2026) and the owner's cover letter. */
export const roles: Role[] = [
  {
    id: 'ucd',
    role: 'MSc Advanced Artificial Intelligence',
    org: 'University College Dublin',
    period: 'Sep 2026 – Aug 2027',
    location: 'Dublin',
    kind: 'education',
    current: true,
    points: [
      'Full-tuition scholarship.',
      'Deep learning for vision, time-series forecasting, recommender systems and optimisation.',
      'Member of the UCD Mathematics Society.',
    ],
    tags: ['Deep learning', 'Optimisation', 'Forecasting'],
  },
  {
    id: 'ericsson',
    role: 'AI Research Intern',
    org: 'BME × Ericsson',
    period: 'Feb – Aug 2026',
    location: 'Budapest · part-time',
    kind: 'research',
    points: [
      'Built tool-grounded LLM workflows on locally hosted open-weight models for semantic validation of telecom graphs; first-author paper at IEEE CAMAD 2026.',
      'Built a pipeline of 2K+ synthetic XML graphs for GNN and GAN training.',
      'Presented the findings to a global engineering team and led the demo at AI Summit Budapest 2026.',
    ],
    tags: ['LLM agents', 'GNN', 'Synthetic data'],
  },
  {
    id: 'ptc',
    role: 'Data Science & AI Engineer Intern',
    org: 'PTC',
    period: 'Mar – Jun 2026',
    location: 'Budapest · part-time',
    kind: 'work',
    points: [
      'Built an agentic RAG system in LangGraph and FastMCP with HyDE embeddings, query rewriting and decomposition, raising answer relevance on the internal evaluation set.',
      'Took an MCP service from design to production on AWS (Docker, Linux), integrated with Microsoft 365 Copilot Studio.',
      'Contributed to customer-facing Codebeamer AI features used by 100K+ users; the contract was extended for this work.',
    ],
    tags: ['LangGraph', 'MCP', 'RAG', 'AWS'],
  },
  {
    id: 'neuroimaging',
    role: 'Research Assistant, Neuroimaging',
    org: 'Budapest University of Technology and Economics',
    period: 'Jan 2025 – Aug 2026',
    location: 'Budapest',
    kind: 'research',
    points: [
      'Trained a latent diffusion model in PyTorch for fMRI super-resolution and data augmentation; won an award at the Scientific Students’ Conference (TDK) in 2025.',
      'Developed a harmonisation pipeline that removes scanner effects across sites; the first-author manuscript is in submission at Medical Image Analysis.',
    ],
    tags: ['PyTorch', 'Diffusion models', 'fMRI'],
  },
  {
    id: 'tum',
    role: 'Exchange semester, Computer Science & Medical AI',
    org: 'Technical University of Munich',
    period: 'Oct 2025 – Mar 2026',
    location: 'Munich · Erasmus+',
    kind: 'education',
    points: [
      'GPA 1.3 on the German scale, where 1.0 is the best grade.',
      'Research on tabular foundation models for medical prognosis, presented as a poster at the TUM Medical AI Conference.',
    ],
    tags: ['Medical AI', 'Survival analysis'],
    link: { label: 'Read the report', href: '/papers/tum-tabular-foundation-models-report.pdf' },
  },
  {
    id: 'morgan-stanley',
    role: 'Software Engineer Intern, Institutional Securities',
    org: 'Morgan Stanley',
    period: 'Apr – Aug 2025',
    location: 'Budapest · full-time',
    kind: 'work',
    points: [
      'Shipped production Java services and full-stack tools (Spring Boot, Angular) used by 1K+ internal users.',
      'Decided which UI changes to keep with A/B tests on Kibana telemetry, and shared the results with a cross-functional team.',
      'Cut response times under load by optimising SQL on financial-data workflows; demoed AI-assisted development with Claude to the team.',
    ],
    tags: ['Java', 'Spring Boot', 'Angular', 'SQL'],
  },
  {
    id: 'bme',
    role: 'BSc Computer Science Engineering',
    org: 'Budapest University of Technology and Economics',
    period: 'Sep 2022 – Jan 2026',
    location: 'Budapest',
    kind: 'education',
    points: [
      'First Class Honours, GPA 4.61 / 5.00.',
      'Thesis: latent diffusion models for fMRI super-resolution and synthetic data generation.',
    ],
    tags: ['Machine learning', 'Software engineering'],
    link: { label: 'Read the thesis', href: '/thesis.pdf' },
  },
]

export const honours = [
  'First-author paper at IEEE CAMAD 2026',
  'Award at the Scientific Students’ Conference (TDK), 2025',
  'Finalist, PwC AI Hackathon 2026, Hungary',
  'Anthropic certified: Building with the Claude API and MCP Advanced Topics',
]
