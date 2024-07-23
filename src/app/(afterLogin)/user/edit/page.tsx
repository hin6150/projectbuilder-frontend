'use client'
import * as React from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CommandList } from 'cmdk'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/Icon'
import { UserInfoResponse } from '@/api'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

const mbtiOptions = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
].map((value) => ({ value, label: value }))

const formSchema = z.object({
  name: z.string().min(2, {
    message: '이름은 2글자 이상이어야 합니다.',
  }),
  email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
  phonenumber: z.string().refine(
    (value) => {
      const phoneNumber = value.replace(/-/g, '')
      return /^01[0-9]\d{7,8}$/.test(phoneNumber)
    },
    {
      message: '올바른 전화번호를 입력해주세요.',
    },
  ),
  address: z.string(),
  stack: z.string(),
  MBTI: z.string(),
  entries: z.array(
    z.object({
      tool: z.string(),
      email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
    }),
  ),
  imageUrl: z.string().optional(),
})

const profileEdit: React.FC = () => {
  const router = useRouter()
  const [addTool, setAddTool] = React.useState<string>('')
  const [name, setName] = React.useState<string>('')
  const [toolEmail, setToolEmail] = React.useState<string>('')
  const [entries, setEntries] = React.useState<
    { tool: string; email: string }[]
  >([])
  const [mbtiOpen, setMbtiOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>('')
  const [imageUrl, setImageUrl] = React.useState<string>('')
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [icon, setIcon] = React.useState<'camera' | 'cancel'>(() =>
    imageUrl ? 'cancel' : 'camera',
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: 'hin6150@gmail.com',
      phonenumber: '',
      address: '',
      stack: '',
      MBTI: '',
      entries: [],
      imageUrl: '',
    },
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

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const entrySchema = z.object({
      tool: z.string().nonempty({ message: '협업 툴을 선택하세요.' }),
      email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
    })

    const result = entrySchema.safeParse({ tool: addTool, email: toolEmail })

    if (result.success) {
      setEntries([...entries, { tool: addTool, email: toolEmail }])
      setAddTool('')
      setToolEmail('')
    } else {
      result.error.errors.forEach((error) => {
        alert(error.message)
      })
    }
  }

  const handleRemove = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index))
  }

  const handleIconClick = () => {
    if (icon == 'camera') {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    } else if (icon == 'cancel') {
      setImageUrl('')
      setIcon('camera')
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
        setIcon('cancel')
      }
      reader.readAsDataURL(file)
    }
  }

  const getInitials = (name: string) => {
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/

    if (isKorean.test(name)) {
      const nameLength = name.length
      if (nameLength >= 3) {
        return name.slice(-2)
      }
      return name
    } else {
      const initials = name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
      return initials
    }
  }

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/UserInfo`,
        )
        const data: UserInfoResponse = await response.json()

        form.setValue('email', data.result.email)
        form.setValue('name', data.result.name)
        form.setValue('phonenumber', data.result.phone)
        form.setValue('address', data.result.address)
        setEntries(
          Object.entries(data.result.tool).map(([tool, email]) => ({
            tool,
            email: email as string,
          })),
        )
        form.setValue('stack', data.result.stack.join(', '))
        form.setValue('MBTI', data.result.MBTI)
        setImageUrl(data.result.imageUrl || '')
        setIcon(data.result.imageUrl ? 'cancel' : 'camera')
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values,
  ) => {
    const userInfo: UserInfoResponse = {
      name: values.name,
      tool: Object.fromEntries(
        entries.map((entry) => [entry.tool, entry.email]),
      ),
      phone: values.phonenumber,
      address: values.address,
      stack: values.stack
        .split(',')
        .map((stack) => stack.trim())
        .filter((stack) => stack !== ''),
      MBTI: values.MBTI,
      imageUrl: imageUrl,
    }

    try {
      const response = await fetch('/user/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      })

      if (response.ok) {
        console.log('Success:', userInfo)
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
          className="flex w-[380px] flex-col items-start gap-[24px]"
        >
          <div className="flex flex-col items-center justify-center gap-[8px] self-stretch">
            <p className="text-center text-[20px] font-semibold leading-[28px] tracking-[-0.1px]">
              프로필 정보
            </p>
          </div>
          <div className="flex flex-col items-start gap-[16px] self-stretch">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch opacity-50">
                  <FormLabel className="text-[16px]">로그인 계정</FormLabel>
                  <FormControl className="flex items-start gap-[8px] self-stretch">
                    <Input value={field.value} disabled={true} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-[10px] self-stretch">
                  <div className="relative">
                    <Avatar className="h-[90px] w-[90px] items-center justify-center overflow-hidden bg-slate-100">
                      <AvatarImage
                        src={imageUrl ?? ''}
                        alt="프로필 이미지"
                        className="h-full w-full object-cover"
                      />
                      <AvatarFallback>
                        {imageUrl ? '' : getInitials(form.getValues('name'))}
                      </AvatarFallback>
                    </Avatar>
                    <Icon
                      name={icon}
                      className="absolute right-1 top-1 cursor-pointer"
                      onClick={handleIconClick}
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <FormItem className="flex w-[300px] flex-col items-start gap-[6px]">
                    <FormLabel className="text-[16px]">이름</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="이름"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entries"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
                  <FormLabel className="text-[16px]">기타 정보</FormLabel>
                  <div className="inline-flex items-start gap-[10px]">
                    <FormControl>
                      <Select
                        value={addTool}
                        onValueChange={(value: string) => setAddTool(value)}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="협업 툴" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Github">Github</SelectItem>
                            <SelectItem value="Figma">Figma</SelectItem>
                            <SelectItem value="Notion">Notion</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <Input
                        placeholder="계정 이메일"
                        value={toolEmail}
                        onChange={(e) => {
                          setToolEmail(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    <Button
                      onClick={handleAdd}
                      disabled={!addTool || !toolEmail}
                      className="bg-blue-200 text-blue-600 hover:bg-blue-100"
                    >
                      추가
                    </Button>
                  </div>
                  <div>
                    {entries.map((entry, index) => (
                      <div
                        key={index}
                        className="flex h-[32px] items-center gap-[8px] self-stretch px-[8px] py-[6px]"
                      >
                        <Icon name="mail" />
                        <span className="w-[269px] flex-1 text-[14px] font-normal leading-[20px] text-slate-900">
                          {entry.email}
                        </span>
                        <span className="w-[39px] text-[12px] font-medium leading-[20px] text-slate-500">
                          {entry.tool}
                        </span>
                        <Icon
                          name="cancel"
                          onClick={() => handleRemove(index)}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
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
                      value={formatPhoneNumber(field.value)}
                      onChange={(e) =>
                        field.onChange(formatPhoneNumber(e.target.value))
                      }
                      placeholder="전화번호"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
                  <FormLabel className="text-[16px]">거주지역</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="거주지역"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stack"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
                  <FormLabel>기술 스택(쉼표로 구분)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="기술스택"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MBTI"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
                  <FormLabel className="text-[16px]">MBTI</FormLabel>
                  <Popover open={mbtiOpen} onOpenChange={setMbtiOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={mbtiOpen}
                        className="w-full justify-between border-slate-300"
                      >
                        {field.value
                          ? mbtiOptions.find(
                              (mbtiOption) => mbtiOption.value === field.value,
                            )?.label
                          : 'MBTI'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="max-h-[200px] w-[380px] overflow-y-auto">
                      <Command>
                        <CommandInput placeholder="MBTI" />
                        <CommandList>
                          <CommandEmpty>
                            검색한 MBTI가 존재하지 않습니다.
                          </CommandEmpty>
                          <CommandGroup>
                            {mbtiOptions.map((mbtiOption) => (
                              <CommandItem
                                key={mbtiOption.value}
                                value={mbtiOption.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? '' : currentValue,
                                  )
                                  setMbtiOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    value === mbtiOption.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {mbtiOption.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <div className="itmes-center flex justify-end gap-[8px] self-stretch">
              <Button
                type="button"
                onClick={() => router.push('/workspace')}
                className="bg-white text-gray-400 hover:bg-gray-100"
              >
                취소하기
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                수정하기
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default profileEdit
