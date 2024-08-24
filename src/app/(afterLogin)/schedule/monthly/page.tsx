'use client'
import * as React from 'react'
import { Monthly } from '@/components/Calendar/Monthly'
import { useProjectInfoQuery, useScheduleListQuery } from '@/api'
import { useCalendarContext } from '../layout'
import { format } from 'date-fns'

export default function Page() {
  const { state, selectedProject, myCalendar } = useCalendarContext()

  const startDate = format(state.date, 'yyyy-MM-dd')
  const endDate = format(state.date, 'yyyy-MM-dd')

  const { data: schedulesResponse } = useScheduleListQuery(startDate, endDate)
  const { data: projectsResponse } = useProjectInfoQuery()

  const schedules = schedulesResponse?.result
  const projects = projectsResponse?.result

  const filteredSchedules = schedules?.filter((schedule) => {
    const isProjectSelected = selectedProject[schedule.projectId || '']
    return isProjectSelected || !schedule.projectId || myCalendar
  })

  return (
    <div>
      <Monthly
        date={state.date}
        schedules={filteredSchedules}
        projects={projects}
      />
    </div>
  )
}
