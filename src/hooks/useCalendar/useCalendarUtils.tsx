import {
  endOfMonth,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
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
  const month = date.getMonth()
  const year = date.getFullYear()

  const firstDayOfMonth = startOfMonth(date)
  const startOfCalendar = startOfWeek(firstDayOfMonth)
  const endOfCalendar = endOfWeek(addMonths(firstDayOfMonth, 1))

  const weeks = []
  let currentDay = startOfCalendar

  while (currentDay <= endOfCalendar) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push({
        day: currentDay.getDate(),
        isThisMonth: currentDay.getMonth() === month,
      })
      currentDay = addMonths(currentDay, 0)
      currentDay.setDate(currentDay.getDate() + 1)
    }
    weeks.push(week)
  }

  return weeks
}
