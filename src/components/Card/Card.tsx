import React, { useState } from 'react'
import cardStyles from './Card.css'
import Modal from '../Modal/Modal'

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
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
        <div className="flex justify-between">
          <p className={cardStyles.dates}>
            {startDate} ~ {endDate}
          </p>
          <img
            src="/more-vertical.png"
            alt="options"
            onClick={handleOpenModal}
          />
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
