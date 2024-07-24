import { http, HttpResponse } from 'msw'

import { UserStatus } from '@/api/services/user/model'

export const projectHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_URL}/ProjectInfo`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      result: [
        {
          uid: '50e27d90-7e72-4c57-8a7c-4c7ceba19fbc',
          title: '자기주도프로젝트',
          subTitle: '신흥철 교수님 2024년 2학기 자기주도프로젝트 수업',
          user: [
            {
              uid: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '홍길동',
            },
          ],
          startDate: '2024.09.01',
          endDate: '2024.12.01',
        },
        {
          uid: 'c7ea218d-aa92-4639-b4de-aafd7306623a',
          title: 'K-프로젝트',
          subTitle: '학점연계 K-프로젝트입니다.',
          user: [
            {
              uid: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '홍길동',
            },
            {
              uid: '1f2a7092-ede4-4fbe-9077-7fbb2c3a23a6',
              avatar: '',
              name: '이서우',
            },
          ],
          startDate: '2024.07.01',
          endDate: '2024.09.01',
        },
      ],
    })
  }),
  http.get(`${process.env.NEXT_PUBLIC_URL}/ProjectInfo/:uid/TeamInfo`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      result: [
        {
          email: 'test@gmail.com',
          state: 'Accept',
        },
        {
          email: 'test@naver.com',
          state: 'Pending',
        },
      ],
    })
  }),
]
