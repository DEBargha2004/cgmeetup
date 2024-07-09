import { cn } from '@/lib/utils'
import { forwardRef, HTMLProps } from 'react'

const MainContainer = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & {}
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10',
      className
    )}
    {...props}
  />
))

const ArticleContainer = forwardRef<
  HTMLParagraphElement,
  HTMLProps<HTMLParagraphElement> & {}
>(({ className, ...props }, ref) => (
  <article ref={ref} className={cn('space-y-5', className)} {...props} />
))

MainContainer.displayName = 'MainContainer'
ArticleContainer.displayName = 'ArticleContainer'

export { MainContainer, ArticleContainer }
