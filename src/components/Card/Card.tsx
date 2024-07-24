import React, { useState, useRef, useEffect } from 'react'
import cardStyles from './Card.css'
import Modal from '../Modal/Modal'
import Option from '../Option/Option'

interface CardProps {
  title: string
  description: string
  members: { name: string; avatar: string }[]
  startDate: string
  endDate: string
}

const Card: React.FC<CardProps> = ({
  title: initialTitle,
  description: initialDescription,
  members,
  startDate: initialStartDate,
  endDate: initialEndDate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOptionOpen, setIsOptionOpen] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)

  const optionRef = useRef<HTMLDivElement>(null)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenOption = () => {
    setIsOptionOpen(!isOptionOpen)
  }

  const handleSave = (
    newTitle: string,
    newDescription: string,
    newStartDate: string,
    newEndDate: string,
  ) => {
    setTitle(newTitle)
    setDescription(newDescription)
    setStartDate(newStartDate)
    setEndDate(newEndDate)
    handleCloseModal()
  }

  const handleInvite = () => {
    // Add your invite logic here
    setIsOptionOpen(false)
  }

  const handleEdit = () => {
    // Add your edit logic here
    setIsOptionOpen(false)
    handleOpenModal()
  }

  const handleDelete = () => {
    // Add your delete logic here
    setIsOptionOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setIsOptionOpen(false)
      }
    }

    if (isOptionOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOptionOpen])

  return (
    <>
      <div className={cardStyles.card}>
        <h2 className={cardStyles.title}>{title}</h2>
        <p className={cardStyles.description}>{description}</p>
        <div className={cardStyles.members}>
          {members.map((member, index) => (
            <div key={index} className={cardStyles.member}>
              <img
                src={member.avatar}
                alt={member.name}
                className={cardStyles.avatar}
              />
              <span className={cardStyles.initials}>{member.name}</span>
            </div>
          ))}
        </div>
        <div className="relative flex justify-between">
          <p className={cardStyles.dates}>
            {startDate} ~ {endDate}
          </p>
          <img
            src="/more-vertical.png"
            alt="options"
            onClick={handleOpenOption}
            className="cursor-pointer"
          />
          {isOptionOpen && (
            <Option
              onInvite={handleInvite}
              onEdit={handleEdit}
              onDelete={handleDelete}
              optionRef={optionRef}
            />
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={title}
          description={description}
          startDate={startDate}
          endDate={endDate}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  )
}

export default Card
