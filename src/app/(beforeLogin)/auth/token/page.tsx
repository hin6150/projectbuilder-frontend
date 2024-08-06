'use client'

import { userService } from '@/api'
import { UserStatus } from '@/api/services/user/model'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthCallbackQueryParams {
  searchParams: {
    accessToken: string
    refreshToken: string
  }
}

const AuthCallbackPage = ({
  searchParams: { accessToken, refreshToken },
}: AuthCallbackQueryParams) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    Cookies.set('access', accessToken, {
      secure: true,
    })
    Cookies.set('refresh', refreshToken, {
      secure: true,
    })
    queryClient.setQueryData(['access'], accessToken)
    queryClient.setQueryData(['refresh'], refreshToken)

    const checkUserRegistered = async () => {
      const userInfo = await userService.userInfo(queryClient)
      const isRegistered = userInfo.result.status === UserStatus.JOIN

      if (isRegistered) {
        router.push('/workspace')
        return
      }
      router.push('/signup')
    }

    checkUserRegistered()
  }, [accessToken, queryClient, refreshToken, router])

  return null
}

export default AuthCallbackPage
