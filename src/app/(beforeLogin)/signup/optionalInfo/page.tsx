'use client'
import * as React from 'react'
import { Check, ChevronsUpDown, Mail, X } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { UserInfoResponse } from '@/api'
import { Icon } from '@/components/Icon'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
  address: z.string(),
  stack: z.string(),
  MBTI: z.string(),
  entries: z.array(
    z.object({
      tool: z.string(),
      email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
    }),
  ),
})

const page: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      entries: [],
      stack: '',
      MBTI: '',
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
  const [address, setAddress] = React.useState<string>('')

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const entrySchema = z.object({
      tool: z.string().nonempty({ message: '협업 툴을 선택하세요.' }),
      email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
    })

    const result = entrySchema.safeParse({ tool: addTool, email })

    if (result.success) {
      setEntries([...entries, { tool: addTool, email }])
      setAddTool('')
      setEmail('')
    } else {
      result.error.errors.forEach((error) => {
        alert(error.message)
      })
    }
  }

  const handleRemove = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index))
  }

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const userInfo: UserInfoResponse = {
      tool: Object.fromEntries(
        entries.map((entry) => [entry.tool, entry.email]),
      ),
      address: data.address,
      stack: data.stack
        .split(',')
        .map((stack) => stack.trim())
        .filter((stack) => stack !== ''),
      MBTI: value,
    }

    try {
      const response = await fetch('/signup/optionalInfo', {
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
    <div className="flex w-screen items-center justify-center py-[12rem] font-pretendard">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[380px] flex-shrink-0 flex-col items-start gap-[24px]"
        >
          <div className="flex flex-col items-center justify-center gap-[8px] self-stretch">
            <p className="text-center text-[20px] font-semibold leading-[28px] tracking-[-0.1px]">
              선택 정보
            </p>
          </div>
          <div className="flex flex-col items-start gap-[16px] self-stretch">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
                  <FormLabel className="text-[16px]">거주지역</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="거주지역"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
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
                    </FormControl>
                    <FormControl>
                      <Input
                        placeholder="계정 이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                    <Button
                      onClick={handleAdd}
                      disabled={!addTool || !email}
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
              name="stack"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
                  <FormLabel className="text-[16px]">
                    기술 스택(쉼표로 구분)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="기술스택"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
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
              )}
            />
            <div className="flex items-center justify-end gap-[8px] self-stretch">
              <Button
                type="button"
                onClick={() => router.push('/workspace')}
                className="bg-white text-gray-400 hover:bg-gray-100"
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
