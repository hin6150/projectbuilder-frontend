import {
  ProjectInviteStatus,
  DefaultResponse,
} from '@/api/services/project/model'
import { http, HttpResponse } from 'msw'

export const projectHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/project/info`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      result: [
        {
          uid: '50e27d90-7e72-4c57-8a7c-4c7ceba19fbc',
          title: '자기주도프로젝트A',
          subTitle: '신흥철 교수님 2024년 2학기 자기주도프로젝트 수업',
          user: [
            {
              uid: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '홍길동',
            },
            {
              uid: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '홍길동',
            },
          ],
          startDate: '2024.09.01',
          endDate: '2024.12.01',
          color: 'bg-red-100',
        },
        {
          uid: '4058db92-16fb-4e81-9911-62747e3598f0',
          title: '자기주도프로젝트B',
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
          color: 'bg-purple-100',
        },
        {
          uid: 'd470a00c-63f4-4234-bd1f-64fbcf4ba1b6',
          title: '자기주도프로젝트C',
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
          color: 'bg-orange-100',
        },
        {
          uid: 'c7ea218d-aa92-4639-b4de-aafd7306623a',
          title: 'K-프로젝트',
          subTitle: '학점연계 K-프로젝트입니다.',
          user: [
            {
              uid: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '김재연',
            },
            {
              uid: '1f2a7092-ede4-4fbe-9077-7fbb2c3a23a6',
              avatar: 'https://avatars.githubusercontent.com/u/145416041?v=4',
              name: '이서우',
            },
            {
              uid: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '조건희',
            },
            {
              uid: '1f2a7092-ede4-4fbe-9077-7fbb2c3a23a6',
              avatar: 'https://avatars.githubusercontent.com/u/145416041?v=4',
              name: '이서우',
            },
            {
              uid: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '이윤영',
            },
            {
              uid: '1f2a7092-ede4-4fbe-9077-7fbb2c3a23a6',
              avatar: 'https://avatars.githubusercontent.com/u/145416041?v=4',
              name: '이서우',
            },
          ],
          startDate: '2024.07.01',
          endDate: '2024.09.01',
          color: 'bg-cyan-100',
        },
      ],
    })
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/project/info/*/TeamInfo`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      result: [
        {
          email: 'test@gmail.com',
          state: ProjectInviteStatus.Acceped,
        },
        {
          email: 'test@naver.com',
          state: ProjectInviteStatus.Denied,
        },
        {
          email: 'test@naver.com',
          state: ProjectInviteStatus.Invited,
        },
      ],
    })
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/project/info`, async (req) => {
    return HttpResponse.json<DefaultResponse>({
      code: 'SUCCESS',
    })
  }),
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/project/info/*/TeamInfo`,
    async (req) => {
      return HttpResponse.json<DefaultResponse>({
        code: 'SUCCESS',
      })
    },
  ),
  http.delete(`${process.env.NEXT_PUBLIC_API_URL}/project/info/:uid`, () => {
    console.log(`Project deleted`)

    return HttpResponse.json<DefaultResponse>({
      code: 'SUCCESS',
    })
  }),
  http.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/project/info/*/TeamInfo`,
    () => {
      console.log(`Invited user deleted`)

      return HttpResponse.json<DefaultResponse>({
        code: 'SUCCESS',
      })
    },
  ),
]
