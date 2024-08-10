'use client'

import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-[3rem]">
      <div className="flex w-[627px] flex-col items-center gap-[20px]">
        <p className="font-pretendard text-4xl font-extrabold leading-none tracking-tighter text-black">
          일정 조율부터, 프로젝트 관리까지.
        </p>
        <p className="font-pretendard text-4xl font-extrabold leading-none tracking-tighter text-black">
          지금 시작하세요!
        </p>
      </div>
      <div className="items:start flex w-[380px] flex-col gap-[20px]">
        <a
          href={
            process.env.NEXT_PUBLIC_SOCIAL_LOGIN_GOOGLE +
            `?redirect_uri=${process.env.VERCEL ? 'https://today-scrum.vercel.app' : 'http://localhost:3000'}`
          }
          className="w-full"
        >
          <Button className="w-full gap-[8px] border border-gray-300 bg-white hover:bg-slate-50">
            <Icon name="google" />
            <p className="w-[104px] text-black">구글로 시작하기</p>
          </Button>
        </a>
        <a
          href={
            process.env.NEXT_PUBLIC_SOCIAL_LOGIN_KAKAO +
            `?redirect_uri=${process.env.VERCEL ? 'https://today-scrum.vercel.app' : 'http://localhost:3000'}`
          }
          className="w-full"
        >
          <Button className="w-full gap-[8px] bg-yellow-300 hover:bg-yellow-200">
            <Icon name="kakao" />
            <p className="text-black">카카오로 시작하기</p>
          </Button>
        </a>
        {/* <a
          href={process.env.NEXT_PUBLIC_SOCIAL_LOGIN_GITHUB}
          className="w-full"
        >
          <Button className="w-full gap-[8px] bg-slate-900 hover:bg-slate-800">
            <Icon name="github" />
            <p className="text-white">깃허브로 시작하기</p>
          </Button>
        </a> */}
      </div>
    </div>
  )
}

export default Login
