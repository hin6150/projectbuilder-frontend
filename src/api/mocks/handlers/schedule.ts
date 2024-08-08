import { http, HttpResponse } from 'msw'
import { ScheduleVisibility } from '@/api/services/schedule/model'

export const scheduleHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/schedule/info`, () => {
    return HttpResponse.json({
      code: 200,
      result: [
        {
          id: '1',
          title: '프로젝트 킥오프',
          startDate: '2024-08-11',
          endDate: '2024-08-11',
          visible: ScheduleVisibility.PUBLIC,
          projectId: '123',
        },
        {
          id: '2',
          title: '디자인 회의',
          startDate: '2024-08-18',
          endDate: '2024-08-18',
          visible: ScheduleVisibility.PRIVATE,
          projectId: '123',
        },
        {
          id: '3',
          title: '개발 스프린트',
          startDate: '2024-08-31',
          endDate: '2024-08-31',
          visible: ScheduleVisibility.PUBLIC,
          projectId: '124',
        },
      ],
    })
  }),

  http.get(`${process.env.NEXT_PUBLIC_API_URL}/schedule/:id`, () => {
    return HttpResponse.json({
      code: 200,
      msg: 'SUCCESS',
      result: {
        title: '프로젝트 킥오프',
        content: '프로젝트 킥오프 회의 내용',
        visible: ScheduleVisibility.PUBLIC,
        startDate: '2024-01-10',
        endDate: '2024-01-10',
        repeat: {
          gap: 1,
          cycleType: 'DAY',
          days: ['Monday'],
          cnt: 10,
        },
        projectId: '123',
        inviteList: ['user1', 'user2'],
      },
    })
  }),

  http.post(`${process.env.NEXT_PUBLIC_API_URL}/schedule`, async (req) => {
    return HttpResponse.json({
      code: 200,
      msg: 'INSERT SUCCESS',
      result: {
        id: '4', // 새로 생성된 스케줄 ID
      },
    })
  }),

  http.patch(`${process.env.NEXT_PUBLIC_API_URL}/schedule/:id`, () => {
    return HttpResponse.json({
      code: 200,
      msg: 'SUCCESS',
      result: [
        {
          id: '4',
          title: '업데이트된 스케줄 제목',
          startDate: '2024-02-01',
          endDate: '2024-02-01',
          visible: ScheduleVisibility.PRIVATE,
          projectId: '124',
        },
      ],
    })
  }),

  http.delete(`${process.env.NEXT_PUBLIC_API_URL}/schedule/:id`, () => {
    return HttpResponse.json({
      code: 200,
      message: 'DELETE SUCCESS',
      data: null,
    })
  }),
]
