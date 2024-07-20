import { http, HttpResponse } from 'msw'

import {
  ACCESS_TOKEN_HEADER_KEY,
  REFRESH_TOKEN_HEADER_KEY,
} from '../../constants/header-key'

export const authHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, () => {
    return new HttpResponse(null, {
      headers: {
        [ACCESS_TOKEN_HEADER_KEY]: 'Fake Access',
        [REFRESH_TOKEN_HEADER_KEY]: 'Fake Refresh',
      },
    })
  }),
]
