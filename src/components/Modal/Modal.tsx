import React, { useState } from 'react'
import styles from './Modal.css'
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
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>프로젝트 수정</h2>
        <label className={styles.label}>
          프로젝트 이름
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          프로젝트 기간
          <input
            type="text"
            value={dateRange}
            onChange={handleDateChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          프로젝트 개요
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            maxLength={100}
          />
          <div className={styles.charCount}>{description.length} / 100</div>
        </label>
        <div className={styles.buttonGroup}>
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
