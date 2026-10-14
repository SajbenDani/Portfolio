/** Page chapters, in reading order. The Dynamic Island names the active one. */
export const chapters = [
  { id: 'hello', label: 'Hello' },
  { id: 'research', label: 'Research' },
  { id: 'work', label: 'Work' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'experience', label: 'Experience' },
  { id: 'life', label: 'Off the clock' },
  { id: 'contact', label: 'Contact' },
] as const

export type ChapterId = (typeof chapters)[number]['id']
