'use client'

import * as React from 'react'
import { useScheduleListQuery } from '@/api/services/schedule/quries'
import { generateCalendar } from '@/hooks/useCalendar'
import {
  weekClass,
  yoilClass,
  dayClass,
  getDotColorClass,
  getProjectColorClass,
} from './style'
import { ScheduleInfo } from '@/api/services/schedule/model'

interface MonthlyProps {
  date: Date
}

export function Monthly({ date }: MonthlyProps) {
  const yoils = ['일', '월', '화', '수', '목', '금', '토']
  const weeks = generateCalendar(date)

  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = `${year}-${String(month + 1).padStart(2, '0')}-01`

  const { data } = useScheduleListQuery(startDate, endDate)

  const getSchedulesForDay = (day: Date, isThisMonth: boolean) => {
    if (!data?.result) {
      return []
    }

    const schedules = data.result as ScheduleInfo[]

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

  const formatTime = (time: string | undefined) => {
    if (!time) return ''

    const [startTime] = time.split('~')
    const [period, timePart] = startTime.trim().split(' ')
    // let [hour, minute] = timePart.split(':')

    // if (period === '오후' && parseInt(hour) !== 12) {
    //   hour = String(parseInt(hour) + 12)
    // } else if (period === '오전' && parseInt(hour) === 12) {
    //   hour = '00'
    // }
    // minute = minute || '00'

    // return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
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
                              className={`flex h-[25px] items-center gap-[5px] overflow-hidden text-ellipsis rounded-[5px] pl-1 ${getProjectColorClass(schedule.projectId ?? '')}`}
                            >
                              <div
                                className={`h-1 w-1 rounded-full ${getDotColorClass(schedule.projectId ?? '')}`}
                              />
                              <p className="display-webkit-box box-orient-vertical line-clamp-2 text-center text-detail">
                                {formatTime(schedule.startDate)}
                              </p>
                              <p className="display-webkit-box box-orient-vertical line-clamp-1 text-center text-detail">
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
    </div>
  )
}
