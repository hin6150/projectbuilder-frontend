import { http, HttpResponse } from 'msw'

import { UserStatus } from '@/api/services/user/model'

export const projectHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_URL}/ProjectInfo`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      result: [
        {
          uid: 'string',
          title: 'string',
          subTitle: 'string',
          user: [
            {
              uid: 'string',
              avatar: 'string',
              name: 'string',
            },
          ],
          Date: 'string',
        },
      ],
    })
  }),
]
