'use client'

import { baseFetcher } from '@/api/lib/fetcher'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useLayoutEffect } from 'react'

export const InitialSetting = () => {
  const client = useQueryClient()

  useLayoutEffect(() => {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    client.setQueryData(['access'], Cookies.get('access'))
    client.setQueryData(['refresh'], Cookies.get('refresh'))

    baseFetcher.setUnAuthorizedHandler(() => {
      location.href = '/login'
    })
    // baseFetcher.setErrorHandler(() => {
    //   addToast({
    //     message: '죄송합니다. 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
    //     type: 'error',
    //   })
    // })
    baseFetcher.setTokenRefreshHandler((accessToken, refreshToken) => {
      Cookies.set('access', accessToken, {
        expires: new Date('2038-01-19T03:14:07.000Z'),
      })
      Cookies.set('refresh', refreshToken, {
        expires: new Date('2038-01-19T03:14:07.000Z'),
      })
    })
  }, [])

  return null
}
