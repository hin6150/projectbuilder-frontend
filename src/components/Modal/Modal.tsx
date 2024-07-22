import React, { useState } from 'react'
import styles from './Modal.css'

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
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)

  const handleSave = () => {
    onSave(title, description, startDate, endDate)
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
          <button onClick={onClose} className={styles.cancelButton}>
            취소
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            수정
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
