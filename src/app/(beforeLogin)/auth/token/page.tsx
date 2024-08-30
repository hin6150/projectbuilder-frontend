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

  if (!accessToken || !refreshToken) {
    router.push('/login')
  }

  useEffect(() => {
    Cookies.set('access', accessToken, {
      secure: true,
      expires: new Date('2038-01-19T03:14:07.000Z'),
    })
    Cookies.set('refresh', refreshToken, {
      secure: true,
      expires: new Date('2038-01-19T03:14:07.000Z'),
    })
    queryClient.setQueryData(['access'], accessToken)
    queryClient.setQueryData(['refresh'], refreshToken)

    const checkUserRegistered = async () => {
      const userInfo = await userService.userInfo(queryClient)
      const isRegistered = userInfo.result.status === UserStatus.JOIN

      if (isRegistered) {
        router.push('/home')
        return
      }
      router.push('/signup')
    }

    checkUserRegistered()
  }, [accessToken, queryClient, refreshToken, router])

  return null
}

export default AuthCallbackPage
