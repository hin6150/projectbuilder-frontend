'use client'

import Card from '@/components/Card/Card'
import {
  ProjectCreateModal,
  ProjectDeleteModal,
  ProjectEditeModal,
  ProjectInviteModal,
} from '@/components/Modal/ProjectModal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/useModal'
import { ModalTypes } from '@/hooks/useModal/useModal'
import { PlusIcon } from 'lucide-react'

export default function Home() {
  const project = {
    title: '프로젝트 이름이 들어 가야겠죠',
    description: '설명이 들어 가야겠죠',
    members: [
      { name: '재연', avatar: '/avatar1.png' },
      { name: '서우', avatar: '/avatar1.png' },
      { name: '홍기', avatar: '/avatar1.png' },
      { name: '재연', avatar: '/avatar1.png' },
      { name: '재연', avatar: '/avatar1.png' },
      { name: '재연', avatar: '/avatar1.png' },
      { name: '재연', avatar: '/avatar1.png' },
    ],
    startDate: '2024.07.01 (월)',
    endDate: '2024.07.11 (일)',
  }
  const { open, toggleModal, setModal, type } = useModal()

  const handleClick = () => {
    setModal(ModalTypes.CREATE)
    toggleModal()
  }

  return (
    <main className="mt-5">
      <div className="mb-[30px] flex justify-end">
        <Button className="w-[180px]" onClick={handleClick}>
          <div className="flex items-center justify-center gap-2">
            <PlusIcon size={16} />
            <p className="text-body">프로젝트 생성</p>
          </div>
        </Button>
      </div>

      <div className="flex flex-wrap gap-5">
        <Card {...project} />
        <Card {...project} />
        <Card {...project} />
        <Card {...project} />
      </div>

      {open && type == ModalTypes.CREATE && <ProjectCreateModal />}
      {open && type == ModalTypes.EDIT && <ProjectEditeModal />}
      {open && type == ModalTypes.DELETE && <ProjectDeleteModal />}
      {open && type == ModalTypes.INVITE && <ProjectInviteModal />}
    </main>
  )
}
