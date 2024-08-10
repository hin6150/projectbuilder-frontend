'use client'
import * as React from 'react'
import { yoilClass } from './style'
import {
  format,
  addDays,
  startOfWeek,
  getHours,
  getMinutes,
  isSameDay,
} from 'date-fns'
import { ScheduleInfo, useScheduleListQuery } from '@/api'
import { hours } from '@/hooks/useCalendar/useCalendarUtils'

const TimeSlot: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="relative flex h-[48px] flex-[1_0_0] items-center justify-center border-b border-l border-gray-200">
    {children}
  </div>
)

interface WeeklyProps {
  week: Date
}

export const Weekly: React.FC<WeeklyProps> = ({ week }) => {
  const yoils = ['일', '월', '화', '수', '목', '금', '토']
  const weekStart = startOfWeek(week, { weekStartsOn: 0 })
  const weekDates = yoils.map((_, index) => {
    const date = addDays(weekStart, index)
    return format(date, 'd') + ' ' + yoils[index]
  })

  const startDate = format(weekStart, 'yyyy-MM-dd')
  const endDate = format(addDays(weekStart, 6), 'yyyy-MM-dd')
  const { data } = useScheduleListQuery(startDate, endDate)

  const events =
    data?.result?.map((schedule: ScheduleInfo) => ({
      title: schedule.title,
      start: new Date(schedule.startDate),
      end: new Date(schedule.endDate ?? schedule.startDate),
    })) || []

  const renderEvents = (dayIndex: number, hour: number) => {
    const dayEvents = events.filter(
      (event) =>
        isSameDay(addDays(weekStart, dayIndex), event.start) &&
        getHours(event.start) === hour,
    )

    dayEvents.sort((a, b) => a.start.getTime() - b.start.getTime())

    return dayEvents.map((event, index) => {
      const totalEvents = dayEvents.length
      let leftOffset: number
      let width: number

      if (totalEvents <= 4) {
        leftOffset = 20 * index
        width = 100 - leftOffset
      } else {
        const totalSpace = 100 - 10
        const spacing = totalSpace / totalEvents
        leftOffset = spacing * index
        width = spacing - 10
      }

      return (
        <div
          key={index}
          className="absolute z-10 rounded-r-md rounded-br-md border-l-[3px] border-red-300 bg-red-100 p-2"
          style={{
            top: `${(getMinutes(event.start) / 60) * 48}px`,
            height: `${(((getHours(event.end) - getHours(event.start)) * 60 + (getMinutes(event.end) - getMinutes(event.start))) / 60) * 48}px`,
            left: `${leftOffset}px`,
            width: `${width}px`,
          }}
        >
          <p className="display-webkit-box webkit-box-orient-vertical webkit-line-clamp-1 self-stretch text-body">
            {event.title}
          </p>
        </div>
      )
    })
  }

  return (
    <div className="flex w-[864px] shrink-0 flex-col items-start gap-[10px] p-4">
      <div className="flex items-center justify-between self-stretch">
        <div className="flex h-[48px] w-[80px]" />
        {weekDates.map((dateAndYoil, index) => (
          <p
            className={`${yoilClass} ${
              yoils[index] === '일' || yoils[index] === '토'
                ? 'text-gray-500'
                : ''
            }`}
            key={index}
          >
            {dateAndYoil}
          </p>
        ))}
      </div>
      <div className="h-[1px] w-[832px] bg-gray-300" />
      <div className="flex flex-col items-start self-stretch">
        <div className="flex items-center self-stretch border-b border-gray-300">
          <div className="flex items-center justify-center gap-[10px] p-[10px]">
            <p className="text-subtle">하루종일</p>
          </div>
        </div>

        {hours.map((hour, index) => (
          <div
            className="relative flex items-center justify-between self-stretch"
            key={index}
          >
            <div className="flex w-[80px]" />
            <div className="absolute bottom-[-10px] left-[15px] text-subtle">
              {hour}
            </div>
            {yoils.map((_, dayIndex) => (
              <TimeSlot key={dayIndex}>
                {renderEvents(dayIndex, index)}
              </TimeSlot>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
