import { http, HttpResponse } from 'msw'
import { ScheduleVisibility } from '@/api/services/schedule/model'

export const scheduleHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/schedule/list`, () => {
    return HttpResponse.json({
      code: 200,
      result: [
        {
          id: '1',
          title: '데모데모 데이',
          startDate: '2024-08-05 4:00',
          endDate: '2024-08-05 12:00',
          visible: ScheduleVisibility.PUBLIC,
          projectId: '50e27d90-7e72-4c57-8a7c-4c7ceba19fbc',
        },
        {
          id: '2',
          title: '일정이름 입니다',
          startDate: '2024-08-18 16:45',
          endDate: '2024-08-18 18:45',
          visible: ScheduleVisibility.PRIVATE,
          projectId: '',
        },
        {
          id: '3',
          title: '데모데모 데이',
          startDate: '2024-08-19 4:00',
          endDate: '2024-08-19 12:00',
          visible: ScheduleVisibility.PUBLIC,
          projectId: 'd470a00c-63f4-4234-bd1f-64fbcf4ba1b6',
        },
        {
          id: '4',
          title: '데모데모 데이',
          startDate: '2024-08-28 4:00',
          endDate: '2024-08-28 12:00',
          visible: ScheduleVisibility.PUBLIC,
          projectId: 'd470a00c-63f4-4234-bd1f-64fbcf4ba1b6',
        },
        {
          id: '5',
          title: '일정이름 입니다',
          startDate: '2024-08-31',
          endDate: '2024-08-31',
          visible: ScheduleVisibility.PUBLIC,
          projectId: '4058db92-16fb-4e81-9911-62747e3598f0',
        },
      ],
    })
  }),

  http.get(`${process.env.NEXT_PUBLIC_API_URL}/schedule/:id`, (req) => {
    const { id } = req.params
    const schedules = [
      {
        id: '1',
        title: '데모데모 데이',
        content: '일정내용입니다일정내용입니다',
        startDate: '2024-08-05 4:00',
        endDate: '2024-08-05 12:00',
        visible: ScheduleVisibility.PUBLIC,
        projectId: '50e27d90-7e72-4c57-8a7c-4c7ceba19fbc',
      },
      {
        id: '2',
        title: '일정이름 입니다',
        content: '일정내용입니다일정내용입니다',
        startDate: '2024-08-18 16:45',
        endDate: '2024-08-18 18:45',
        visible: ScheduleVisibility.PRIVATE,
        projectId: '',
      },
      {
        id: '3',
        title: '데모데모 데이',
        startDate: '2024-08-19 4:00',
        endDate: '2024-08-19 12:00',
        visible: ScheduleVisibility.PUBLIC,
        projectId: 'd470a00c-63f4-4234-bd1f-64fbcf4ba1b6',
      },
      {
        id: '4',
        title: '일정이름 입니다',
        content: '일정내용입니다일정내용입니다',
        startDate: '2024-08-31',
        endDate: '2024-08-31',
        visible: ScheduleVisibility.PUBLIC,
        projectId: '4058db92-16fb-4e81-9911-62747e3598f0',
      },
    ]

    const schedule = schedules.find((s) => s.id === id)

    if (schedule) {
      return HttpResponse.json({
        code: 200,
        msg: 'SUCCESS',
        result: schedule,
      })
    } else {
      return HttpResponse.json({
        code: 404,
        msg: 'Schedule not found',
      })
    }
  }),

  http.post(`${process.env.NEXT_PUBLIC_API_URL}/schedule`, async (req) => {
    return HttpResponse.json({
      code: 200,
      msg: 'CREATE SUCCESS',
    })
  }),

  http.patch(`${process.env.NEXT_PUBLIC_API_URL}/schedule/:id`, () => {
    return HttpResponse.json({
      code: 200,
      msg: 'EDIT SUCCESS',
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
