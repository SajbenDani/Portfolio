import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** transitions.dev "learn more hover": the chevron shifts and opens into an arrow. */
function Chevron() {
  return (
    <span className="t-learn-chevron" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" />
        <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" />
      </svg>
    </span>
  )
}

const style =
  't-learn inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] font-medium text-accent hover:underline'

export function ArrowLink({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = rest.href?.startsWith('http')
  return (
    <a
      className={cn(style, className)}
      target={external ? '_blank' : rest.target}
      rel={external ? 'noopener noreferrer' : rest.rel}
      {...rest}
    >
      {children}
      <Chevron />
    </a>
  )
}

export function ArrowButton({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn(style, className)} {...rest}>
      {children}
      <Chevron />
    </button>
  )
}
