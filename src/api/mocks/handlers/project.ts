import {
  DefaultResponse,
  ProjectInviteStatus,
} from '@/api/services/project/model'
import { http, HttpResponse } from 'msw'

export const projectHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/project/info`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      result: [
        {
          id: '50e27d90-7e72-4c57-8a7c-4c7ceba19fbc',
          title: '자기주도프로젝트',
          overview: '신흥철 교수님 2024년 2학기 자기주도프로젝트 수업',
          users: [
            {
              id: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '홍길동',
            },
            {
              id: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '홍길동',
            },
          ],
          startDate: '2024.09.01',
          endDate: '2024.12.01',
        },
        {
          id: '4058db92-16fb-4e81-9911-62747e3598f0',
          title: '자기주도프로젝트',
          overview: '신흥철 교수님 2024년 2학기 자기주도프로젝트 수업',
          users: [
            {
              id: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '홍길동',
            },
          ],
          startDate: '2024.09.01',
          endDate: '2024.12.01',
        },
        {
          id: 'd470a00c-63f4-4234-bd1f-64fbcf4ba1b6',
          title: '자기주도프로젝트',
          overview: '신흥철 교수님 2024년 2학기 자기주도프로젝트 수업',
          users: [
            {
              id: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '홍길동',
            },
          ],
          startDate: '2024.09.01',
          endDate: '2024.12.01',
        },
        {
          id: 'c7ea218d-aa92-4639-b4de-aafd7306623a',
          title: 'K-프로젝트',
          overview: '학점연계 K-프로젝트입니다.',
          users: [
            {
              id: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '김재연',
            },
            {
              id: '1f2a7092-ede4-4fbe-9077-7fbb2c3a23a6',
              avatar: 'https://avatars.githubusercontent.com/u/145416041?v=4',
              name: '이서우',
            },
            {
              id: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '조건희',
            },
            {
              id: '1f2a7092-ede4-4fbe-9077-7fbb2c3a23a6',
              avatar: 'https://avatars.githubusercontent.com/u/145416041?v=4',
              name: '이서우',
            },
            {
              id: 'c57a1af5-ccde-4a16-86d0-ad202e1c91f0',
              avatar: '',
              name: '이윤영',
            },
            {
              id: '1f2a7092-ede4-4fbe-9077-7fbb2c3a23a6',
              avatar: 'https://avatars.githubusercontent.com/u/145416041?v=4',
              name: '이서우',
            },
          ],
          startDate: '2024.07.01',
          endDate: '2024.09.01',
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
  http.delete(`${process.env.NEXT_PUBLIC_API_URL}/project/info/:id`, () => {
    console.log(`Project deleted`)

    return HttpResponse.json<DefaultResponse>({
      code: 'SUCCESS',
    })
  }),
  http.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/project/info/*/TeamInfo`,
    () => {
      console.log(`Invited users deleted`)

      return HttpResponse.json<DefaultResponse>({
        code: 'SUCCESS',
      })
    },
  ),
]
