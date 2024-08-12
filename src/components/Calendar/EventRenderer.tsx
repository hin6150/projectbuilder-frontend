'use client'
import * as React from 'react'
import { getHours, getMinutes, isSameDay, addDays } from 'date-fns'
import { ScheduleInfo } from '@/api'

interface EventRendererProps {
  events: ScheduleInfo[]
  dayIndex: number
  hour: number
  onScheduleSelect: (schedule: ScheduleInfo) => void
  weekStart: Date
}

export const EventRenderer: React.FC<EventRendererProps> = ({
  events,
  dayIndex,
  hour,
  onScheduleSelect,
  weekStart,
}) => {
  const dayEvents = events.filter(
    (event) =>
      isSameDay(addDays(weekStart, dayIndex), new Date(event.startDate)) &&
      getHours(new Date(event.startDate)) === hour,
  )

  dayEvents.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  )

  return (
    <>
      {dayEvents.map((event, index) => {
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
            className="absolute z-10 cursor-pointer rounded-r-md rounded-br-md border-l-[3px] border-red-300 bg-red-100 p-2"
            style={{
              top: `${(getMinutes(new Date(event.startDate)) / 60) * 48}px`,
              height: `${(((getHours(new Date(event.endDate ?? event.startDate)) - getHours(new Date(event.startDate))) * 60 + (getMinutes(new Date(event.endDate ?? event.startDate)) - getMinutes(new Date(event.startDate)))) / 60) * 48}px`,
              left: `${leftOffset}px`,
              width: `${width}px`,
            }}
            onClick={() => onScheduleSelect(event)}
          >
            <p className="display-webkit-box webkit-box-orient-vertical webkit-line-clamp-1 self-stretch text-body">
              {event.title}
            </p>
          </div>
        )
      })}
    </>
  )
}
