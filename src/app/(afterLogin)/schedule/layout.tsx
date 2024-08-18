'use client'
import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { useCalendar } from '@/hooks/useCalendar'
import { usePathname } from 'next/navigation'
import { useProjectInfoQuery } from '@/api'
import { TextGradientGenerator } from '@/components/ui/color-picker'

type ViewType = 'monthly' | 'weekly' | 'list'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { state, handlePrev, handleNext, handleToday } = useCalendar()
  const pathname = usePathname()
  const view = (pathname.split('/').pop() || 'list') as ViewType
  const { data } = useProjectInfoQuery()

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

  const handleColorChange = (uid: string, newColor: string) => {
    // Update your state or API with the new color here
  }

  return (
    <div className="m-auto flex w-[1180px]">
      <div className="flex flex-col gap-6">
        <Calendar className="h-[315px] rounded-[8px] border border-gray-300 text-large" />
        <div className="flex flex-col gap-3 p-[10px]">
          <p className="text-body">내 캘린더</p>
          {data?.result.map((project) => (
            <div className="flex items-center gap-2" key={project.uid}>
              <TextGradientGenerator
                initialColor={project.color}
                onColorChange={(newColor) =>
                  handleColorChange(project.uid, newColor)
                }
              />
              <p className="text-small">{project.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">{children}</div>
    </div>
  )
}

export default Layout
