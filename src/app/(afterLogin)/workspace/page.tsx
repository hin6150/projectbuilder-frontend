'use client'

import React, { useState } from 'react'
import { useProjectInfoQuery, ProjectInfo } from '@/api'
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

const Workspace = () => {
  const { data, isLoading } = useProjectInfoQuery()

  const { open, toggleModal, setModal, type } = useModal()

  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(
    null,
  )

  const handleClick = () => {
    setModal(ModalTypes.CREATE)
    toggleModal()
  }

  const handleEditClick = (project: ProjectInfo) => {
    setSelectedProject(project)
    setModal(ModalTypes.EDIT)
    toggleModal()
  }

  const handleInviteClick = (project: ProjectInfo) => {
    setSelectedProject(project)
    setModal(ModalTypes.INVITE)
    toggleModal()
  }

  if (isLoading) {
    return null
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
        {data?.result.map((projectData) => (
          <Card
            key={projectData.uid}
            data={projectData}
            onEditClick={() => handleEditClick(projectData)}
            onInviteClick={() => handleInviteClick(projectData)}
          />
        ))}
      </div>

      {open && type == ModalTypes.CREATE && <ProjectCreateModal />}
      {open && type == ModalTypes.EDIT && selectedProject && (
        <ProjectEditeModal project={selectedProject} />
      )}
      {open && type == ModalTypes.DELETE && <ProjectDeleteModal />}
      {open && type == ModalTypes.INVITE && selectedProject && (
        <ProjectInviteModal
          initialEmails={selectedProject.user.map((user) => user.email)}
        />
      )}
    </main>
  )
}
export default Workspace
