'use client'
import * as React from 'react'
import { Monthly } from '@/components/Calendar/Monthly'
import { useProjectInfoQuery, useScheduleListQuery } from '@/api'
import { useCalendarContext } from '../layout'

export default function Page() {
  const { state, selectedProject, myCalendar } = useCalendarContext()

  const year = state.date.getFullYear()
  const month = state.date.getMonth() + 1
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = `${year}-${String(month + 1).padStart(2, '0')}-01`

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
