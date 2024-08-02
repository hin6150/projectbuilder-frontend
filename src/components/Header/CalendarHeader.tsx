'use client'
import { ChevronLeft, ChevronRight, PlusIcon } from 'lucide-react'
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

type ViewType = 'month' | 'week' | 'day'
interface CalendarHeaderProps {
  view: ViewType
  date: Date
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  date,
  onPrev,
  onNext,
  onToday,
}) => {
  const { modals, openModal } = useModal()
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
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleClick}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
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
