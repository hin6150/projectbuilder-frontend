'use client'
import * as React from 'react'

import { useForm } from 'react-hook-form'
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

interface Entry {
  tool: string
  email: string
}

const mbtiOptions = [
  { value: 'ISTJ', label: 'ISTJ' },
  { value: 'ISFJ', label: 'ISFJ' },
  { value: 'INFJ', label: 'INFJ' },
  { value: 'INTJ', label: 'INTJ' },
  { value: 'ISTP', label: 'ISTP' },
  { value: 'ISFP', label: 'ISFP' },
  { value: 'INFP', label: 'INFP' },
  { value: 'INTP', label: 'INTP' },
  { value: 'ESTP', label: 'ESTP' },
  { value: 'ESFP', label: 'ESFP' },
  { value: 'ENFP', label: 'ENFP' },
  { value: 'ENTP', label: 'ENTP' },
  { value: 'ESTJ', label: 'ESTJ' },
  { value: 'ESFJ', label: 'ESFJ' },
  { value: 'ENFJ', label: 'ENFJ' },
  { value: 'ENTJ', label: 'ENTJ' },
]

const optionalInfo: React.FC = () => {
  const form = useForm()
  const [addTool, setAddTool] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [entries, setEntries] = React.useState<Entry[]>([])
  const [techStack, setTechStack] = React.useState<string>('')
  const [stackArray, setStackArray] = React.useState<string[]>([])
  const [mbtiOpen, setMbtiOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>('')

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

  const handleAddTechStack = () => {
    if (techStack.trim() !== '') {
      const newStackArray = [
        ...stackArray,
        ...techStack.split(',').map((stack) => stack.trim()),
      ]
      setStackArray(newStackArray)
      setTechStack('')
    }
  }

  async function onSubmit() {}

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
              <FormLabel htmlFor="region">거주지역</FormLabel>
              <div className="flex items-start gap-[8px] self-stretch">
                <Input placeholder="거주지역" name="region" />
                <Button
                  type="submit"
                  className="bg-blue-200 hover:bg-blue-100 text-blue-600"
                >
                  검색하기
                </Button>
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

            <div className="flex justify-end itmes-center gap-[8px] self-stretch">
              <Button className="bg-white hover:bg-gray-100 text-gray-400">
                건너뛰기
              </Button>
              <Button
                onClick={handleAddTechStack}
                className="bg-blue-600 hover:bg-blue-500"
              >
                입력하기
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default optionalInfo
