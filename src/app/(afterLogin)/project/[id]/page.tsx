'use client'

import ProjectContainer from '@/components/ProjectContainer/ProjectContainer'
import { usePathname } from 'next/navigation'
import { useProjectInfoQuery, ProjectInfo } from '@/api'
import { useState, useEffect } from 'react'

const Page = () => {
  const path = usePathname()
  const { data, isLoading } = useProjectInfoQuery()
  const id = path.split('/').pop()
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(
    null,
  )

  useEffect(() => {
    if (data && id) {
      const project = data.result.find((project) => project.uid === id)
      setSelectedProject(project || null)
    }
  }, [data, id])

  if (isLoading) {
    return null
  }

  if (!data || !data.result.length) {
    return <div>No project data available.</div>
  }

  if (!selectedProject) {
    return <div>Project not found.</div>
  }

  return (
    <div>
      <ProjectContainer data={selectedProject} />
    </div>
  )
}

export default Page
