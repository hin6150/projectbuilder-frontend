'use client'
import * as React from 'react'

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormItem, FormLabel } from '@/components/ui/form'
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
import { ProfileAvatar } from '@/components/Avatar/Avatar'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/Icon'
import { UserInfoResponse } from '@/api'
interface FormData {
  id: string
  name: string
  phone: string
  address: string
  entries: { tool: string; email: string }[]
  techStack: string
  mbti: string
}

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

const profileEdit: React.FC = () => {
  const form = useForm<FormData>()
  const router = useRouter()
  const [addTool, setAddTool] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [name, setName] = React.useState<string>('')
  const [phone, setPhone] = React.useState<string>('')
  const [address, setAddress] = React.useState<string>('')
  const [toolEmail, setToolEmail] = React.useState<string>('')
  const [entries, setEntries] = React.useState<
    { tool: string; email: string }[]
  >([])
  const [techStack, setTechStack] = React.useState<string>('')
  const [mbtiOpen, setMbtiOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>('')
  const [imageUrl, setImageUrl] = React.useState<string>(
    'https://avatars.githubusercontent.com/u/145416041?v=4',
  )
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const icon = imageUrl ? 'cancel' : 'camera'

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (addTool && toolEmail) {
      setEntries([...entries, { tool: addTool, email: toolEmail }])
      setAddTool('')
      setToolEmail('')
    }
  }
  const handleRemove = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index))
  }

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/UserInfo`,
        )
        const data: UserInfoResponse = await response.json()

        setEmail(data.result.email)
        setName(data.result.name)
        setPhone(data.result.phone)
        setAddress(data.result.address)
        setEntries(
          Object.entries(data.result.tool).map(([tool, email]) => ({
            tool,
            email: email as string,
          })),
        )
        setTechStack(data.result.stack.join(', '))
        setValue(data.result.MBTI)
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const userInfo: UserInfoResponse = {
      name: name,
      tool: Object.fromEntries(
        entries.map((entry) => [entry.tool, entry.email]),
      ),
      phone: phone,
      address: address,
      stack: techStack.split(',').map((stack) => stack.trim()),
      MBTI: value,
    }

    try {
      const response = await fetch('/user/edit', {
        method: 'POST',
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
            <FormItem className="flex flex-col items-start gap-[6px] self-stretch opacity-50">
              <FormLabel>로그인 계정</FormLabel>
              <div className="flex items-start gap-[8px] self-stretch">
                <Input value={email} disabled={true} />
              </div>
            </FormItem>
            <FormItem className="flex items-center justify-center gap-[10px] self-stretch">
              <div className="relative">
                <ProfileAvatar
                  imageUrl={imageUrl}
                  name={name}
                  width="70px"
                  height="70px"
                />
                <Icon
                  name={icon}
                  className="absolute right-0 top-0 cursor-pointer"
                  onClick={() => handleIconClick}
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className="flex w-[300px] flex-col items-start gap-[6px]">
                <FormLabel>이름</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                />
              </div>
            </FormItem>
            <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
              <FormLabel>기타 정보</FormLabel>
              <div className="inline-flex items-start gap-[10px]">
                <Select value={addTool} onValueChange={setAddTool}>
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

                <Input
                  placeholder="계정 이메일"
                  value={toolEmail}
                  onChange={(e) => setToolEmail(e.target.value)}
                />
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
                    <Icon name="cancel" onClick={() => handleRemove(index)} />
                  </div>
                ))}
              </div>
            </FormItem>
            <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
              <FormLabel>전화번호</FormLabel>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="전화번호"
              />
            </FormItem>
            <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
              <FormLabel>거주지역</FormLabel>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="거주지역"
              />
            </FormItem>
            <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
              <FormLabel>기술 스택(쉼표로 구분)</FormLabel>
              <Input
                placeholder="기술스택"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
              />
            </FormItem>

            <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
              <FormLabel>MBTI</FormLabel>
              <Popover open={mbtiOpen} onOpenChange={setMbtiOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={mbtiOpen}
                    className="w-full justify-between border-slate-300"
                  >
                    {value
                      ? mbtiOptions.find(
                          (mbtiOption) => mbtiOption.value === value,
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

            <div className="itmes-center flex justify-end gap-[8px] self-stretch">
              <Button
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
