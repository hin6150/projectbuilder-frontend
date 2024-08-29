'use client'

import ProjectContainer from '@/components/ProjectContainer/ProjectContainer'
import { usePathname } from 'next/navigation'
import { useProjectInfoQuery, ProjectInfo } from '@/api'
import { useState, useEffect } from 'react'
import { useOneProjectInfoQuery } from '@/api/services/project/quries'
import { da } from 'date-fns/locale'

const Page = () => {
  const path = usePathname()
  const id = path.split('/').pop()
  const { data, isLoading } = useOneProjectInfoQuery(id as string)

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
      <ProjectContainer data={data.result} id={id as string} />
    </div>
  )
}

export default Page
