'use client'

import ProjectContainer from '@/components/ProjectContainer/ProjectContainer'
import { usePathname } from 'next/navigation'
import { useRecommedMeetingTimesQuery } from '@/api'
import { useOneProjectInfoQuery } from '@/api/services/project/quries'

const Page = () => {
  const path = usePathname()

  const id = path.split('/').pop() || null
  const { data, isLoading } = useOneProjectInfoQuery(id as string, {
    enabled: !!id,
  })
  const { data: meetingData } = useRecommedMeetingTimesQuery({
    projectId: id!,
    startDate: '2024-09-01', // 예시: 시작 날짜
    endDate: '2024-09-30', // 예시: 종료 날짜
  })

  if (isLoading) {
    return null
  }

  if (!data) {
    return <div>No project data available.</div>
  }

  if (!data.result) {
    return <div>Project not found.</div>
  }

  return (
    <>
      <ProjectContainer data={data.result} />

      <div className="flex flex-col gap-3 p-[10px]">
        <p className="text-body">프로젝트 팀원</p>
        {data.result.users.length > 0 ? (
          data.result.users.map((user) => (
            <div key={user.id} className="flex gap-2">
              {/* <TextGradientGenerator initialColor={} onColorChange={} /> */}
              <p className="text-small">{user.name}</p>
            </div>
          ))
        ) : (
          <p>팀원이 없습니다.</p>
        )}
      </div>
      <div className="flex flex-col gap-3 p-[10px]">
        <p className="text-body">회의 추천 일정</p>
        {/* {meetingData?.result?.length > 0 ? (
          meetingData.result.map((meeting, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border-b border-gray-200 p-2"
            >
              <p className="text-small">시작 시간: {meeting.startTime}</p>
              <p className="text-small">종료 시간: {meeting.endTtime}</p>
              <p className="text-small">
                참석 가능 인원: {meeting.attendeeCount}명
              </p>
            </div>
          ))
        ) : (
          <p>추천된 회의 일정이 없습니다.</p>
        )} */}
      </div>
    </>
  )
}

export default Page
