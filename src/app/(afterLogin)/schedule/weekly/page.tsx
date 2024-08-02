'use client'
import * as React from 'react'
import { Weekly } from '@/components/Calendar/Weekly'
import { CalendarHeader } from '@/components/Header/CalendarHeader'
import { useCalendar } from '@/hooks/useCalendar'

export default function page() {
  const { state, handlePrev, handleNext, handleToday, formatMonth } =
    useCalendar()

  return (
    <div>
      <CalendarHeader
        view="week"
        date={state.date}
        onPrev={() => handlePrev('week')}
        onNext={() => handleNext('week')}
        onToday={handleToday}
      />
      <Weekly week={state.date} />
    </div>
  )
}
