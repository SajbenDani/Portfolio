import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MQ } from '@/lib/motion'

/** True when the visitor asked for reduced motion. Initialises synchronously. */
export function useReducedMotion() {
  return useMediaQuery(MQ.reduce)
}
