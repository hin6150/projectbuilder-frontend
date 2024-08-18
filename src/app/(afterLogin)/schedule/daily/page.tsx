'use client'
import * as React from 'react'
import { CalendarHeader } from '@/components/Header/CalendarHeader'
import { useCalendar } from '@/hooks/useCalendar'
import { Daily } from '@/components/Calendar/Daily'

export default function page() {
  const { state, handlePrev, handleNext, handleToday, formatMonth } =
    useCalendar()

  return (
    <div>
      <CalendarHeader
        view="daily"
        date={state.date}
        onPrev={() => handlePrev('day')}
        onNext={() => handleNext('day')}
        onToday={handleToday}
      />
      <Daily date={state.date} />
    </div>
  )
}
