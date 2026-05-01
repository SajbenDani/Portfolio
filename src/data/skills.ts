export interface Skill {
  name: string
  level: 1 | 2 | 3 | 4 | 5
  category: 'expert' | 'proficient' | 'familiar'
}

export const skills: Skill[] = [
  // Expert (level 5)
  { name: 'Machine Learning', level: 5, category: 'expert' },
  { name: 'Deep Learning', level: 5, category: 'expert' },
  { name: 'Python', level: 5, category: 'expert' },
  { name: 'Computer Vision', level: 5, category: 'expert' },
  { name: 'Generative AI', level: 5, category: 'expert' },
  { name: 'NLP', level: 5, category: 'expert' },
  { name: 'PyTorch', level: 5, category: 'expert' },
  { name: 'AI Agents', level: 5, category: 'expert' },
  { name: 'Data Science', level: 5, category: 'expert' },

  // Proficient (level 4)
  { name: 'Java', level: 4, category: 'proficient' },
  { name: 'SQL', level: 4, category: 'proficient' },
  { name: 'AWS', level: 4, category: 'proficient' },

  // Familiar (level 3)
  { name: 'JavaScript / TypeScript', level: 3, category: 'familiar' },
  { name: 'Angular / React', level: 3, category: 'familiar' },
  { name: 'C / C++ / C#', level: 3, category: 'familiar' },
]
