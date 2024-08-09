import { http, HttpResponse } from 'msw'
import { ScheduleVisibility } from '@/api/services/schedule/model'

export const scheduleHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/schedule/info`, () => {
    return HttpResponse.json({
      code: 200,
      result: [
        {
          id: '1',
          title: '데모데모 데이',
          startDate: '2024-08-5 4:00',
          endDate: '2024-08-5 12:00',
          visible: ScheduleVisibility.PUBLIC,
          projectId: '123',
        },
        {
          id: '2',
          title: '일정이름 입니다',
          startDate: '2024-08-18 16:45',
          endDate: '2024-08-18 18:45',
          visible: ScheduleVisibility.PRIVATE,
          projectId: '123',
        },
        {
          id: '3',
          title: '일정이름 입니다',
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
        title: '데모데모 데이',
        content: '일정내용입니다일정내용입니다',
        visible: ScheduleVisibility.PUBLIC,
        startDate: '2024-01-10',
        endDate: '2024-01-10',
        repeat: {
          gap: 1,
          cycleType: 'DAY',
          days: ['월'],
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
