'use client'
import { useProjectInfoQuery } from '@/api'
import { CalendarHeader } from '@/components/Header/CalendarHeader'
import { MiniCalendar } from '@/components/ui/calendar'
import { TextGradientGenerator } from '@/components/ui/color-picker'
import { CalendarContext } from '@/hooks/useCalendar/calendarContext'
import { usePathname } from 'next/navigation'
import * as React from 'react'

type ViewType = 'monthly' | 'weekly' | 'list'

const Page = () => {
  const state = React.useContext(CalendarContext)
  const pathname = usePathname()
  const view = (pathname.split('/').pop() || 'list') as ViewType
  const { data } = useProjectInfoQuery()

  const [date, setDate] = React.useState<Date | undefined>(new Date())

  React.useEffect(() => {
    if (data) {
      const initialSelectedProjects =
        data?.result?.reduce(
          (acc, project) => {
            acc[project.id] = true
            return acc
          },
          {} as { [key: string]: boolean },
        ) || {}
      handleFilterChange(initialSelectedProjects, true)
    }
  }, [data])

  const { onPrev, onNext } = React.useMemo(() => {
    const handlers = {
      monthly: {
        onPrev: () => state.handlePrev('month'),
        onNext: () => state.handleNext('month'),
      },
      weekly: {
        onPrev: () => state.handlePrev('week'),
        onNext: () => state.handleNext('week'),
      },
      list: {
        onPrev: () => state.handlePrev('day'),
        onNext: () => state.handleNext('day'),
      },
    }
    return handlers[view] || handlers.list
  }, [view, state.handlePrev, state.handleNext])

  const handleMonthChange = (newDate: Date) => {
    setDate(newDate) // 새로운 날짜를 children에 반영
  }

  const handleColorChange = (uid: string, newColor: string) => {
    // const editProjectInfo = useEditProjectInfo(
    //   {
    //     title: '',
    //     overview: '',
    //     startDate: '',
    //     endDate: '',
    //     color: newColor,
    //   },
    //   uid,
    //   {
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({ queryKey: ['projectList'] })
    //     },
    //     onError: (e) => {
    //       console.log(e)
    //     },
    //   },
    // )
    // editProjectInfo.mutate()
  }

  const handleFilterChange = (
    updatedSelectedProject: { [key: string]: boolean },
    updatedMyCalendar: boolean,
  ) => {
    state.setSelectedProject(updatedSelectedProject)
    state.setMyCalendar(updatedMyCalendar)
  }

  return (
    <>
      {/* <CalendarContext.Provider
        value={{ state, selectedProject, myCalendar, handleFilterChange }}
      > */}
      <div className="m-auto flex w-[1180px]">
        <div className="flex flex-col gap-6">
          <MiniCalendar
            date={state.date}
            onMonthChange={onNext}
            onPrev={onPrev}
            onNext={onNext}
            onToday={state.handleToday}
            selected={date}
            onSelect={setDate}
            className="rounded-[8px] border text-large"
          />
          <div className="flex flex-col gap-3 p-[10px]">
            <p className="text-body">내 캘린더</p>
            {data?.result?.map((project) => (
              <div className="flex items-center gap-2" key={project.id}>
                <TextGradientGenerator
                  initialColor={project.color}
                  onColorChange={(newColor) =>
                    handleColorChange(project.id, newColor)
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
            onToday={state.handleToday}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      {/* </CalendarContext.Provider> */}
    </>
  )
}

export default Page
