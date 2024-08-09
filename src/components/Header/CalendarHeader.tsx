'use client'
import { ChevronLeft, ChevronRight, FilterIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useModal } from '@/hooks/useModal'
import { ModalTypes } from '@/hooks/useModal/useModal'
import {
  RepeatScheduleDeleteModal,
  ScheduleCheckModal,
  ScheduleCreateModal,
  ScheduleDeleteModal,
  ScheduleEditModal,
  ScheduleRepeatModal,
} from '../Modal/ScheduleModal'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type ViewType = 'month' | 'week' | 'day'
interface CalendarHeaderProps {
  view: ViewType
  date: Date
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

type Checked = DropdownMenuCheckboxItemProps['checked']

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  date,
  onPrev,
  onNext,
  onToday,
}) => {
  const { modals, openModal } = useModal()
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const handleClick = () => {
    openModal('default', ModalTypes.CREATE)
    console.log(modals)
  }

  return (
    <>
      <div className="flex w-[864px] items-center justify-between self-stretch px-4">
        <div className="flex items-center gap-[16px]">
          <p className="w-[140px] text-h3">
            {year}년 {month.toString().padStart(2, '0')}월
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
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">필터</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>필터</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
                disabled
              >
                Activity Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <Button variant="outline" className="gap-2" onClick={handleClick}>
            <PlusIcon className="h-4 w-4" />
            <p className="text-subtle">일정 추가</p>
          </Button>
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="주(Weekly)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>캘린더 타입</SelectLabel>
                <SelectItem value="Daily">일(Daily)</SelectItem>
                <SelectItem value="Weekly">주(Weekly)</SelectItem>
                <SelectItem value="Monthly">월(Monthly)</SelectItem>
                <SelectItem value="List">일정(List)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {modals.default.open && modals.default.type == ModalTypes.CREATE && (
        <ScheduleCreateModal />
      )}
      {modals.default.open && modals.default.type == ModalTypes.CHECK && (
        <ScheduleCheckModal />
      )}
      {modals.default.open && modals.default.type == ModalTypes.EDIT && (
        <ScheduleEditModal />
      )}
      {modals.dimed.type && modals.dimed.type == ModalTypes.REPEAT && (
        <ScheduleRepeatModal />
      )}
      {modals.dimed.type && modals.dimed.type == ModalTypes.DELETE && (
        <ScheduleDeleteModal />
      )}
      {modals.dimed.type && modals.dimed.type == ModalTypes.DELETE_REPEAT && (
        <RepeatScheduleDeleteModal />
      )}
    </>
  )
}
