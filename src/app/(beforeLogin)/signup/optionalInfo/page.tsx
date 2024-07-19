'use client'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form'
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

interface FormData {
  region: string
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

const page: React.FC = () => {
  const form = useForm<FormData>({
    defaultValues: {
      region: '',
      entries: [],
      techStack: '',
      mbti: '',
    },
  })

  const router = useRouter()
  const [addTool, setAddTool] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [entries, setEntries] = React.useState<
    { tool: string; email: string }[]
  >([])
  const [techStack, setTechStack] = React.useState<string>('')
  const [mbtiOpen, setMbtiOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>('')
  const [region, setRegion] = React.useState<string>('')

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (addTool && email) {
      setEntries([...entries, { tool: addTool, email }])
      setAddTool('')
      setEmail('')
    }
  }

  const handleRemove = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index))
  }

  React.useEffect(() => {
    form.setValue('entries', entries)
  }, [entries, form])

  React.useEffect(() => {
    form.setValue('mbti', value)
  }, [value, form])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const techStackArray = techStack.split(',').map((stack) => stack.trim())

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          techStack: techStackArray.join(','),
        }),
      })

      if (!response.ok) {
        throw new Error('데이터 저장 실패')
      }

      router.push('/workspace')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex w-full py-[310px] justify-center items-center font-pretendard">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[380px] flex-col items-start gap-[24px] flex-shrink-0"
        >
          <div className="flex flex-col justify-center items-center gap-[8px] self-stretch">
            <p className="text-[20px] text-center font-semibold leading-[28px] tracking-[-0.1px]">
              선택 정보
            </p>
          </div>
          <div className="flex flex-col items-start gap-[16px] self-stretch">
            <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
              <FormLabel className="text-[16px]">거주지역</FormLabel>
              <Input
                placeholder="거주지역"
                name="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </FormItem>

            <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
              <FormLabel className="text-[16px]">기타 정보</FormLabel>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={handleAdd}
                  className="bg-blue-200 hover:bg-blue-100 text-blue-600"
                >
                  추가
                </Button>
              </div>
              <div>
                {entries.map((entry, index) => (
                  <div
                    key={index}
                    className="flex h-[32px] px-[8px] py-[6px] items-center gap-[8px] self-stretch"
                  >
                    <Image
                      src="/mail.png"
                      alt="메일 이미지"
                      width={17}
                      height={17}
                    />
                    <span className="flex-1 w-[269px] text-slate-900 text-[14px] font-normal leading-[20px]">
                      {entry.email}
                    </span>
                    <span className="w-[39px] text-slate-500 text-[12px] font-medium leading-[20px]">
                      {entry.tool}
                    </span>
                    <Image
                      src="/secondary.png"
                      alt="X"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                      onClick={() => handleRemove(index)}
                    />
                  </div>
                ))}
              </div>
            </FormItem>

            <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
              <FormLabel className="text-[16px]">
                기술 스택(쉼표로 구분)
              </FormLabel>
              <Input
                placeholder="기술스택"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
              />
            </FormItem>

            <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
              <FormLabel className="text-[16px]">MBTI</FormLabel>
              <Popover open={mbtiOpen} onOpenChange={setMbtiOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={mbtiOpen}
                    className="w-full justify-between"
                  >
                    {value
                      ? mbtiOptions.find(
                          (mbtiOption) => mbtiOption.value === value,
                        )?.label
                      : 'MBTI'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] max-h-[200px] overflow-y-auto">
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

            <div className="flex justify-end items-center gap-[8px] self-stretch">
              <Button
                onClick={() => router.push('/workspace')}
                className="bg-white hover:bg-gray-100 text-gray-400"
              >
                건너뛰기
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                입력하기
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default page
