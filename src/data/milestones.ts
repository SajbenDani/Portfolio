import type { PhotoKey } from '@/data/photos'

export interface Milestone {
  id: string
  photo: PhotoKey
  place: string
  title: string
  caption: string
  alt: string
}

/** The drone flight's stations, in the order the camera reaches them. */
export const milestones: Milestone[] = [
  {
    id: 'tum',
    photo: 'tum',
    place: 'TUM · Munich',
    title: 'Poster at the TUM Medical AI Conference',
    caption: 'Tabular foundation models for medical prognostic tasks, with my two co-authors.',
    alt: 'Dániel and two co-authors standing beside their research poster at TUM.',
  },
  {
    id: 'diploma',
    photo: 'diploma',
    place: 'BME · Budapest',
    title: 'BSc, First Class Honours',
    caption: 'Computer Science Engineering at the Budapest University of Technology and Economics.',
    alt: 'Dániel holding his diploma at the BME graduation ceremony.',
  },
  {
    id: 'pwc',
    photo: 'pwc',
    place: 'PwC AI Hackathon 2026',
    title: 'Pitching in the final',
    caption: 'Finalist in Hungary. Our team pitched on the risks of using AI in auditing.',
    alt: 'Hackathon team presenting on stage in front of a slide titled “Probléma Definíció”.',
  },
  {
    id: 'summit',
    photo: 'summit',
    place: 'AI Summit Budapest 2026',
    title: 'Leading the Ericsson × BME demo',
    caption: 'Showing the telecom validation research to visitors at the Ericsson stand.',
    alt: 'Dániel seated between two people at the Ericsson stand, a screen showing the demo behind him.',
  },
  {
    id: 'camad',
    photo: 'camad',
    place: 'IEEE CAMAD 2026',
    title: 'Presenting the paper',
    caption: '“Mind the Semantic Gap”, first author, on how a verdict is made and why we prune first.',
    alt: 'Dániel presenting at IEEE CAMAD 2026 in front of a projected slide.',
  },
  {
    id: 'london',
    photo: 'london',
    place: 'London',
    title: 'Off the clock',
    caption: 'An evening on the Thames between the work.',
    alt: 'Dániel leaning on a railing by the Thames at dusk, the City skyline behind him.',
  },
]
