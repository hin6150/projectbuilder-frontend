'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'

const CalendarContext = createContext<any>(null)

const useCalendarContext = () => {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider')
  }
  return context
}

interface CalendarProviderProps {
  children: ReactNode
}

const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  const [calendarData, setCalendarData] = useState(null)

  return (
    <CalendarContext.Provider value={{ calendarData, setCalendarData }}>
      {children}
    </CalendarContext.Provider>
  )
}

export { CalendarProvider, useCalendarContext }
