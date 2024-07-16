'use client'

import { useUserInfoQuery } from '@/api'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <Link href="/auth">
      <div>?</div>
    </Link>
  )
}

export default page
