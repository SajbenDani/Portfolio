import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'glass'
type Size = 'md' | 'lg'

const base =
  'press inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none ' +
  'disabled:opacity-40 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent-fill text-white hover:bg-accent-fill-hover',
  secondary: 'bg-raised-2 text-label hover:bg-raised-3',
  glass: 'glass text-label hover:bg-raised-2',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-[1.0625rem]',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      {children}
    </a>
  )
}
