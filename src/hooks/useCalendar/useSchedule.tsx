import * as React from 'react'

import { ScheduleInfo } from '@/api/services/schedule/model'
import { useScheduleListQuery } from '@/api'

const iterateSchedules = (
  schedules: ScheduleInfo[],
  callback: (date: Date, schedule: ScheduleInfo) => void,
) => {
  schedules.forEach((schedule) => {
    const startDate = new Date(schedule.startDate)
    callback(startDate, schedule)
  })
}

const getAllFutureSchedules = (
  schedules: ScheduleInfo[],
  year: number,
  month: number,
  today: number,
) => {
  const futureSchedules: {
    [year: number]: { [month: number]: ScheduleInfo[] }
  } = {}

  iterateSchedules(schedules, (date, schedule) => {
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()

    if (
      y > year ||
      (y === year && m > month) ||
      (y === year && m === month && d >= today)
    ) {
      if (!futureSchedules[y]) futureSchedules[y] = {}
      if (!futureSchedules[y][m]) futureSchedules[y][m] = []
      futureSchedules[y][m].push(schedule)
    }
  })

  return futureSchedules
}

const groupSchedulesByDate = (schedules: ScheduleInfo[]) => {
  const groupedSchedules: { [key: string]: ScheduleInfo[] } = {}

  iterateSchedules(schedules, (date, schedule) => {
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    if (!groupedSchedules[key]) groupedSchedules[key] = []
    groupedSchedules[key].push(schedule)
  })

  return groupedSchedules
}

export const useFutureSchedules = () => {
  const [date, setDate] = React.useState(() => {
    const now = new Date()
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      today: now.getDate(),
    }
  })

  const startDate = `${date.year}-${String(date.month).padStart(2, '0')}-01`
  const endDate = `${date.year}-${String(date.month + 1).padStart(2, '0')}-01`

  const { data } = useScheduleListQuery(startDate, endDate)
  const [currentSchedules, setCurrentSchedules] = React.useState<{
    [year: number]: { [month: number]: ScheduleInfo[] }
  }>({})
  const [groupedSchedules, setGroupedSchedules] = React.useState<{
    [key: string]: ScheduleInfo[]
  }>({})

  React.useEffect(() => {
    if (data && data.result) {
      const { year, month, today } = date
      const futureSchedules = getAllFutureSchedules(
        data.result,
        year,
        month,
        today,
      )
      setCurrentSchedules(futureSchedules)
      setGroupedSchedules(groupSchedulesByDate(data.result))
    }
  }, [data, date])

  const setMonth = (month: number) => setDate((prev) => ({ ...prev, month }))
  const setYear = (year: number) => setDate((prev) => ({ ...prev, year }))
  const setToday = (today: number) => setDate((prev) => ({ ...prev, today }))

  return {
    currentSchedules,
    groupedSchedules,
    date,
    setMonth,
    setYear,
    setToday,
  }
}
