'use client'

import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { userService } from './service'
import { CustomQueryOptions } from '@/api/type'
import { UserInfoResponse } from './model'

export const userOptions = {
  userInfo: (client: QueryClient) => ({
    queryKey: [],
    queryFn: () => userService.userInfo(client),
  }),
}

export const useUserInfoQuery = (
  options: CustomQueryOptions<UserInfoResponse> = {},
) => {
  const queryClient = useQueryClient()

  return useQuery<UserInfoResponse>({
    ...userOptions.userInfo(queryClient),
    ...options,
  })
}
