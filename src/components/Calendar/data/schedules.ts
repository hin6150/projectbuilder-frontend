interface Schedule {
  date: number
  time: string
  description: string
  project: string
}

interface Schedules {
  [year: number]: {
    [month: number]: Schedule[]
  }
}

export const schedules: Schedules = {
  // 예시 일정 데이터
  2024: {
    7: [
      {
        date: 14,
        time: '하루종일',
        description: '데모데이 준비',
        project: 'A',
      },
      {
        date: 14,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
      {
        date: 20,
        time: '오후 4시',
        description: '일정이름입니다',
        project: 'A',
      },
      {
        date: 28,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
      {
        date: 28,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
      {
        date: 29,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
    ],
    8: [
      { date: 1, time: '하루종일', description: '데모데이 준비', project: 'A' },
      {
        date: 4,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
      {
        date: 11,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
      {
        date: 18,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
    ],
    10: [
      { date: 1, time: '하루종일', description: '데모데이 준비', project: 'A' },
      {
        date: 4,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
      {
        date: 11,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
      {
        date: 18,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
    ],
    12: [
      { date: 1, time: '하루종일', description: '데모데이 준비', project: 'A' },
      {
        date: 1,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
      {
        date: 11,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
      {
        date: 18,
        time: '오후 4시 ~ 5시',
        description: '일정이름입니다',
        project: 'B',
      },
    ],
  },
  2025: {
    1: [{ date: 1, time: '하루종일', description: '새해 첫날', project: 'C' }],
  },
}
