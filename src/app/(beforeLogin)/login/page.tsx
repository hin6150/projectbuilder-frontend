'use client'

import { useUserInfoQuery } from '@/api'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <Link href="/auth/token?access=AccessToken&refresh=RefreshToken">
      <div>로그인 하기</div>
    </Link>
  )
}

export default page
