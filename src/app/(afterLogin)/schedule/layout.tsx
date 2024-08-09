'use client'
import * as React from 'react'
import { CalendarHeader } from '@/components/Header/CalendarHeader'
import { Calendar } from '@/components/ui/calendar'
import { useCalendar } from '@/hooks/useCalendar'
import { usePathname } from 'next/navigation'
import { Monthly } from '@/components/Calendar/Monthly'

type ViewType = 'monthly' | 'weekly' | 'list'

const layout = ({ children }: { children: React.ReactNode }) => {
  const { state, handlePrev, handleNext, handleToday } = useCalendar()
  const pathname = usePathname()
  const view = (pathname.split('/').pop() || 'list') as ViewType

  const getHandlersForView = (view: ViewType) => {
    switch (view) {
      case 'monthly':
        return {
          onPrev: () => handlePrev('month'),
          onNext: () => handleNext('month'),
        }
      case 'weekly':
        return {
          onPrev: () => handlePrev('week'),
          onNext: () => handleNext('week'),
        }
      case 'list':
      default:
        return {
          onPrev: () => handlePrev('day'),
          onNext: () => handleNext('day'),
        }
    }
  }

  const { onPrev, onNext } = getHandlersForView(view)
  console.log('Layout - state.date:', state.date)

  return (
    <div className="m-auto flex h-screen w-[1180px]">
      <Calendar />
      <div className="p-4">
        {/* <CalendarHeader
          view={view}
          date={state.date}
          onPrev={onPrev}
          onNext={onNext}
          onToday={handleToday}
        /> */}

        {children}
      </div>
    </div>
  )
}

export default layout
