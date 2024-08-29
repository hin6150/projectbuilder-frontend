'use client'

import * as React from 'react'
import { Monthly } from '@/components/Calendar/Monthly'
import { useProjectInfoQuery, useScheduleListQuery } from '@/api'
import { useCalendarContext } from '../layout'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { ScheduleCreateModal } from '@/components/Modal/ScheduleModal'

export default function Page() {
  const { state, selectedProject, myCalendar } = useCalendarContext()

  const startDate = format(startOfMonth(state.date), 'yyyy-MM-dd')
  const endDate = format(endOfMonth(state.date), 'yyyy-MM-dd')

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
