'use client'
import * as React from 'react'
import { CalendarHeader } from '@/components/Header/CalendarHeader'
import { Monthly } from '@/components/Calendar/Monthly'
import { useCalendar } from '@/hooks/useCalendar'
import {
  ProjectInfo,
  useProjectInfoQuery,
  ScheduleInfo,
  useScheduleListQuery,
} from '@/api'

export default function Page() {
  const { state, handlePrev, handleNext, handleToday } = useCalendar()

  const year = state.date.getFullYear()
  const month = state.date.getMonth() + 1
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = `${year}-${String(month + 1).padStart(2, '0')}-01`

  const { data: schedulesResponse } = useScheduleListQuery(startDate, endDate)
  const { data: projectsResponse } = useProjectInfoQuery()

  const schedules: ScheduleInfo[] | undefined = schedulesResponse?.result
  const projects: ProjectInfo[] | undefined = projectsResponse?.result

  return (
    <div>
      <CalendarHeader
        view="monthly"
        date={state.date}
        onPrev={() => handlePrev('month')}
        onNext={() => handleNext('month')}
        onToday={handleToday}
      />
      <Monthly date={state.date} schedules={schedules} projects={projects} />
    </div>
  )
}
