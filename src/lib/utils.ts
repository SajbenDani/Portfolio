import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge the design tokens from index.css, so a custom font size
// (text-chapter) and a custom colour (text-label) are never treated as a clash.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['hero', 'chapter', 'title', 'lead', 'body'] }],
      'text-color': [{ text: ['label', 'label-2', 'label-3', 'accent', 'live'] }],
    },
  },
})

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

/** `srcset` for a photo in public/photos/: "<name>-<w>.<ext> <w>w, …". */
export function srcSet(name: string, widths: readonly number[], ext: string): string {
  return widths.map((w) => `${asset(`/photos/${name}-${w}.${ext}`)} ${w}w`).join(', ')
}

/** Largest variant of a photo, used as the plain `src` fallback. */
export function photoSrc(name: string, widths: readonly number[], ext: string): string {
  return asset(`/photos/${name}-${widths[widths.length - 1]}.${ext}`)
}
