'use client'

import { useEffect, useState } from 'react'

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false)
  useEffect(() => {
    const init = async () => {
      const { initMsw } = await import('./index')
      await initMsw()
      setMswReady(true)
    }

    init()
  }, [mswReady])

  if (!mswReady) return null

  return <>{children}</>
}
