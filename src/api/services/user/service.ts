import { QueryClient } from '@tanstack/react-query'

import { APIBuilder } from '../../lib/fetcher'

import { DefaultResponse, UserInfoDTO, UserInfoResponse } from './model'

export const userService = {
  async userInfo(client: QueryClient) {
    return APIBuilder.get('/UserInfo')
      .withCredentials(client)
      .build()
      .call<UserInfoResponse>()
  },
  async userEdit(client: QueryClient, dto: UserInfoDTO) {
    return APIBuilder.post('/UserInfo')
      .withCredentials(client)
      .build()
      .call<DefaultResponse>({ body: JSON.stringify(dto) })
  },
}
