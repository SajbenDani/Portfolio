export interface Experience {
  id: string
  role: string
  org: string
  period: string
  location: string
  description: string
  tags: string[]
  type: 'work' | 'education' | 'research'
  pdf?: string
  pdfLabel?: string
}

export const experiences: Experience[] = [
  {
    id: 'ucd',
    role: 'MSc Advanced Artificial Intelligence',
    org: 'University College Dublin',
    period: '2026 – 2027',
    location: 'Dublin, Ireland',
    description:
      'MSc in Advanced Artificial Intelligence at University College Dublin (#118 globally). Focus on deep learning theory, NLP, and AI for medicine. Research interests: foundation models, graph-language hybrids, and AI-driven diagnostics.',
    tags: ['AI', 'Deep Learning', 'NLP', 'Foundation Models'],
    type: 'education',
  },
  {
    id: 'ptc-hungary',
    role: 'Data Science & AI Engineer Intern',
    org: 'PTC Hungary',
    period: 'Mar 2026 – Jul 2026',
    location: 'Budapest, Hungary',
    description:
      'Building AI-powered agentic pipelines at PTC Hungary. Developing LLM-based tooling for semantic validation tasks and conducting research in the telcom domain.',
    tags: ['Python', 'PyTorch', 'LLM', 'AI Agents', 'Data Science'],
    type: 'work',
  },
  {
    id: 'anthropic-cert',
    role: 'Build with Claude API — Certified',
    org: 'Anthropic',
    period: '2026',
    location: 'Remote',
    description:
      "Completed Anthropic's Build with Claude API certification, demonstrating proficiency in integrating and deploying Claude models for production AI applications using the Anthropic API.",
    tags: ['Claude API', 'LLM', 'AI Development', 'Anthropic'],
    type: 'education',
  },
  {
    id: 'tum',
    role: 'Exchange Student — AI & Deep Learning',
    org: 'Technical University of Munich (TUM)',
    period: '2025',
    location: 'Munich, Germany',
    description:
      'Semester exchange focused on AI in medicine, tabular foundation models, and GNN/LLM hybrid architectures. Achieved GPA 1.3 / 5.0 (German scale, best = 1.0). Presented survival analysis research at a departmental symposium.',
    tags: ['Deep Learning', 'Computer Vision', 'GPA 1.3/5.0', 'Research'],
    type: 'education',
  },
  {
    id: 'thesis',
    role: 'Research — fMRI Harmonisation & Super-Resolution',
    org: 'Budapest University of Technology',
    period: 'Jan 2025 – Present',
    location: 'Budapest, Hungary',
    description:
      'Master thesis applying Latent Diffusion Models to fMRI brain scan super-resolution and multi-site harmonisation. NeurIPS 2026 submission. Collaborating with neuroscience researchers to improve neuroimaging data quality for clinical applications.',
    tags: ['Python', 'PyTorch', 'Diffusion Models', 'Generative AI', 'Neuroimaging'],
    type: 'research',
  },
  {
    id: 'morgan-stanley',
    role: 'Full-Stack Software Developer',
    org: 'Morgan Stanley',
    period: 'Mar 2025 – Aug 2025',
    location: 'Budapest, Hungary',
    description:
      'Data-science-driven developer at Morgan Stanley Munich. Designed and built end-to-end usage tracking systems serving 1,000+ users; created a custom Kibana dashboard to analyse usage trends, proposed UX improvements and validated them with A/B testing. Complemented with SQL optimisation and Java Spring Boot API endpoint integrations across the trading platform.',
    tags: ['Java Spring', 'Angular', 'SQL', 'Kibana', 'A/B Testing', 'TypeScript'],
    type: 'work',
  },
  {
    id: 'bme',
    role: 'B.Sc. Computer Science Engineering',
    org: 'Budapest University of Technology and Economics',
    period: '2022 – 2026',
    location: 'Budapest, Hungary',
    description:
      'Bachelor of Science in Computer Science Engineering with First Class Honours (1:1). GPA 4.65 / 5.00. Specialisation in Machine Learning and Software Development. TDK Award recipient (Hungarian national student research competition).',
    tags: ['Computer Science', 'Machine Learning', 'GPA 4.65/5.00', 'First Class Honours'],
    type: 'education',
    pdf: '/thesis.pdf',
    pdfLabel: 'Download Thesis',
  },
]
