import { Link, LinkProps } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui'

export interface GoBackSubheaderProps {
  linkProps: LinkProps
}

export const GoBackSubheader = ({ linkProps }: GoBackSubheaderProps) => {
  return (
    <div className="flex items-center gap-4 py-4 w-full">
      <Link
        {...linkProps}
        className={cn('gap-4', buttonVariants({ variant: 'ghost' }))}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Go Back</span>
      </Link>
    </div>
  )
}
