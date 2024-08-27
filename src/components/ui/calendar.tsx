'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CaptionProps, DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  endOfWeek,
  format,
  isSameWeek,
  isWithinInterval,
  startOfWeek,
} from 'date-fns'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export type MiniCalendarProps = {
  date: Date
  selected: Date | undefined
  onSelect?: (date: Date) => void
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onMonthChange: () => void
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

function MiniCalendar({
  className,
  classNames,
  showOutsideDays = true,
  date,
  selected,
  onSelect,
  onPrev,
  onNext,
  onToday,
  onMonthChange,
  ...props
}: MiniCalendarProps) {
  const today = new Date()
  const formattedDate = format(date, 'yyyy년 MM월')
  const start = startOfWeek(today, { weekStartsOn: 0 }) // 주의 시작일을 일요일로 설정
  const end = endOfWeek(today, { weekStartsOn: 0 }) // 주의 끝일을 토요일로 설정
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']
  const isCurrentWeek = isWithinInterval(today, { start, end })

  const handleDayClick = (date: Date) => {
    if (onSelect) {
      onSelect(date)
    }
  }
  return (
    <DayPicker
      onMonthChange={onMonthChange}
      selected={selected}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-large text-black',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex ',
        head_cell: 'text-black rounded-md p-1 text-large',
        row: `flex w-full mt-1 `,
        cell: 'h-9 w-9 text-center text-sm p-0 relative ',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'rounded-full h-9 w-9  text-black  aria-selected:opacity-100',
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-white hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        CaptionLabel: ({ ...props }) => (
          <div className="caption_label">{formattedDate}</div>
        ),
        Head: () => (
          <div className="flex w-full justify-between p-2">
            {daysOfWeek.map((day, index) => (
              <span key={index} className="text-large">
                {day}
              </span>
            ))}
          </div>
        ),
      }}
      onDayClick={handleDayClick}
      {...props}
    />
  )
}
MiniCalendar.displayName = 'MiniCalendar'

export { Calendar, MiniCalendar }
