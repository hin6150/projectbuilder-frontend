import React, { useState, useRef, useEffect } from 'react'
import cardStyles from './Card.css'
import Modal from '../Modal/Modal'
import Option from '../Option/Option'
import { ProfileAvatar } from '../Avatar/Avatar'
import { MoreVertical } from 'lucide-react'

interface CardProps {
  title: string
  description: string
  members: { name: string; avatar: string }[]
  startDate: string
  endDate: string
}

const MAX_VISIBLE_MEMBERS = 5

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

  const visibleMembers = members.slice(0, MAX_VISIBLE_MEMBERS)
  const remainingMemberCount = members.length - MAX_VISIBLE_MEMBERS

  return (
    <>
      <div className={cardStyles.card}>
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <p className="mb-4 text-gray-700">{description}</p>
        <div className={cardStyles.members}>
          {visibleMembers.map((member, index) => (
            <div key={index} className={cardStyles.member}>
              <ProfileAvatar imageUrl={member.avatar} name={member.name} />
            </div>
          ))}
          {remainingMemberCount > 0 && (
            <div className={`${cardStyles.member} ${cardStyles.extraMembers}`}>
              +{remainingMemberCount}
            </div>
          )}
        </div>
        <div className="relative flex justify-between">
          <p className={cardStyles.dates}>
            {startDate} ~ {endDate}
          </p>
          <MoreVertical
            name="more-vertical"
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
