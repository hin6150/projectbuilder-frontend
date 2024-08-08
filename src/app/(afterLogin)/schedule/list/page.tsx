'use client'
import * as React from 'react'
import { List } from '@/components/Calendar/List'
import { CalendarHeader } from '@/components/Header/CalendarHeader'
import { useCalendar } from '@/hooks/useCalendar'

export default function page() {
  const { state, handlePrev, handleNext, handleToday } = useCalendar()

  return (
    <div>
      <CalendarHeader
        view="month"
        date={state.date}
        onPrev={() => handlePrev('month')}
        onNext={() => handleNext('month')}
        onToday={handleToday}
      />
      <List />
    </div>
  )
}
