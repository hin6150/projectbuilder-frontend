'use client'

import * as React from 'react'
import { useProjectInfoQuery, useScheduleListQuery } from '@/api'
import { useCalendarContext } from '../layout'
import { List } from '@/components/Calendar/List'
import { addDays, format } from 'date-fns'

export default function Page() {
  const { state, selectedProject, myCalendar } = useCalendarContext()

  const startDate = format(state.date, 'yyyy-MM-dd')
  const endDate = format(state.date, 'yyyy-MM-dd')

  const { data: scheduleResponse } = useScheduleListQuery(startDate, endDate)
  const { data: projectResponse } = useProjectInfoQuery()

  const schedules = scheduleResponse?.result
  const projects = projectResponse?.result

  const filteredSchedules = schedules?.filter((schedule) => {
    const isProjectSelected = selectedProject[schedule.projectId || '']
    return isProjectSelected || !schedule.projectId || myCalendar
  })

  return (
    <div>
      <List schedules={filteredSchedules} projects={projects} />
    </div>
  )
}
