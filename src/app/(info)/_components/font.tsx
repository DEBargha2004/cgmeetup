import { cn } from '@/lib/utils'
import { forwardRef, HTMLProps } from 'react'

const Header = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement> & {}
>(({ className, children, ...props }, ref) => (
  <h1 ref={ref} className={cn('text-5xl mb-10', className)} {...props}>
    {children}
  </h1>
))

const Paragraph = forwardRef<
  HTMLParagraphElement,
  HTMLProps<HTMLParagraphElement> & {}
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm opacity-70 font-light', className)}
    {...props}
  >
    {children}
  </p>
))

const ListHeader = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement> & {}
>(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-base font-semibold', className)} {...props}>
    {children}
  </h3>
))

const ListItem = forwardRef<HTMLLIElement, HTMLProps<HTMLLIElement> & {}>(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props}>
      {children}
    </li>
  )
)

Header.displayName = 'Header'
Paragraph.displayName = 'Paragraph'
ListHeader.displayName = 'ListHeader'
ListItem.displayName = 'ListItem'

export { Header, Paragraph, ListHeader, ListItem }
