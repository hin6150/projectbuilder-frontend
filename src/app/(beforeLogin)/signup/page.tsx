'use client'
import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { boolean, z } from 'zod'

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
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { baseFetcher, Fetcher } from '@/api/lib/fetcher'
import { UserInfoDTO } from '@/api/services/user/model'

const formSchema = z.object({
  name: z.string().min(2, {
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
  use: z.boolean().refine((value) => value === true, {
    message: '이 항목을 체크해야 합니다.',
  }),
  privacy: z.boolean().refine((value) => value === true, {
    message: '이 항목을 체크해야 합니다.',
  }),
  mail: z.boolean().optional(),
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
      name: '',
      email: 'hin6150@gmail.com',
      phonenumber: '',
      use: false,
      privacy: false,
      mail: false,
    },
  })

  const isAllChecked =
    form.watch('use') && form.watch('privacy') && form.watch('mail')

  const onCheckAll = (chekced: boolean) => {
    form.setValue('use', chekced, { shouldValidate: true })
    form.setValue('privacy', chekced, { shouldValidate: true })
    form.setValue('mail', chekced, { shouldValidate: true })
  }

  const router = useRouter()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userDTO: UserInfoDTO = {
      name: values.name,
      phone: values.phonenumber,
      requiredTermsAgree: values.use && values.privacy,
      marketingEmailOptIn: !!values.mail,
    }

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDTO),
      })

      if (response.ok) {
        console.log('Success:', userDTO)
        router.push('/workspace')
      } else {
        console.error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center font-pretendard">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[380px] flex-shrink-0 flex-col items-start gap-[36px]"
        >
          <div className="flex flex-col items-center justify-center gap-[8px] self-stretch">
            <p className="text-center text-[20px] font-semibold leading-[28px] tracking-[-0.1px]">
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
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
                  <FormLabel className="text-[16px]">이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이름"
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value)
                      }}
                    />
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
                checked={isAllChecked}
                onCheckedChange={onCheckAll}
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
              <FormField
                control={form.control}
                name="use"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <div className="flex items-start gap-[8px]">
                        <Checkbox
                          id="use"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          // className="w-[14px] h-[14px] rounded-[2px] border border-gray-200"
                        />
                        <label
                          htmlFor="use"
                          className="text-[14px] font-medium leading-[14px] text-gray-500"
                        >
                          <span className="text-blue-500 underline">
                            이용약관
                          </span>{' '}
                          동의 (필수)
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <div className="flex items-start gap-[8px]">
                        <Checkbox
                          id="privacy"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          // className="w-[14px] h-[14px] rounded-[2px] border border-gray-200"
                        />
                        <label
                          htmlFor="privacy"
                          className="font-medium- text-[14px] leading-[14px] text-gray-500"
                        >
                          <span className="text-blue-500 underline">
                            개인정보 수집
                          </span>{' '}
                          이용 동의 (필수)
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <div className="flex items-start gap-[8px]">
                        <Checkbox
                          id="mail"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          // className="w-[14px] h-[14px] rounded-[2px] border border-gray-200"
                        />
                        <label
                          htmlFor="mail"
                          className="font-medium- text-[14px] leading-[14px] text-gray-500"
                        >
                          마케팅 메일 수신 동의 (선택)
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            // disabled={isSubmitDisabled}
            className="flex w-full items-center justify-center gap-[18px] bg-blue-600 px-[16px] py-[8px] hover:bg-blue-500"
          >
            <p className="text-[14px] font-normal leading-[24px]">회원가입</p>
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default JoinForm
