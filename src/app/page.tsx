'use client'

import { useUserInfoQuery } from '@/api'
import Link from 'next/link'

export default function Home() {
  const { data } = useUserInfoQuery()

  if (data == null) {
    return <div>DATA ERROR</div>
  }

  return (
    <main>
      <h1 className="text-h1">name: {data.result.name}</h1>
      <h1 className="text-h1">email: {data.result.email}</h1>
    </main>
  )
}
