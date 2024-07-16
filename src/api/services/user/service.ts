import { QueryClient } from '@tanstack/react-query'

import { APIBuilder } from '../../lib/fetcher'

import { UserInfoResponse } from './model'

export const userService = {
  async userInfo(client: QueryClient) {
    return (
      APIBuilder.get('/UserInfo')
        //   .withCredentials(client)
        .build()
        .call<UserInfoResponse>()
    )
  },
}
