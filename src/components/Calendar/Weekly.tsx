'use client'
import * as React from 'react'
import { yoilClass } from './style'
import { format, addDays, startOfWeek } from 'date-fns'

const TimeSlot: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="flex h-[48px] flex-[1_0_0] items-center justify-center border-b border-l border-gray-200">
    {children}
  </div>
)

interface WeeklyProps {
  week: Date
}

export const Weekly: React.FC<WeeklyProps> = ({ week }) => {
  const yoils = ['일', '월', '화', '수', '목', '금', '토']
  const weekStart = startOfWeek(week, { weekStartsOn: 0 })

  const weekDates = yoils.map((_, index) => {
    const date = addDays(weekStart, index)
    return format(date, 'd') + ' ' + yoils[index]
  })

  const hours = [
    '오전 1시',
    '오전 2시',
    '오전 3시',
    '오전 4시',
    '오전 5시',
    '오전 6시',
    '오전 7시',
    '오전 8시',
    '오전 9시',
    '오전 10시',
    '오전 11시',
    '오후 12시',
    '오후 1시',
    '오후 2시',
    '오후 3시',
    '오후 4시',
    '오후 5시',
    '오후 6시',
    '오후 7시',
    '오후 8시',
    '오후 9시',
    '오후 10시',
    '오후 11시',
    '',
  ]

  return (
    <div className="flex h-full w-[864px] shrink-0 flex-col items-start gap-[10px] p-4">
      <div className="flex items-center justify-between self-stretch">
        <div className="flex h-[48px] w-[80px]" />
        {weekDates.map((dateAndYoil, index) => (
          <p
            className={`${yoilClass} ${
              yoils[index] === '일' || yoils[index] === '토'
                ? 'text-gray-500'
                : ''
            }`}
            key={index}
          >
            {dateAndYoil}
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

            {yoils.map((_, dayIndex) => (
              <TimeSlot key={dayIndex} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
