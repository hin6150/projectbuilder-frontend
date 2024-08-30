export interface RecommedMeetingDto {
  projectId: string
  startDate: string
  endDate: string
}

export interface RecommedMeetingTime {
  startTime: string
  endTtime: string
  attendeeCount: number
}

export interface RecommedMeetingResponse {
  code: string
  message: string
  result: RecommedMeetingTime[]
}
