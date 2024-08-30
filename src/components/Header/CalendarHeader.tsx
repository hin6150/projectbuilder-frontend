import React, { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronLeft, ChevronRight, FilterIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ScheduleInfo, useProjectInfoQuery } from '@/api'
import { ModalTypes } from '@/hooks/useModal/useModal'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { ChevronLeft, ChevronRight, FilterIcon, PlusIcon } from 'lucide-react'
import { useProjectInfoQuery, useScheduleListQuery } from '@/api'
import { ModalTypes } from '@/hooks/useModal/useModal'
import { Button } from '../ui/button'

import {
  ScheduleCreateModal,
  ScheduleRepeatModal,
  RepeatScheduleDeleteModal,
} from '../Modal/ScheduleModal'
import { Daily } from '../Calendar/Daily'
import { useCalendarContext } from '@/app/(afterLogin)/schedule/page'
import { format } from 'date-fns'
import { List } from '../Calendar/List'
import { Weekly } from '../Calendar/Weekly'
import { Monthly } from '../Calendar/Monthly'

type ViewType = 'monthly' | 'weekly' | 'daily' | 'list'

type SelectedProjects = { [key: string]: boolean }
type Checked = boolean

interface CalendarHeaderProps {
  view: ViewType
  date: Date
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onFilterChange: (
    selectedProject: SelectedProjects,
    myCalendar: Checked,
  ) => void
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  date,
  onPrev,
  onNext,
  onToday,
  onFilterChange,
}) => {
  const { modals, openModal } = useModal()
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

  // const [selectedProject, setSelectedProject] = useState<SelectedProjects>({})
  // const [myCalendar, setMyCalendar] = useState<Checked>(true)
  const [selectedView, setSelectedView] = useState<ViewType>(view)

  // const handleCheckedChange = (uid: string) => {
  //   const updatedProjects = {
  //     ...selectedProject,
  //     [uid]: !selectedProject[uid],
  //   }
  //   setSelectedProject(updatedProjects)
  //   onFilterChange(updatedProjects, myCalendar)
  // }

  // const handleMyCalendarChange = (checked: Checked) => {
  //   setMyCalendar(checked)
  //   onFilterChange(selectedProject, checked)
  // }

  const handleSelectChange = (value: ViewType) => {
    setSelectedView(value)
  }

  return (
    <>
      <div className="flex w-[864px] items-center justify-between self-stretch px-4">
        <div className="flex items-center gap-[16px]">
          <p className="w-[140px] text-h3">
            {date.getFullYear()}년{' '}
            {(date.getMonth() + 1).toString().padStart(2, '0')}월
          </p>
          <Button
            onClick={onPrev}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={onNext}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button onClick={onToday} variant="outline" className="flex h-8">
            <p className="text-body">오늘</p>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <FilterIcon className="h-4 w-4" />
                <p>필터</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[160px] items-start">
              <DropdownMenuLabel>필터</DropdownMenuLabel>
              {projects?.map((project) => (
                <DropdownMenuCheckboxItem
                  key={project.id}
                  checked={!!selectedProject[project.id]}
                  // onCheckedChange={() => handleCheckedChange(project.id)}
                >
                  {project.title}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuCheckboxItem
                checked={myCalendar}
                // onCheckedChange={handleMyCalendarChange}
              >
                내 캘린더
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => openModal('default', ModalTypes.CREATE)}
          >
            <PlusIcon className="h-4 w-4" />
            <p className="text-subtle">일정 추가</p>
          </Button>
          <Select value={selectedView} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue>
                {selectedView === 'daily'
                  ? '일(Daily)'
                  : selectedView === 'weekly'
                    ? '주(Weekly)'
                    : selectedView === 'monthly'
                      ? '월(Monthly)'
                      : '일정(List)'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>캘린더 타입</SelectLabel>
                <SelectItem value="daily">일(Daily)</SelectItem>
                <SelectItem value="weekly">주(Weekly)</SelectItem>
                <SelectItem value="monthly">월(Monthly)</SelectItem>
                <SelectItem value="list">일정(List)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedView === 'daily' ? (
        <Daily
          date={state.date}
          schedules={filteredSchedules}
          projects={projects?.map((project) => ({
            uid: project.id,
            title: project.title,
          }))}
        />
      ) : null}
      {selectedView === 'list' ? (
        <List schedules={filteredSchedules} projects={projects} />
      ) : null}
      {selectedView === 'weekly' ? (
        <Weekly date={state.date} schedules={filteredSchedules} />
      ) : null}
      {selectedView === 'monthly' ? (
        <Monthly
          date={state.date}
          schedules={filteredSchedules}
          projects={projects}
        />
      ) : null}

      {modals.default.open && modals.default.type === ModalTypes.CREATE && (
        <ScheduleCreateModal />
      )}
      {modals.dimed.type === ModalTypes.REPEAT && <ScheduleRepeatModal />}
      {modals.dimed.type === ModalTypes.DELETE_REPEAT && (
        <RepeatScheduleDeleteModal />
      )}
    </>
  )
}
