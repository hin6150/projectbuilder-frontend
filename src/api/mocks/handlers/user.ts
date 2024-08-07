import { UserStatus } from '@/api/services/user/model'
import { http, HttpResponse } from 'msw'

export const userHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/info`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      result: {
        id: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
        socialId: '12408124812',
        email: 'HongGildong@gmail.com',
        status: UserStatus.LOGIN,
        name: '홍길동',
        contact: '010-1234-5678',
        location: '서울특별시',
        tools: {
          Figma: 'HongGildong@naver.com',
          Notion: 'HongGildong@gmail.com',
        },
        stacks: ['리엑트', 'ㅇㅇ'],
        mbti: 'ESTJ',
        imageUrl: 'https://avatars.githubusercontent.com/u/145416041?v=4',
      },
    })
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
    })
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/user/optional`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
    })
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/user/info`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
    })
  }),
]
