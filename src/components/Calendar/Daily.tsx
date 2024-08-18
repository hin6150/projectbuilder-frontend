'use client'
import * as React from 'react'
import { format } from 'date-fns'
import { ScheduleInfo, useProjectInfoQuery, useScheduleListQuery } from '@/api'
import { hours } from '@/hooks/useCalendar/useCalendarUtils'
import { EventRenderer } from './EventRenderer'
import { useModal } from '@/hooks/useModal'
import { ModalTypes } from '@/hooks/useModal/useModal'
import { ScheduleCheckModal } from '../Modal/ScheduleModal'

const TimeSlot: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="relative flex h-[48px] flex-[1_0_0] items-center justify-center border-b border-l border-gray-200">
    {children}
  </div>
)

interface DailyProps {
  date: Date
}

export const Daily: React.FC<DailyProps> = ({ date }) => {
  const { modals, openModal } = useModal()

  const startDate = format(date, 'yyyy-MM-dd')
  const endDate = format(date, 'yyyy-MM-dd')

  const { data: scheduleData } = useScheduleListQuery(startDate, endDate)
  const { data: projectData } = useProjectInfoQuery()

  const [selectedSchedule, setSelectedSchedule] =
    React.useState<ScheduleInfo | null>(null)

  const handleScheduleSelect = (schedule: ScheduleInfo) => {
    setSelectedSchedule(schedule)
    openModal('default', ModalTypes.CHECK)
  }

  // const filterPersonalSchedules = (schedules: ScheduleInfo[]) => {
  //   return schedules.filter((schedule) => schedule.projectId === null)
  // }

  const renderEvents = (projectId: string | null, hour: number) => {
    const events = (scheduleData?.result || []).filter(
      (schedule: ScheduleInfo) => schedule.projectId === projectId,
    )

    return (
      <EventRenderer
        events={events}
        dayIndex={0}
        hour={hour}
        onScheduleSelect={handleScheduleSelect}
        weekStart={date}
      />
    )
  }

  return (
    <div className="flex w-[864px] shrink-0 flex-col items-start gap-[10px] p-4">
      <div className="flex items-center justify-between self-stretch">
        <div className="flex h-[48px] w-[80px]" />
        {/* <p className="flex-[1_0_0] gap-[10px] text-center text-large">
          나의 일정
        </p> */}
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
            {projectData?.result.map((project) => (
              <TimeSlot key={project.uid}>
                {renderEvents(project.uid, index)}
              </TimeSlot>
            ))}
          </div>
        ))}
      </div>

      {modals.default.open &&
        modals.default.type == ModalTypes.CHECK &&
        selectedSchedule && (
          <ScheduleCheckModal scheduleId={selectedSchedule.id} />
        )}
    </div>
  )
}
