'use client'

import * as React from 'react'
import { CalendarHeader } from './CalendarHeader'

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}

const getFirstDayofMonth = (year: number, month: number) => {
  return new Date(year, month - 1, 1).getDay()
}

const getPreviousMonthDays = (year: number, month: number) => {
  const prevMonth = month === 1 ? 12 : month - 1
  const prevYear = month === 1 ? year - 1 : year
  return daysInMonth(prevYear, prevMonth)
}

export function Monthly() {
  const [month, setMonth] = React.useState(new Date().getMonth() + 1)
  const [year, setYear] = React.useState(new Date().getFullYear())

  const weekClass =
    'flex justify-between items-center flex-[1_0_0] self-stretch'
  const yoilClass =
    'flex h-12 flex-[1_0_0] basis-0 items-center justify-center gap-[10px] text-large'
  const dayClass =
    'flex p-2 items-start gap-[10px] flex-[1_0_0] self-stretch border-b border-l border-gray-200 text-large'

  const yoils = ['일', '월', '화', '수', '목', '금', '토']

  const days = daysInMonth(year, month)
  const firstDay = getFirstDayofMonth(year, month)
  const prevMonthDays = getPreviousMonthDays(year, month)

  const generateCalendar = () => {
    const weeks = []
    let week = Array(7).fill('')
    let dayCounter = 1
    let nextMonthDayCounter = 1

    for (let i = firstDay - 1; i >= 0; i--) {
      week[i] = { day: prevMonthDays - (firstDay - 1 - i), isThisMonth: false }
    }

    for (let i = firstDay; i < 7; i++) {
      week[i] = { day: dayCounter++, isThisMonth: true }
    }

    weeks.push(week)

    while (dayCounter <= days) {
      week = Array(7).fill('')
      for (let i = 0; i < 7 && dayCounter <= days; i++) {
        week[i] = { day: dayCounter++, isThisMonth: true }
      }
      weeks.push(week)
    }

    if (weeks[weeks.length - 1].filter((day) => day !== '').length < 7) {
      for (let i = 0; i < 7; i++) {
        if (weeks[weeks.length - 1][i] === '') {
          weeks[weeks.length - 1][i] = {
            day: nextMonthDayCounter++,
            isThisMonth: false,
          }
        }
      }
    }

    while (weeks.length < 6) {
      week = Array(7).fill('')
      for (let i = 0; i < 7; i++) {
        week[i] = { day: nextMonthDayCounter++, isThisMonth: false }
      }
      weeks.push(week)
    }
    return weeks
  }

  const weeks = generateCalendar()

  const handlePrevMonth = React.useCallback(() => {
    if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }, [month, year])

  const handleNextMonth = React.useCallback(() => {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }, [month, year])

  const handleToday = React.useCallback(() => {
    const today = new Date()
    setMonth(today.getMonth() + 1)
    setYear(today.getFullYear())
  }, [])

  return (
    <div className="flex h-[932px] w-[864px] flex-shrink-0 flex-col items-start gap-[10px] p-4">
      <CalendarHeader
        view="month"
        month={month}
        year={year}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onToday={handleToday}
      />
      <div className="flex items-center justify-between self-stretch">
        {yoils.map((yoil) => (
          <p
            className={`${yoilClass} ${yoil === '일' || yoil === '토' ? 'text-gray-500' : ''}`}
            key={yoil}
          >
            {yoil}
          </p>
        ))}
      </div>
      <div className="h-[1px] w-[832px] bg-gray-300" />
      <div
        className={
          'itmes-start flex h-[764px] flex-shrink-0 flex-col self-stretch rounded-[4px] border-r border-t border-gray-200'
        }
      >
        {weeks.map((week, weekIndex) => (
          <div className={weekClass} key={weekIndex}>
            {week.map(({ day, isThisMonth }, dayIndex) => (
              <div
                className={`${dayClass} ${isThisMonth ? '' : 'text-gray-300'}`}
                key={dayIndex}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
