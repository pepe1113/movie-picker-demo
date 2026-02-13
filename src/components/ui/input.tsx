import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Bold Typography: Sharp edges, no rounded corners
        'file:text-foreground placeholder:text-muted-foreground selection:bg-accent selection:text-accent-foreground h-12 w-full min-w-0 border border-border bg-input px-4 py-3 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        // Focus: Accent border, no ring glow
        'focus:border-accent',
        // Invalid: Destructive border
        'aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
