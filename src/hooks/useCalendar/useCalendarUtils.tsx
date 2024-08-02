import {
  endOfMonth,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns'

export const daysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}

export const getFirstDayofMonth = (year: number, month: number) => {
  return new Date(year, month - 1, 1).getDay()
}

export const getPreviousMonthDays = (year: number, month: number) => {
  const prevMonth = month === 1 ? 12 : month - 1
  const prevYear = month === 1 ? year - 1 : year
  return daysInMonth(prevYear, prevMonth)
}

export const formatDate = (date: number) => {
  return date.toString().padStart(2, '0')
}

export const generateCalendar = (date: Date) => {
  const startDate = startOfMonth(date)
  const endDate = endOfMonth(date)

  const startWeek = startOfWeek(startDate)
  const endWeek = endOfWeek(endDate)

  const weeks = []
  let currentWeek = []

  let currentDate = startWeek

  while (currentDate <= endWeek) {
    currentWeek.push({
      day: currentDate.getDate(),
      isThisMonth: currentDate >= startDate && currentDate <= endDate,
    })

    if (currentDate.getDay() === 6) {
      weeks.push(currentWeek)
      currentWeek = []
    }

    currentDate = addDays(currentDate, 1)
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}
