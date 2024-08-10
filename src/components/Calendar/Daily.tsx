'use client'
import * as React from 'react'
import {
  format,
  addDays,
  startOfWeek,
  getHours,
  getMinutes,
  isSameDay,
} from 'date-fns'
import { ScheduleInfo, useProjectInfoQuery, useScheduleListQuery } from '@/api'
import { hours } from '@/hooks/useCalendar/useCalendarUtils'

const TimeSlot: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="relative flex h-[48px] flex-[1_0_0] items-center justify-center border-b border-l border-gray-200">
    {children}
  </div>
)

interface DailyProps {
  week: Date
}

export const Daily: React.FC<DailyProps> = ({ week }) => {
  const weekStart = startOfWeek(week, { weekStartsOn: 0 })

  const startDate = format(weekStart, 'yyyy-MM-dd')
  const endDate = format(addDays(weekStart, 6), 'yyyy-MM-dd')
  const { data: scheduleData } = useScheduleListQuery(startDate, endDate)
  const { data: projectData } = useProjectInfoQuery()

  const filterPersonalSchedules = (schedules: ScheduleInfo[]) => {
    return schedules.filter((schedule) => schedule.projectId === null)
  }

  const renderEvents = (
    projectId: string | null,
    dayIndex: number,
    hour: number,
  ) => {
    const events =
      scheduleData?.result
        ?.filter((schedule: ScheduleInfo) => schedule.projectId === projectId)
        .map((schedule: ScheduleInfo) => ({
          title: schedule.title,
          start: new Date(schedule.startDate),
          end: new Date(schedule.endDate ?? schedule.startDate),
        })) || []

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
        <p className="flex-[1_0_0] gap-[10px] text-center text-large">
          나의 일정
        </p>
        {projectData?.result.map((project) => (
          <p
            className="flex-[1_0_0] gap-[10px] text-center text-large"
            key={project.uid}
          >
            {project.title}
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
            <TimeSlot key="personal">
              {renderEvents(null, index, getHours(new Date()))}
            </TimeSlot>
            {projectData?.result.map((project, index) => (
              <TimeSlot key={project.uid}>
                {renderEvents(project.uid, index, getHours(new Date()))}
              </TimeSlot>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
