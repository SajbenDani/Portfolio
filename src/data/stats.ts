export interface Stat {
  value: number
  prefix?: string
  suffix?: string
  label: string
  sub?: string
}

/** Headline numbers for the stats strip — edit values here. */
export const stats: Stat[] = [
  { value: 2, label: 'Years of experience', sub: 'industry & research' },
  { value: 9, label: 'Projects shipped', sub: 'AI · research · web' },
  { value: 3, label: 'Research papers', sub: '2 under review' },
  { value: 3, label: 'Universities', sub: 'BME · TUM · UCD' },
]
