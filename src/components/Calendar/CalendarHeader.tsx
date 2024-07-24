'use client'
import React from 'react'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Icon } from '../Icon'

interface CalendarHeaderProps {
  month: number
  year: number
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  return (
    <div className="flex items-center justify-between self-stretch">
      <div className="flex items-center gap-[16px]">
        <p className="text-h3">
          {year}년 {month}월
        </p>
        <Button
          onClick={onPrevMonth}
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={onNextMonth}
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button onClick={onToday} variant="outline" className="flex h-8">
          <p className="text-body">오늘</p>
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Icon name="plus" />
        </Button>
      </div>
    </div>
  )
}
