'use client'
import * as React from 'react'
import { CalendarHeader } from '@/components/Header/CalendarHeader'
import { Monthly } from '@/components/Calendar/Monthly'
import { useCalendar } from '@/hooks/useCalendar'

export default function Page() {
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
      <Monthly date={state.date} />
    </div>
  )
}
