import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolve a public-asset path (e.g. "/demo.mp4") against Vite's base URL so it
 * works under the "/Portfolio/" base in dev and on GitHub Pages. External and
 * data/blob/mailto URLs are returned untouched.
 */
export function asset(path: string): string {
  if (/^([a-z]+:)?\/\//i.test(path) || /^(data:|blob:|mailto:)/.test(path)) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
