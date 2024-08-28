'use client'

import ProjectContainer from '@/components/ProjectContainer/ProjectContainer'
import { usePathname } from 'next/navigation'
import { useProjectInfoQuery, ProjectInfo } from '@/api'
import { useState, useEffect } from 'react'
import { useOneProjectInfoQuery } from '@/api/services/project/quries'
import { da } from 'date-fns/locale'

const Page = () => {
  const path = usePathname()
  // const { data, isLoading } = useProjectInfoQuery()
  const id = path.split('/').pop()
  const { data, isLoading } = useOneProjectInfoQuery(id)

  // useEffect(() => {
  //   if (data && id) {
  //     const project = data.result.find((project) => project.id === id)
  //     setSelectedProject(project || null)
  //   }
  // }, [data, id])

  if (isLoading) {
    return null
  }

  if (!data) {
    return <div>No project data available.</div>
  }

  if (!data.result) {
    return <div>Project not found.</div>
  }

  return (
    <div>
      <ProjectContainer data={data.result} id={id} />
    </div>
  )
}

export default Page
