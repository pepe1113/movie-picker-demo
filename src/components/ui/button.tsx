import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold uppercase tracking-wider transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px',
  {
    variants: {
      variant: {
        // Primary: Text-only with animated underline (Bold Typography signature)
        default:
          'px-0 text-accent hover:text-accent/90 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-100 after:bg-accent after:transition-transform after:duration-150 hover:after:scale-x-110',

        // Outline: Border with full inversion on hover
        outline:
          'border border-foreground bg-transparent px-6 text-foreground transition-colors hover:bg-foreground hover:text-background',

        // Ghost: No border, underline appears on hover
        ghost:
          'px-4 text-muted-foreground hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-150 hover:after:scale-x-100',

        // Link: Simple underline
        link: 'px-0 text-accent underline decoration-1 underline-offset-4 hover:text-accent/80',

        // Destructive: Same as default but with destructive color
        destructive:
          'px-0 text-destructive hover:text-destructive/90 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-100 after:bg-destructive after:transition-transform after:duration-150 hover:after:scale-x-110',

        // Secondary: Subtle background
        secondary:
          'bg-muted px-6 text-foreground hover:bg-muted/80',
      },
      size: {
        default: 'h-11 py-3',
        xs: 'h-8 gap-1 py-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*=\'size-\'])]:size-3',
        sm: 'h-9 gap-1.5 py-2',
        lg: 'h-14 gap-3 py-4 text-base',
        icon: 'size-11 px-0',
        'icon-xs': 'size-8 px-0 [&_svg:not([class*=\'size-\'])]:size-3',
        'icon-sm': 'size-9 px-0',
        'icon-lg': 'size-14 px-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
