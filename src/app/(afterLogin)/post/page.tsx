'use client'

import ProjectContainer from '@/components/ProjectContainer/ProjectContainer'
import { usePathname } from 'next/navigation'
import { useProjectInfoQuery, ProjectInfo } from '@/api'
import { useState, useEffect } from 'react'

type PostContainerProps = {
  type: string
  title: string
  assignee: string
  createdDate: string
  status: string
}

const PostContainer: React.FC<PostContainerProps> = ({
  type,
  title,
  assignee,
  createdDate,
  status,
}) => {
  return (
    <div>
      <div className="mt-[14px] flex flex-col gap-[24px] rounded-md border-2 border-slate-200 p-[24px]">
        <div className="flex justify-between">
          <div className="flex gap-[16px]">
            <div className="relative flex w-[75px] cursor-pointer items-center rounded-[15px] bg-red-200 px-[8px]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
              <span className="w-full text-center">긴급</span>
            </div>
            <div className="text-h3">긴급 배포 이슈</div>
            <div className="flex items-end font-pretendard text-[14px] font-semibold leading-[20px] text-gray-400">
              이슈
            </div>
          </div>
          <div className="flex gap-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_714_28978)">
                <path
                  d="M12 1.33398L14.6667 4.00065"
                  stroke="#374151"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.99967 13.6673L12.6663 6.00065L9.99967 3.33398L2.33301 11.0007L1.33301 14.6673L4.99967 13.6673Z"
                  stroke="black"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_714_28978">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2 4H14"
                stroke="#374151"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.6663 4V13.3333C12.6663 14 11.9997 14.6667 11.333 14.6667H4.66634C3.99967 14.6667 3.33301 14 3.33301 13.3333V4"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.33301 4.00065V2.66732C5.33301 2.00065 5.99967 1.33398 6.66634 1.33398H9.33301C9.99967 1.33398 10.6663 2.00065 10.6663 2.66732V4.00065"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.66699 7.33398V11.334"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.33301 7.33398V11.334"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-[8px]">
          <div className="image">CN</div>
          <div className="authror">홍길동</div>
          <div className="flex items-end text-[12px]">2024.08.01 오후 4:00</div>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex text-blue-500">@홍길동</div>
        <div className="flex">
          게시글내용입니다.게시글내용입니다.게시글내용입니다. 게시글내용입니다.
          게시글내용입니다. 게시글내용입니다. 게시글내용입니다.
          게시글내용입니다. 게시글내용입니다. 게시글내용입니다.
          게시글내용입니다.게시글내용입니다. 게시글내용입니다.게시글내용입니다.
          게시글내용입니다. 게시글내용입니다.
          게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.
        </div>
      </div>
      <div className="mt-[14px] flex flex-col gap-[24px] rounded-md border-2 border-slate-200 p-[24px]">
        <div className="flex justify-between">
          <div className="flex gap-[8px]">
            <div className="image">CN</div>
            <div className="authror">홍길동</div>
            <div className="flex items-end text-[12px]">
              2024.08.01 오후 4:00
            </div>
          </div>
          <div className="flex gap-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_714_28978)">
                <path
                  d="M12 1.33398L14.6667 4.00065"
                  stroke="#374151"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.99967 13.6673L12.6663 6.00065L9.99967 3.33398L2.33301 11.0007L1.33301 14.6673L4.99967 13.6673Z"
                  stroke="black"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_714_28978">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2 4H14"
                stroke="#374151"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.6663 4V13.3333C12.6663 14 11.9997 14.6667 11.333 14.6667H4.66634C3.99967 14.6667 3.33301 14 3.33301 13.3333V4"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.33301 4.00065V2.66732C5.33301 2.00065 5.99967 1.33398 6.66634 1.33398H9.33301C9.99967 1.33398 10.6663 2.00065 10.6663 2.66732V4.00065"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.66699 7.33398V11.334"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.33301 7.33398V11.334"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex text-blue-500">@홍길동</div>
        <div className="flex">
          게시글내용입니다.게시글내용입니다.게시글내용입니다. 게시글내용입니다.
          게시글내용입니다. 게시글내용입니다. 게시글내용입니다.
          게시글내용입니다. 게시글내용입니다. 게시글내용입니다.
          게시글내용입니다.게시글내용입니다. 게시글내용입니다.게시글내용입니다.
          게시글내용입니다. 게시글내용입니다.
          게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.게시글내용입니다.
        </div>
      </div>
      <div>
        <div className="text-h2">댓글</div>
      </div>
    </div>
  )
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
