import { addHours, format, isAfter, isDate, subDays, subHours } from 'date-fns'

import { cn } from '@/lib/utils'

export interface DeadlineProps {
  deadline?: string | null
}

export const getStatus = (deadline: Date) => {
  if (isAfter(new Date(), deadline)) {
    return { text: 'Overdue', className: 'text-red-500' }
  }

  if (isAfter(addHours(new Date(), 3), deadline)) {
    return { text: 'Coming to end', className: 'text-yellow-500' }
  }

  return { text: '', className: '' }
}

export const Deadline = ({ deadline }: DeadlineProps) => {
  if (!deadline) return null

  const deadlineDate = new Date(deadline || '')
  const isData = isDate(deadlineDate)

  if (!isData) return null

  const status = getStatus(deadlineDate)
  const formattedDeadline = format(deadlineDate, 'yyyy-MM-dd HH:mm')

  const noStatus = !status.text
  return (
    <p className={cn('text-sm text-muted-foreground', status?.className)}>
      {noStatus && 'Until:'}&nbsp;{`${formattedDeadline} ${status?.text}`}
    </p>
  )
}
