'use client'

import { CustomQueryOptions } from '@/api/type'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { DefaultResponse, UserInfoDTO, UserInfoResponse } from './model'
import { userService } from './service'

export const userOptions = {
  userInfo: (client: QueryClient) => ({
    queryKey: [],
    queryFn: () => userService.userInfo(client),
  }),
  userEdit: (client: QueryClient, dto: UserInfoDTO) => ({
    queryFn: () => userService.userEdit(client, dto),
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

export const useUserInfoMutation = (
  dto: UserInfoDTO,
  options: CustomQueryOptions<DefaultResponse> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation<DefaultResponse>({
    ...userOptions.userEdit(queryClient, dto),
    ...options,
  })
}
