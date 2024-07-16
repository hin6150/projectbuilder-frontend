import { http, HttpResponse } from 'msw'

import { API_URL } from '../config'
import { UserStatus } from '@/api/services/user/model'
import {
  ACCESS_TOKEN_HEADER_KEY,
  REFRESH_TOKEN_HEADER_KEY,
} from '@/api/constants/header-key'

export const userHandlers = [
  http.get(`${API_URL}/auth/refresh`, () => {
    return new HttpResponse(null, {
      headers: {
        [ACCESS_TOKEN_HEADER_KEY]: 'Fake Access',
        [REFRESH_TOKEN_HEADER_KEY]: 'Fake Refresh',
      },
    })
  }),
  http.get(`${API_URL}/UserInfo`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      result: {
        id: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
        email: 'HongGildong@gmail.com',
        status: UserStatus.Registered,
        onboardingCompleted: false,
        name: '홍길동',
        phone: '01012345678',
        address: '서울특별시',
        tool: {
          figma: 'HongGildong@naver.com',
          notion: 'HongGildong@gmail.com',
        },
        stack: ['리엑트'],
        MBTI: 'ESTJ',
      },
    })
  }),
]
