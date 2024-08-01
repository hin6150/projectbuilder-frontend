'use client'

import ProjectContainer from '@/components/ProjectContainer/ProjectContainer'
import { usePathname } from 'next/navigation'

const page = () => {
  const path = usePathname()
  const id = path.split('/').pop()

  return (
    <div>
      <ProjectContainer></ProjectContainer>
    </div>
  )
}

export default page
