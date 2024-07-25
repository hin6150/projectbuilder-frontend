import React, { useState } from 'react'
import Button from '../Button/ButtonForm'

interface ModalProps {
  title: string
  description: string
  startDate: string
  endDate: string
  onClose: () => void
  onSave: (
    title: string,
    description: string,
    startDate: string,
    endDate: string,
  ) => void
}

const Modal: React.FC<ModalProps> = ({
  title: initialTitle,
  description: initialDescription,
  startDate: initialStartDate,
  endDate: initialEndDate,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [dateRange, setDateRange] = useState(
    `${initialStartDate} ~ ${initialEndDate}`,
  )

  const handleSave = () => {
    const [startDate, endDate] = dateRange.split(' ~ ')
    onSave(title, description, startDate, endDate)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange(e.target.value)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">프로젝트 수정</h2>
        <label className="mb-4 block">
          프로젝트 이름
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </label>
        <label className="mb-4 block">
          프로젝트 기간
          <input
            type="text"
            value={dateRange}
            onChange={handleDateChange}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </label>
        <label className="mb-4 block">
          프로젝트 개요
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-24 w-full resize-none rounded border border-gray-300 px-3 py-2"
            maxLength={100}
          />
          <div className="text-right text-sm text-gray-600">
            {description.length} / 100
          </div>
        </label>
        <div className="flex w-full justify-between">
          <Button
            variant="subtle"
            onClick={onClose}
            className="flex flex-1 items-center justify-center gap-2 p-2 px-4"
          >
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex flex-1 items-center justify-center gap-2 p-2 px-4"
          >
            수정
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
