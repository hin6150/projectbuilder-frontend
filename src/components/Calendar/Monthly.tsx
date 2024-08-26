'use client'

import * as React from 'react'
import { generateCalendar } from '@/hooks/useCalendar'
import { weekClass, yoilClass, dayClass, getDotColor } from './style'
import { useModal } from '@/hooks/useModal'
import { ModalTypes } from '@/hooks/useModal/useModal'
import { ScheduleCheckModal } from '../Modal/ScheduleModal'
import { ScheduleInfo, ProjectInfo } from '@/api'

interface MonthlyProps {
  date: Date
  schedules: ScheduleInfo[] | undefined
  projects: ProjectInfo[] | undefined
}

export const Monthly: React.FC<MonthlyProps> = ({
  date,
  schedules,
  projects,
}) => {
  const { modals, openModal } = useModal()
  const yoils = ['일', '월', '화', '수', '목', '금', '토']
  const weeks = generateCalendar(date)

  const [selectedSchedule, setSelectedSchedule] =
    React.useState<ScheduleInfo | null>(null)

  const handleScheduleSelect = (schedule: ScheduleInfo) => {
    setSelectedSchedule(schedule)
    openModal('default', ModalTypes.CHECK)
  }

  const getProjectColor = (projectId: string) => {
    return (
      projects?.find((project) => project.uid === projectId)?.color || '#ccc'
    )
  }

  const getSchedulesForDay = (day: Date, isThisMonth: boolean) => {
    if (!schedules) {
      return []
    }

    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.startDate).getDate()
      const scheduleMonth = new Date(schedule.startDate).getMonth() + 1
      const scheduleYear = new Date(schedule.startDate).getFullYear()

      if (
        isThisMonth &&
        scheduleYear === day.getFullYear() &&
        scheduleMonth === day.getMonth() + 1 &&
        scheduleDate === day.getDate()
      ) {
        return true
      }

      return false
    })
  }

  const formatTime = (datetime: string): string => {
    if (!datetime) return ''

    const [datePart, timePart] = datetime.split(' ')
    if (!timePart) return '하루 종일'

    const [hourString, minute] = timePart.split(':')
    const hour = parseInt(hourString)

    if (isNaN(hour)) return ''

    const period = hour < 12 ? '오전' : '오후'
    const hour12 = hour % 12 || 12
    return `${period} ${hour12}:${minute}`
  }

  return (
    <div className="flex h-[932px] w-[864px] flex-shrink-0 flex-col items-start gap-[10px] p-4">
      <div className="flex items-center justify-between self-stretch">
        {yoils.map((yoil) => (
          <p
            className={`${yoilClass} ${yoil === '일' || yoil === '토' ? 'text-gray-500' : ''}`}
            key={yoil}
          >
            {yoil}
          </p>
        ))}
      </div>
      <div className="h-[1px] w-[832px] bg-gray-300" />
      <div className="flex h-[764px] flex-shrink-0 flex-col items-start self-stretch rounded-[4px] border-r border-t border-gray-200">
        {weeks.map((week, weekIndex) => (
          <div className={weekClass} key={weekIndex}>
            {week.map(({ day, isThisMonth, date }, dayIndex) => {
              const schedules = getSchedulesForDay(date, isThisMonth)
              return (
                <div
                  className={`${dayClass} ${isThisMonth ? '' : 'text-gray-300'}`}
                  key={dayIndex}
                >
                  <div className="flex h-6 w-full flex-col">
                    {day !== null && (
                      <>
                        <p className="p-2">{day}</p>
                        <div className="flex flex-col gap-[2px]">
                          {schedules.map((schedule, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                handleScheduleSelect(schedule)
                              }}
                              className={`flex h-[25px] cursor-pointer items-center gap-1 overflow-hidden rounded-[5px] pl-1 ${getProjectColor(schedule.projectId ?? '')}`}
                            >
                              <div
                                className={`h-1 w-1 shrink-0 rounded-full ${getDotColor(getProjectColor(schedule.projectId ?? ''))}`}
                              />
                              <p className="display-webkit-box box-orient-vertical line-clamp-2 w-[75px] text-detail">
                                {formatTime(schedule.startDate)}
                              </p>
                              <p className="display-webkit-box box-orient-vertical line-clamp-1 text-detail">
                                {schedule.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      {modals.default.open &&
        modals.default.type == ModalTypes.CHECK &&
        selectedSchedule && (
          <ScheduleCheckModal scheduleId={selectedSchedule?.id} />
        )}
    </div>
  )
}
