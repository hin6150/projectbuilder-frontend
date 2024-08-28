'use client'
import { useState } from 'react'

enum NotificationType {
  Comment = 'COMMENT', // 댓글 알림
  Mention = 'MENTION', // 게시글 언급 알림
  EventInvite = 'EVENT_INVITE', // 일정 초대 알림
  ProjectInvite = 'PROJECT_INVITE', // 프로젝트 초대 알림
  ProjectExit = 'PROJECT_EXIT', // 프로젝트 탈퇴 알림
  MeetingReminder = 'MEETING_REMINDER', // 회의 시작 알림
}

interface Notification {
  id: number
  type: NotificationType
  message: string // 알림 내용
  isRead: boolean // 읽음 여부
  timestamp: Date // 알림 시간
}

const notifications: Notification[] = [
  {
    id: 1,
    type: NotificationType.Comment,
    message: '홍길동님이 댓글을 남겼습니다.',
    isRead: false,
    timestamp: new Date(),
  },
  {
    id: 2,
    type: NotificationType.Mention,
    message: '홍길동님이 게시글에서 언급했습니다.',
    isRead: false,
    timestamp: new Date(),
  },
  {
    id: 3,
    type: NotificationType.EventInvite,
    message: '홍길동님이 일정에 초대했습니다.',
    isRead: true,
    timestamp: new Date(),
  },
  {
    id: 4,
    type: NotificationType.ProjectInvite,
    message: '홍길동님이 프로젝트에 초대했습니다.',
    isRead: true,
    timestamp: new Date(),
  },
  {
    id: 5,
    type: NotificationType.ProjectExit,
    message: '홍길동님이 프로젝트를 탈퇴했습니다.',
    isRead: true,
    timestamp: new Date(),
  },
  {
    id: 6,
    type: NotificationType.MeetingReminder,
    message: '10분 뒤 회의가 시작됩니다.',
    isRead: true,
    timestamp: new Date(),
  },
]

// 컴포넌트 정의
const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center p-2 text-lg font-medium text-gray-700 hover:text-gray-900"
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M21 9.33398C21 7.47747 20.2625 5.69699 18.9497 4.38424C17.637 3.07148 15.8565 2.33398 14 2.33398C12.1435 2.33398 10.363 3.07148 9.05025 4.38424C7.7375 5.69699 7 7.47747 7 9.33398C7 17.5007 3.5 19.834 3.5 19.834H24.5C24.5 19.834 21 17.5007 21 9.33398Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.0181 24.5C15.813 24.8536 15.5186 25.1471 15.1644 25.3511C14.8102 25.5551 14.4086 25.6625 13.9998 25.6625C13.591 25.6625 13.1894 25.5551 12.8352 25.3511C12.481 25.1471 12.1866 24.8536 11.9814 24.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-lg border border-gray-200 bg-white p-[10px] shadow-lg focus:outline-none"
          role="menu"
        >
          <div className="flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12 5.33398C12 4.27312 11.5786 3.2557 10.8284 2.50556C10.0783 1.75541 9.06087 1.33398 8 1.33398C6.93913 1.33398 5.92172 1.75541 5.17157 2.50556C4.42143 3.2557 4 4.27312 4 5.33398C4 10.0007 2 11.334 2 11.334H14C14 11.334 12 10.0007 12 5.33398Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.15335 14C9.03614 14.2021 8.86791 14.3698 8.6655 14.4864C8.46309 14.6029 8.2336 14.6643 8.00001 14.6643C7.76643 14.6643 7.53694 14.6029 7.33453 14.4864C7.13212 14.3698 6.96389 14.2021 6.84668 14"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.66699 4H14.0003"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66699 8H14.0003"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66699 12H14.0003"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 4.00065L2.66667 4.66732L4 3.33398"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 8.00065L2.66667 8.66732L4 7.33398"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12.0007L2.66667 12.6673L4 11.334"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <ul className="space-y-2 p-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="gap-[4px] p-[12px] font-sans text-sm font-normal leading-5 text-slate-500"
              >
                <div className="flex items-center gap-[10px] font-sans text-sm font-medium leading-none text-black">
                  {!notification.isRead && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                    >
                      <circle cx="4" cy="4" r="4" fill="#EF4444" />
                    </svg>
                  )}
                  <span>알림</span>
                </div>
                {notification.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown
