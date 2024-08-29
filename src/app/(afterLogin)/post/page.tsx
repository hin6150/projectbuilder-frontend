'use client'

import { ProfileAvatar } from '@/components/Avatar/Avatar'
import React, { useState } from 'react'

interface Member {
  id: number
  name: string
  imageUrl: string
}

interface User {
  name: string
  createdAt: string
}

interface Comment {
  user: User
  comment: string
}

interface CommentContainerProps {
  comment: Comment
  onEdit: (newComment: string) => void
  onDelete: () => void
}

type PostContainerProps = {
  type: string
  title: string
  assignee: string
  createdDate: string
  status: string
}
const CommentContainer: React.FC<CommentContainerProps> = ({
  comment,
  onEdit,
  onDelete,
}) => {
  const members: Member[] = [
    { id: 1, name: '홍길동', imageUrl: '' },
    { id: 2, name: '홍길동', imageUrl: '' },
    { id: 3, name: '홍길동', imageUrl: '' },
  ]
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.comment)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    onEdit(editedContent)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value)
  }

  return (
    <div className="mt-[32px] flex flex-col gap-[24px] rounded-md border-2 border-slate-200 p-[24px]">
      <div className="flex justify-between">
        <div className="flex gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <ProfileAvatar
              size="32"
              imageUrl={members[1].imageUrl}
              name={members[1].name}
            />
            <div className="author">{comment.user.name}</div>
          </div>
          <div className="flex items-end text-[12px]">
            {comment.user.createdAt}
          </div>
        </div>
        <div className="flex gap-[12px]">
          {isEditing ? (
            <>
              <button onClick={handleSaveClick} className="text-blue-500">
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500"
              >
                닫기
              </button>
            </>
          ) : (
            <>
              <SvgIcon name="edit" onClick={handleEditClick} />
              <SvgIcon name="delete" />
            </>
          )}
        </div>
      </div>
      <hr className="border-t border-gray-300" />
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={handleChange}
          className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="flex">{comment.comment}</div>
      )}
    </div>
  )
}

const commentData: Comment = {
  user: {
    name: '홍길동',
    createdAt: '2024.08.01 오후 4:00',
  },
  comment: 'asdsa',
}

const PostContainer: React.FC<PostContainerProps> = ({
  type,
  title,
  assignee,
  createdDate,
  status,
}) => {
  const [comment, setComment] = useState<string>('')

  const handleDelete = () => {
    console.log('댓글이 삭제되었습니다.') // api 연동하기
  }
  const [commentData, setCommentData] = useState<Comment>({
    user: {
      name: '홍길동',
      createdAt: '2024.08.01 오후 4:00',
    },
    comment:
      '댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.',
  })

  const handleEdit = (newComment: string) => {
    setCommentData((prev) => ({
      ...prev,
      comment: newComment,
    }))
  }

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value)
  }

  const handleCommentSubmit = () => {
    console.log(comment)
    // api 연동하기.
    setComment('')
  }

  return (
    <div className="h-screen">
      <div className="mt-[14px] flex flex-col gap-[24px] rounded-md border-2 border-slate-200 p-[24px]">
        <div className="flex justify-between">
          <div className="flex gap-[16px]">
            <div className="relative flex w-[75px] cursor-pointer items-center rounded-[15px] bg-red-200 px-[8px]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="w-full text-center">긴급</span>
            </div>
            <div className="text-h3">{title}</div>
            <div className="flex items-end font-pretendard text-[14px] font-semibold leading-[20px] text-gray-400">
              {type}
            </div>
          </div>
          <div className="flex gap-[12px]">
            <SvgIcon name="edit" />
            <SvgIcon name="delete" />
          </div>
        </div>
        <div className="flex gap-[8px]">
          <div className="image">{assignee}</div>
          <div className="author">홍길동</div>
          <div className="flex items-end text-[12px]">{createdDate}</div>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex text-blue-500">@홍길동</div>
        <div className="flex">
          게시글내용입니다. 게시글내용입니다. 게시글내용입니다.
          게시글내용입니다. 게시글내용입니다. 게시글내용입니다.
          게시글내용입니다. 게시글내용입니다. 게시글내용입니다.
          게시글내용입니다. 게시글내용입니다. 게시글내용입니다.
          게시글내용입니다. 게시글내용입니다. 게시글내용입니다.
          게시글내용입니다.
        </div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <CommentContainer
          comment={commentData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="flex flex-col gap-[10px] pb-[48px]">
          <div className="font-inter text-sm font-medium leading-4 text-black">
            댓글
          </div>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="h-[80px] w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="댓글을 적어 주세요."
          />
          <div className="flex flex-row justify-end">
            <button
              onClick={handleCommentSubmit}
              className="w-[89px] rounded border px-[16px] py-[8px] font-pretendard text-sm font-normal leading-6 text-slate-900"
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const SvgIcon: React.FC<{ name: 'edit' | 'delete'; onClick?: () => void }> = ({
  name,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) onClick()
  }

  switch (name) {
    case 'edit':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          onClick={handleClick}
        >
          <g clipPath="url(#clip0)">
            <path
              d="M12 1.33398L14.6667 4.00065"
              stroke="#374151"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.99967 13.6673L12.6663 6.00065L9.99967 3.33398L2.33301 11.0007L1.33301 14.6673L4.99967 13.6673Z"
              stroke="black"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    case 'delete':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          onClick={handleClick}
        >
          <path
            d="M2 4H14"
            stroke="#374151"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.6663 4V13.3333C12.6663 14 11.9997 14.6667 11.333 14.6667H4.66634C3.99967 14.6667 3.33301 14 3.33301 13.3333V4"
            stroke="black"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.33301 4.00065V2.66732C5.33301 2.00065 5.99967 1.33398 6.66634 1.33398H9.33301C9.99967 1.33398 10.6663 2.00065 10.6663 2.66732V4.00065"
            stroke="black"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.66699 7.33398V11.334"
            stroke="black"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.33301 7.33398V11.334"
            stroke="black"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    default:
      return null
  }
}

const Page = () => {
  return (
    <div>
      <PostContainer
        type="이슈"
        title="긴급 배포 이슈"
        assignee="CN +2"
        createdDate="2024. 07. 19"
        status="긴급"
      />
    </div>
  )
}

export default Page
