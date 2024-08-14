'use client'
import * as React from 'react'
import { getHours, getMinutes, isSameDay, addDays } from 'date-fns'
import { ScheduleInfo, useProjectInfoQuery } from '@/api'

const formatTime = (date: Date) => {
  const hours = getHours(date)
  const minutes = getMinutes(date)
  const period = hours >= 12 ? '오후' : '오전'
  const adjustedHours = hours % 12 || 12
  return `${period} ${adjustedHours}:${minutes.toString().padStart(2, '0')}`
}

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
  const { data: projectsData } = useProjectInfoQuery()

  const getProjectColor = (projectId: string) => {
    return (
      projectsData?.result.find((project) => project.uid === projectId)
        ?.color || '#ccc'
    )
  }

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

        const projectColor = getProjectColor(event.projectId ?? '')

        return (
          <div
            key={index}
            className="absolute z-10 cursor-pointer rounded-r-md rounded-br-md p-2"
            style={{
              backgroundColor: projectColor,
              top: `${(getMinutes(new Date(event.startDate)) / 60) * 48}px`,
              height: `${(((getHours(new Date(event.endDate ?? event.startDate)) - getHours(new Date(event.startDate))) * 60 + (getMinutes(new Date(event.endDate ?? event.startDate)) - getMinutes(new Date(event.startDate)))) / 60) * 48}px`,
              left: `${leftOffset}px`,
              width: `${width}px`,
            }}
            onClick={() => onScheduleSelect(event)}
          >
            <div className="flex flex-col gap-3">
              <p className="display-webkit-box box-orient-vertical line-clamp-1 text-body">
                {event.title}
              </p>
              <p className="text-detail">
                {formatTime(new Date(event.startDate))}
              </p>
            </div>
          </div>
        )
      })}
    </>
  )
}
