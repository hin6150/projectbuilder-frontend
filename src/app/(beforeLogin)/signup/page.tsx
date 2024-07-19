'use client'
import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import InputForm from '@/components/Input/InputForm'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  username: z.string().min(2, {
    message: '이름은 2글자 이상이어야 합니다.',
  }),
  email: z.string(),
  phonenumber: z.string().refine(
    (value) => {
      const phoneNumber = value.replace(/-/g, '')
      return /^01[0-9]\d{7,8}$/.test(phoneNumber)
    },
    {
      message: '올바른 전화번호를 입력해주세요.',
    },
  ),
})

const formatPhoneNumber = (value: string) => {
  if (!value) return value
  const phoneNumber = value.replace(/[^\d]/g, '')
  const phoneNumberLength = phoneNumber.length

  if (phoneNumberLength < 4) return phoneNumber
  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`
}

const JoinForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      phonenumber: '',
    },
  })

  // const [checkedItems, setCheckedItems] = React.useState({
  //   all: false,
  //   use: false,
  //   privacy: false,
  //   mail: false,
  // })

  // const handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const checked = event.target.checked
  //   setCheckedItems({
  //     all: checked,
  //     use: checked,
  //     privacy: checked,
  //     mail: checked,
  //   })
  // }

  // const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, checked } = event.target
  //   setCheckedItems((prev) => {
  //     const newCheckedItems = {
  //       ...prev,
  //       [id]: checked,
  //     }
  //     newCheckedItems.all =
  //       newCheckedItems.use && newCheckedItems.privacy && newCheckedItems.mail
  //     return newCheckedItems
  //   })
  // }

  // const isSubmitDisabled = !checkedItems.use && !checkedItems.privacy

  const router = useRouter()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to sign up')
      }

      const data = await response.json()
      console.log('데이터 저장 성공', data)

      router.push('/signup/optionalInfo')
    } catch (error) {
      console.error('데이터 저장 실패', error)
    }
  }

  return (
    <div className="flex w-full h-full px-[770px] py-[279px] justify-center items-start gap-[10px] font-pretendard">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[380px] flex-col items-start gap-[36px] flex-shrink-0"
        >
          <div className="flex flex-col justify-center items-center gap-[8px] self-stretch">
            <p className="text-[20px] text-center font-semibold leading-[28px] tracking-[-0.1px]">
              회원 가입
            </p>
          </div>
          <div className="flex flex-col items-start gap-[10px] self-stretch">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch opacity-50">
                  <FormLabel className="text-[16px]">이메일</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      disabled={true}
                      value="sara0409@naver.com"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
                  <FormLabel className="text-[16px]">이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
                  <FormLabel className="text-[16px]">전화번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="전화번호"
                      value={formatPhoneNumber(field.value)}
                      onChange={(e) =>
                        field.onChange(formatPhoneNumber(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-start gap-[14px] self-stretch">
            <div className="flex items-start gap-[8px]">
              <Checkbox
                id="all"
                // checked={checkedItems.all}
                // onCheckedChange={(checked) => handleAllCheck}
                className="w-[14px] h-[14px] rounded-[2px] border border-gray-200"
              />
              <label
                htmlFor="all"
                className="text-[14px] font-medium leading-[14px]"
              >
                전체 동의
              </label>
            </div>
            <div className="h-[1px] self-stretch bg-gray-200" />
            <div className="flex flex-col items-start gap-[16px] self-stretch">
              <div className="flex items-start gap-[8px]">
                <Checkbox
                  id="use"
                  // checked={checkedItems.use}
                  // onChange={() => handleCheck}
                  className="w-[14px] h-[14px] rounded-[2px] border border-gray-200"
                />
                <label
                  htmlFor="use"
                  className="text-gray-500 text-[14px] font-medium- leading-[14px]"
                >
                  <span className="text-blue-500 underline">이용약관</span> 동의
                  (필수)
                </label>
              </div>
              <div className="flex items-start gap-[8px]">
                <Checkbox
                  id="privacy"
                  // checked={checkedItems.privacy}
                  // onChange={() => handleCheck}
                  className="w-[14px] h-[14px] rounded-[2px] border border-gray-200"
                />
                <label
                  htmlFor="privacy"
                  className="text-gray-500 text-[14px] font-medium- leading-[14px]"
                >
                  <span className="text-blue-500 underline">개인정보 수집</span>{' '}
                  이용 동의 (필수)
                </label>
              </div>
              <div className="flex items-start gap-[8px]">
                <Checkbox
                  id="mail"
                  // checked={checkedItems.mail}
                  // onChange={() => handleCheck}
                  className="w-[14px] h-[14px] rounded-[2px] border border-gray-200"
                />
                <label
                  htmlFor="mail"
                  className="text-gray-500 text-[14px] font-medium- leading-[14px]"
                >
                  마케팅 메일 수신 동의 (선택)
                </label>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            // disabled={isSubmitDisabled}
            className="flex w-full px-[16px] py-[8px] justify-center items-center gap-[18px] bg-blue-600 hover:bg-blue-500"
          >
            <p className="text-[14px] font-normal leading-[24px]">회원가입</p>
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default JoinForm
