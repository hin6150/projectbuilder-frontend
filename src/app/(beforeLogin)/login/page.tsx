'use client'
import * as React from 'react'
import loginStyles from './page.css'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Icon } from '@/components/Icon'

const Login = () => {
  const router = useRouter()
  return (
    <div className="flex w-full h-full px-[636px] py-[332px] flex-col items-center gap-[48px]">
      <div className="flex w-[627px] flex-col items-center gap-[20px]">
        <p className={loginStyles.title}>일정 조율부터, 프로젝트 관리까지.</p>
        <p className={loginStyles.title}>지금 시작하세요!</p>
      </div>
      <div className="flex w-[380px] flex-col items:start gap-[20px]">
        <Button className="gap-[8px] bg-slate-900 hover:bg-slate-800">
          <Icon name="github" />
          {/* <Image src="/github.png" alt="github 로고" width={18} height={18} /> */}
          <p className="text-white">깃허브로 시작하기</p>
        </Button>
        <Button className="gap-[8px] bg-yellow-300 hover:bg-yellow-200">
          <Icon name="kakao" />
          {/* <Image src="/kakao.png" alt="kakao 로고" width={24} height={24} /> */}
          <p className="text-black">카카오로 시작하기</p>
        </Button>
        <Button className="gap-[8px] bg-white hover:bg-slate-50 border border-gray-300">
          <Icon name="google" />
          {/* <Image src="/google.png" alt="google 로고" width={18} height={18} /> */}
          <p className="w-[104px] text-black">구글로 시작하기</p>
        </Button>
      </div>
    </div>
  )
}

export default Login
