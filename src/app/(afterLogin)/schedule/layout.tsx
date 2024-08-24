'use client'
import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { useCalendar } from '@/hooks/useCalendar'
import { usePathname } from 'next/navigation'
import { useProjectInfoQuery } from '@/api'
import { TextGradientGenerator } from '@/components/ui/color-picker'
import { CalendarHeader } from '@/components/Header/CalendarHeader'

type ViewType = 'monthly' | 'weekly' | 'list'

const CalendarContext = React.createContext<any>(null)

export const useCalendarContext = () => {
  const context = React.useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider')
  }
  return context
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const calendarState = useCalendar()
  const { state, handlePrev, handleNext, handleToday } = calendarState
  const pathname = usePathname()
  const view = (pathname.split('/').pop() || 'list') as ViewType
  const { data } = useProjectInfoQuery()

  const [selectedProject, setSelectedProject] = React.useState<{
    [key: string]: boolean
  }>({})
  const [myCalendar, setMyCalendar] = React.useState<boolean>(true)

  React.useEffect(() => {
    if (data) {
      const initialSelectedProjects = data.result.reduce(
        (acc, project) => {
          acc[project.uid] = true
          return acc
        },
        {} as { [key: string]: boolean },
      )
      handleFilterChange(initialSelectedProjects, true)
    }
  }, [data])

  const { onPrev, onNext } = React.useMemo(() => {
    const handlers = {
      monthly: {
        onPrev: () => handlePrev('month'),
        onNext: () => handleNext('month'),
      },
      weekly: {
        onPrev: () => handlePrev('week'),
        onNext: () => handleNext('week'),
      },
      list: {
        onPrev: () => handlePrev('day'),
        onNext: () => handleNext('day'),
      },
    }
    return handlers[view] || handlers.list
  }, [view, handlePrev, handleNext])

  const handleColorChange = (uid: string, newColor: string) => {
    // Update your state or API with the new color here
  }

  const handleFilterChange = (
    updatedSelectedProject: { [key: string]: boolean },
    updatedMyCalendar: boolean,
  ) => {
    setSelectedProject(updatedSelectedProject)
    setMyCalendar(updatedMyCalendar)
  }

  return (
    <CalendarContext.Provider
      value={{ state, selectedProject, myCalendar, handleFilterChange }}
    >
      <div className="m-auto flex w-[1180px]">
        <div className="flex flex-col gap-6">
          <Calendar className="h-78 rounded-[8px] border border-gray-300 text-large" />
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
            <div className="flex items-center gap-2">
              <TextGradientGenerator
                initialColor="#000000"
                onColorChange={(newColor) =>
                  handleColorChange('myCalendar', newColor)
                }
              />
              <p className="text-small">나의 일정</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <CalendarHeader
            view={view}
            date={state.date}
            onPrev={onPrev}
            onNext={onNext}
            onToday={handleToday}
            onFilterChange={handleFilterChange}
          />
          {children}
        </div>
      </div>
    </CalendarContext.Provider>
  )
}

export default Layout
