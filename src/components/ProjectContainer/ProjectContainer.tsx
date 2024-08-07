import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { ko } from 'date-fns/locale'
import { ProjectInfo } from '@/api'
import { format } from 'date-fns'
import { useState } from 'react'
import { Check } from 'lucide-react'

interface TeamCheckboxProps {
  id: string
  name: string
}

interface TimeSlot {
  time: string
  attendance: string
}

interface ScheduleItemProps {
  date: string
  timeslots: TimeSlot[]
}

export interface BoardItem {
  type: string
  title: string
  assignee: string
  createdDate: string
  status: string
  [key: string]: string
}

export interface BoardProps {
  items: BoardItem[]
}

const TeamCheckbox: React.FC<TeamCheckboxProps> = ({ id, name }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        className="rounded-[2px] border border-gray-200 bg-white"
      />
      <label htmlFor={id} className="text-[14px]">
        {name}
      </label>
    </div>
  )
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ date, timeslots }) => {
  return (
    <div>
      <div className="text-h5 py-[6px]">
        {date}
        {timeslots.map((slot, index) => (
          <div className="pw-[32px] mt-[8px]" key={index}>
            <span>{slot.time}</span>
            <span>{slot.attendance}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const scheduleData = {
  date: '2024년 07월 14일',
  timeslots: [
    { time: '08:00 ~ 09:00', attendance: '5/6인 참석' },
    { time: '08:00 ~ 09:00', attendance: '5/6인 참석' },
  ],
} // api 연동시 수정해야함!

const FilterBar = () => {
  const [search, setSearch] = useState('')
  const [showSearchInput, setShowSearchInput] = useState(false)

  return (
    <div className="flex items-center space-x-2 p-2">
      {showSearchInput ? (
        <input
          type="text"
          placeholder="제목으로 검색하기"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[384px] flex-grow rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          onClick={() => setShowSearchInput(true)}
          className="cursor-pointer"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.0004 21.0004L16.6504 16.6504"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <button className="rounded-[6px] border-[1px] px-4 py-2 transition duration-200 hover:bg-blue-600 hover:text-white">
        + 게시글 작성
      </button>
    </div>
  )
}

const Board: React.FC<BoardProps> = ({ items }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: string
  } | null>(null)

  const sortedItems = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...items].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return items
  }, [items, sortConfig])

  const requestSort = (key: string) => {
    let direction = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const renderStatus = (status: string) => {
    if (status === '긴급') {
      return (
        <div className="flex w-[75px] items-center rounded-[15px] bg-red-200 px-[8px]">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
          <span className="w-full text-center">긴급</span>
        </div>
      )
    } else if (status === '진행중') {
      return (
        <div className="flex w-[75px] items-center rounded-[15px] bg-blue-200 px-[8px]">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
          <span className="w-full text-center">진행중</span>
        </div>
      )
    } else if (status === '완료') {
      return (
        <div className="flex w-[75px] items-center rounded-[15px] bg-green-200 px-[8px]">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
          <span className="w-full text-center">완료</span>
        </div>
      )
    }
  }

  return (
    <div>
      <div>
        <table className="w-full bg-white">
          <thead className="text-left">
            <tr>
              <th className="border-b px-5 py-2">
                <Checkbox />
              </th>
              <th
                className="cursor-pointer border-b px-4 py-2"
                onClick={() => requestSort('type')}
              >
                종류
              </th>
              <th
                className="cursor-pointer border-b px-4 py-2"
                onClick={() => requestSort('title')}
              >
                제목
              </th>
              <th
                className="cursor-pointer border-b px-4 py-2"
                onClick={() => requestSort('assignee')}
              >
                담당자
              </th>
              <th
                className="cursor-pointer border-b px-4 py-2"
                onClick={() => requestSort('createdDate')}
              >
                생성일자
              </th>
              <th
                className="cursor-pointer border-b px-4 py-2"
                onClick={() => requestSort('status')}
              >
                진행 상태
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        <table className="w-full bg-white">
          <tbody>
            {sortedItems.map((item, index) => (
              <tr key={index}>
                <td className="border-b px-5 py-2">
                  <Checkbox />
                </td>
                <td className="border-b px-4 py-2">{item.type}</td>
                <td className="border-b px-4 py-2">{item.title}</td>
                <td className="border-b px-4 py-2">{item.assignee}</td>
                <td className="border-b px-4 py-2">{item.createdDate}</td>
                <td className="border-b px-4 py-2">
                  {renderStatus(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const items: BoardItem[] = [
  {
    type: '이슈',
    title: '긴급 배포 이슈',
    assignee: 'CN +2',
    createdDate: '2024. 07. 19',
    status: '긴급',
  },
  {
    type: '피드백',
    title: '스프린트 3 디자인 A안 B안 비교',
    assignee: 'CN +2',
    createdDate: '2024. 07. 19',
    status: '진행중',
  },
  {
    type: '이슈',
    title: 'AWS 배포 비용 문제',
    assignee: 'CN +2',
    createdDate: '2024. 07. 19',
    status: '진행중',
  },
  {
    type: '이슈',
    title: '프론트엔드 개발자 필요@@',
    assignee: 'CN +2',
    createdDate: '2024. 07. 19',
    status: '진행중',
  },
  {
    type: '피드백',
    title: '스프린트 3 기획 리뷰',
    assignee: 'CN +2',
    createdDate: '2024. 07. 19',
    status: '진행중',
  },
  {
    type: '이슈',
    title: '긴급 배포 이슈',
    assignee: 'CN +2',
    createdDate: '2024. 07. 19',
    status: '완료',
  },
  {
    type: '이슈',
    title: '긴급 배포 이슈',
    assignee: 'CN +2',
    createdDate: '2024. 07. 19',
    status: '완료',
  },
  {
    type: '이슈',
    title: '긴급 배포 이슈',
    assignee: 'CN +2',
    createdDate: '2024. 07. 19',
    status: '완료',
  },
]

const ProjectContainer = ({ data }: { data: ProjectInfo }) => {
  if (!data) {
    return <div>Loading...</div> // 데이터가 없는 경우를 처리합니다.
  }

  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="Container">
      <div className="flex justify-between pt-[90px]">
        <div className="flex">
          <div className="text-h1">{data.title}</div>
          <div className="self-end pl-[24px] text-h3">
            {data.startDate}~{data.endDate}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="self-center"
        >
          <path
            d="M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3658 2.58579C9.99072 2.96086 9.78 3.46957 9.78 4V4.18C9.77964 4.53073 9.68706 4.87519 9.51154 5.17884C9.33602 5.48248 9.08374 5.73464 8.78 5.91L8.35 6.16C8.04596 6.33554 7.70108 6.42795 7.35 6.42795C6.99893 6.42795 6.65404 6.33554 6.35 6.16L6.2 6.08C5.74107 5.81526 5.19584 5.74344 4.684 5.88031C4.17217 6.01717 3.73555 6.35154 3.47 6.81L3.25 7.19C2.98526 7.64893 2.91345 8.19416 3.05031 8.706C3.18717 9.21783 3.52154 9.65445 3.98 9.92L4.13 10.02C4.43228 10.1945 4.68362 10.4451 4.85905 10.7468C5.03448 11.0486 5.1279 11.391 5.13 11.74V12.25C5.1314 12.6024 5.03965 12.949 4.86405 13.2545C4.68844 13.5601 4.43521 13.8138 4.13 13.99L3.98 14.08C3.52154 14.3456 3.18717 14.7822 3.05031 15.294C2.91345 15.8058 2.98526 16.3511 3.25 16.81L3.47 17.19C3.73555 17.6485 4.17217 17.9828 4.684 18.1197C5.19584 18.2566 5.74107 18.1847 6.2 17.92L6.35 17.84C6.65404 17.6645 6.99893 17.5721 7.35 17.5721C7.70108 17.5721 8.04596 17.6645 8.35 17.84L8.78 18.09C9.08374 18.2654 9.33602 18.5175 9.51154 18.8212C9.68706 19.1248 9.77964 19.4693 9.78 19.82V20C9.78 20.5304 9.99072 21.0391 10.3658 21.4142C10.7409 21.7893 11.2496 22 11.78 22H12.22C12.7504 22 13.2591 21.7893 13.6342 21.4142C14.0093 21.0391 14.22 20.5304 14.22 20V19.82C14.2204 19.4693 14.3129 19.1248 14.4885 18.8212C14.664 18.5175 14.9163 18.2654 15.22 18.09L15.65 17.84C15.954 17.6645 16.2989 17.5721 16.65 17.5721C17.0011 17.5721 17.346 17.6645 17.65 17.84L17.8 17.92C18.2589 18.1847 18.8042 18.2566 19.316 18.1197C19.8278 17.9828 20.2645 17.6485 20.53 17.19L20.75 16.8C21.0147 16.3411 21.0866 15.7958 20.9497 15.284C20.8128 14.7722 20.4785 14.3356 20.02 14.07L19.87 13.99C19.5648 13.8138 19.3116 13.5601 19.136 13.2545C18.9604 12.949 18.8686 12.6024 18.87 12.25V11.75C18.8686 11.3976 18.9604 11.051 19.136 10.7455C19.3116 10.4399 19.5648 10.1862 19.87 10.01L20.02 9.92C20.4785 9.65445 20.8128 9.21783 20.9497 8.706C21.0866 8.19416 21.0147 7.64893 20.75 7.19L20.53 6.81C20.2645 6.35154 19.8278 6.01717 19.316 5.88031C18.8042 5.74344 18.2589 5.81526 17.8 6.08L17.65 6.16C17.346 6.33554 17.0011 6.42795 16.65 6.42795C16.2989 6.42795 15.954 6.33554 15.65 6.16L15.22 5.91C14.9163 5.73464 14.664 5.48248 14.4885 5.17884C14.3129 4.87519 14.2204 4.53073 14.22 4.18V4C14.22 3.46957 14.0093 2.96086 13.6342 2.58579C13.2591 2.21071 12.7504 2 12.22 2Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="py-[36px] text-h3">{data.subTitle}</div>
      <hr className="mb-[36px] border-t border-gray-300" />
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">보드</h1>
        <FilterBar />
      </div>
      <div className="container p-[24px]">
        <Board items={items} />
      </div>
      <hr className="border-t border-gray-300" />
      <div className="py-[36px] text-h3">캘린더</div>
      <div className="flex">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          locale={ko}
        />
      </div>
      <div className="mt-[32px] flex flex-col gap-[12px] p-[1px]">
        프로젝트 팀원
        <TeamCheckbox id="1" name="팀원 A"></TeamCheckbox>
        <TeamCheckbox id="2" name="팀원 B"></TeamCheckbox>
        <TeamCheckbox id="3" name="팀원 C"></TeamCheckbox>
        <TeamCheckbox id="4" name="팀원 내 개인 캘린더"></TeamCheckbox>
        <TeamCheckbox id="5" name="팀원 프로젝트 회의"></TeamCheckbox>
      </div>
      <div className="mt-[24px] w-[300px]">
        회의 추천 일정
        <ScheduleItem
          date={scheduleData.date}
          timeslots={scheduleData.timeslots}
        />
        <ScheduleItem
          date={scheduleData.date}
          timeslots={scheduleData.timeslots}
        />
      </div>
    </div>
  )
}

export default ProjectContainer
