'use client'
import * as React from 'react'
import { Daily } from '@/components/Calendar/Daily'
import { useCalendarContext } from '../layout'
import { format } from 'date-fns'
import { useProjectInfoQuery, useScheduleListQuery } from '@/api'

export default function page() {
  const { state, selectedProject, myCalendar } = useCalendarContext()

  const startDate = format(state.date, 'yyyy-MM-dd')
  const endDate = format(state.date, 'yyyy-MM-dd')

  const { data: scheduleDataResponse } = useScheduleListQuery(
    startDate,
    endDate,
  )
  const { data: projectDataResponse } = useProjectInfoQuery()

  const schedules = scheduleDataResponse?.result
  const projects = projectDataResponse?.result

  const filteredSchedules = schedules?.filter((schedule) => {
    const isProjectSelected = selectedProject[schedule.projectId || '']
    return isProjectSelected || !schedule.projectId || myCalendar
  })

  return (
    <div>
      <Daily
        date={state.date}
        schedules={filteredSchedules}
        projects={projects?.map((project) => ({
          uid: project.uid,
          title: project.title,
        }))}
      />
    </div>
  )
}
