import { addDays, subDays, subMonths, addMonths } from 'date-fns'
import * as React from 'react'

interface CalendarState {
  date: Date
}

export function useCalendar() {
  const [state, setState] = React.useState<CalendarState>({
    date: new Date(),
  })

  const handlePrev = React.useCallback((unit: 'month' | 'week' | 'day') => {
    setState((prevState) => {
      let newDate
      switch (unit) {
        case 'month':
          newDate = subMonths(prevState.date, 1)
          return { date: newDate }
        case 'week':
          newDate = subDays(prevState.date, 7)
          return { date: newDate }
        case 'day':
          newDate = subDays(prevState.date, 1)
          return { date: newDate }
        default:
          return prevState
      }
    })
  }, [])

  const handleNext = React.useCallback((unit: 'month' | 'week' | 'day') => {
    setState((prevState) => {
      let newDate
      switch (unit) {
        case 'month':
          newDate = addMonths(prevState.date, 1)
          return { date: newDate }
        case 'week':
          newDate = addDays(prevState.date, 7)
          return { date: newDate }
        case 'day':
          newDate = addDays(prevState.date, 1)
          return { date: newDate }
        default:
          return prevState
      }
    })
  }, [])

  const handleToday = React.useCallback(() => {
    setState({
      date: new Date(),
    })
  }, [])

  const formatMonth = (date: Date) => {
    return (date.getMonth() + 1).toString().padStart(2, '0')
  }

  return {
    state,
    handlePrev,
    handleNext,
    handleToday,
    formatMonth,
  }
}
