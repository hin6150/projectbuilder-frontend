'use client'

import { useProjectInfoQuery } from '@/api'
import Card from '@/components/Card/Card'
import {
  ProjectCreateModal,
  ProjectDeleteModal,
  ProjectEditModal,
  ProjectInviteModal,
} from '@/components/Modal/ProjectModal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/useModal'
import { ModalTypes } from '@/hooks/useModal/useModal'
import { PlusIcon } from 'lucide-react'

const workspace = () => {
  const { data, isLoading } = useProjectInfoQuery()

  const { openModal, modals } = useModal()

  const handleClick = () => {
    openModal('dimed', ModalTypes.CREATE)
  }

  if (isLoading) {
    return null
  }

  const renderModal = () => {
    if (!modals.dimed.open) return null

    switch (modals.dimed.type) {
      case ModalTypes.CREATE:
        return <ProjectCreateModal />
      case ModalTypes.EDIT:
        return <ProjectEditModal />
      case ModalTypes.DELETE:
        return <ProjectDeleteModal />
      case ModalTypes.INVITE:
        return <ProjectInviteModal />
      default:
        return null
    }
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
        {data?.result.map((data) => {
          return <Card data={data} />
        })}
      </div>

      {renderModal()}
    </main>
  )
}
export default workspace
