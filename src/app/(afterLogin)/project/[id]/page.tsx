'use client'

import ProjectContainer from '@/components/ProjectContainer/ProjectContainer'
import { usePathname } from 'next/navigation'
import { useProjectInfoQuery, ProjectInfo } from '@/api'
import { useState, useEffect } from 'react'
import { useOneProjectInfoQuery } from '@/api/services/project/quries'

const Page = () => {
  const path = usePathname()
  const id = path.split('/').pop() || null
  const { data, isLoading } = useOneProjectInfoQuery(id as string, {
    enabled: !!id,
  })

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
      <ProjectContainer data={data.result} />
    </div>
  )
}

export default Page
