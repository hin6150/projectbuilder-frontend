'use client'

import { mbtiOptions } from '@/api/services/user/model'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { CommandList } from 'cmdk'
import {
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronsUpDown,
  XIcon,
} from 'lucide-react'
import * as React from 'react'
import { z } from 'zod'

import { toolList } from '@/api/services/user/model'
import { getInitials } from '@/components/Avatar/Avatar'
import { Icon } from '@/components/Icon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useModal } from '@/hooks/useModal'
import { ModalTypes } from '@/hooks/useModal/useModal'
import { formatPhoneNumber } from '@/hooks/useVaild'
import { format, getDay } from 'date-fns'
import { UseFormReturn } from 'react-hook-form'
import { Calendar } from '../ui/calendar'
import { Checkbox } from '../ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Textarea } from '../ui/textarea'
import { TimePickerDemo } from '../TimePicker/time-picker-demo'

interface entry {
  tool: string
  email: string
}

interface participate {
  imageUrl: string
  name: string
  email: string
  attend: string
}

interface formType {
  form: UseFormReturn<z.infer<any>>
}

interface defaultFormType {
  form: UseFormReturn<z.infer<any>>
  name: string
  label: string
  [key: string]: any
}

interface checkBoxFormType {
  form: UseFormReturn<z.infer<any>>
  name: 'use' | 'privacy' | 'marketing'
}

interface avatarFormType {
  form: UseFormReturn<z.infer<any>>
  imageUrl: string
  setImageUrl: React.Dispatch<React.SetStateAction<string>>
}

interface infoFormType {
  form: UseFormReturn<z.infer<any>>
  entries: entry[]
  setEntries: React.Dispatch<React.SetStateAction<entry[]>>
}

interface mbtiFormType {
  form: UseFormReturn<z.infer<any>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

interface cycleFormType {
  form: UseFormReturn<z.infer<any>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

interface repeatFormType {
  form: UseFormReturn<z.infer<any>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

interface publicFormType {
  form: UseFormReturn<z.infer<any>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

type Participant = {
  name: string
  email: string
}

interface participateFormType {
  form: UseFormReturn<z.infer<any>>
  participates: Participant[]
  setParticipates: React.Dispatch<React.SetStateAction<Participant[]>>
}

interface scheduleTypeFormType {
  form: UseFormReturn<z.infer<any>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

interface repeatDayFormType {
  form: UseFormReturn<z.infer<any>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const ToolInfoForm = ({ form, entries, setEntries }: infoFormType) => {
  const [addTool, setAddTool] = React.useState<string>('')
  const [toolEmail, setToolEmail] = React.useState<string>('')

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

  return (
    <FormField
      control={form.control}
      name="entries"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
          <FormLabel className="text-p">기타 정보</FormLabel>
          <div className="inline-flex items-start gap-[10px]">
            <FormControl>
              <Select value={addTool} onValueChange={setAddTool}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="협업 툴" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {toolList.map((tool) => {
                      return (
                        <SelectItem value={tool} key={tool}>
                          {tool}
                        </SelectItem>
                      )
                    })}
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
              variant={!addTool || !toolEmail ? 'disabled' : 'secondary'}
              disabled={!addTool || !toolEmail}
            >
              추가
            </Button>
          </div>
          <div className="w-full">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="flex h-[32px] w-full items-center gap-[8px] self-stretch px-[8px] py-[6px]"
              >
                <Icon name="mail" />
                <span className="flex-1 text-subtle text-slate-900">
                  {entry.email}
                </span>
                <span className="text-detail text-slate-500">{entry.tool}</span>
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
  )
}

export const MBITInfoForm = ({ form, value, setValue }: mbtiFormType) => {
  const [mbtiOpen, setMbtiOpen] = React.useState<boolean>(false)

  return (
    <FormField
      control={form.control}
      name="MBTI"
      render={() => (
        <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
          <FormLabel className="text-p">MBTI</FormLabel>
          <Popover open={mbtiOpen} onOpenChange={setMbtiOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={mbtiOpen}
                className="w-full justify-between border-slate-300"
              >
                {value
                  ? mbtiOptions.find((mbtiOption) => mbtiOption.value === value)
                      ?.label
                  : 'MBTI'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[200px] w-[380px] overflow-y-auto">
              <Command>
                <CommandInput placeholder="MBTI" />
                <CommandList>
                  <CommandEmpty>검색한 MBTI가 존재하지 않습니다.</CommandEmpty>
                  <CommandGroup>
                    {mbtiOptions.map((mbtiOption) => (
                      <CommandItem
                        key={mbtiOption.value}
                        value={mbtiOption.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue)
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
  )
}

export const AddressInfoForm = ({ form }: formType) => (
  <FormField
    control={form.control}
    name="address"
    render={({ field }) => (
      <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
        <FormLabel className="text-p">거주지역</FormLabel>
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
)

export const PhoneInfoForm = ({ form }: formType) => (
  <FormField
    control={form.control}
    name="phonenumber"
    render={({ field }) => (
      <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
        <FormLabel className="text-p">전화번호</FormLabel>
        <FormControl>
          <Input
            placeholder="전화번호"
            value={formatPhoneNumber(field.value)}
            onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const AvatarInfoForm = ({
  form,
  imageUrl,
  setImageUrl,
}: avatarFormType) => {
  const [icon, setIcon] = React.useState<'camera' | 'cancel'>(() =>
    imageUrl ? 'cancel' : 'camera',
  )

  React.useEffect(() => {
    setIcon(imageUrl ? 'cancel' : 'camera')
  }, [imageUrl])

  const fileInputRef = React.useRef<HTMLInputElement>(null)

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

  return (
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
          <div className="w-full">
            <DefaultInputForm form={form} name="name" label="이름" />
          </div>
        </FormItem>
      )}
    />
  )
}

export const DefaultInputForm = ({
  form,
  name,
  label,
  ...rest
}: defaultFormType) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
        <FormLabel className="text-p">{label}</FormLabel>
        <FormControl className="flex items-start gap-[8px] self-stretch">
          <Input placeholder={label} {...rest} {...field} />
        </FormControl>
      </FormItem>
    )}
  />
)

export const DatePickerInfoForm = ({
  form,
  name,
  label,
  ...rest
}: defaultFormType) => {
  const formatDate = (date: Date) => {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][getDay(date)]
    return `${format(date, 'yyyy.MM.dd')} (${dayOfWeek})`
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
          <FormLabel className="text-p">{label}</FormLabel>
          <FormControl className="flex items-start gap-[8px] self-stretch">
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  {...rest}
                  {...field}
                  value={
                    field.value?.from
                      ? field.value.to
                        ? `${formatDate(field.value.from)} ~ ${formatDate(field.value.to)}`
                        : formatDate(field.value.from).toString()
                      : ''
                  }
                  readOnly
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  // disabled={(date) => date <= new Date()}
                  selected={field.value}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export const TextAreaForm = ({
  form,
  name,
  label,
  ...rest
}: defaultFormType) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
        <FormLabel className="text-p">{label}</FormLabel>
        <FormControl className="flex items-start gap-[8px] self-stretch">
          <div className="grid w-full gap-2">
            <Textarea
              placeholder={label}
              {...rest}
              {...field}
              className="resize-none border border-gray-300 placeholder:text-gray-400"
            />
            <p className="text-right text-subtle">
              <span className="text-black">
                {field.value ? field.value.length : 0}
              </span>
              <span className="text-gray-400"> / 100</span>
            </p>
          </div>
        </FormControl>
      </FormItem>
    )}
  />
)

export const CheckBoxForm = ({ form, name }: checkBoxFormType) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel />
        <FormControl>
          <div className="flex items-start gap-[8px]">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={name} className="text-small text-gray-500">
              {name === 'marketing' ? (
                '마케팅 메일 수신 동의 (선택)'
              ) : (
                <>
                  <span className="text-blue-500 underline">
                    {name === 'use' ? '이용약관' : '개인정보'}
                  </span>
                  {name === 'use' ? ' 동의 (필수)' : ' 이용 동의 (필수)'}
                </>
              )}
            </label>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const CycleForm = ({ form, value, setValue }: cycleFormType) => {
  const [cycle, setCycle] = React.useState<string>('')
  const cycleList = ['일(Day)', '주(Week)', '월(Month)', '년(Year)']

  return (
    <FormField
      control={form.control}
      name="cycle"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select value={cycle} onValueChange={setCycle}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="주(Week)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cycleList.map((cycle) => {
                    return (
                      <SelectItem value={cycle} key={cycle}>
                        {cycle}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    ></FormField>
  )
}

export const RepeatForm = ({ form, value, setValue }: repeatFormType) => {
  const [repeat, setRepeat] = React.useState<string>('')
  const repeatList = ['매일', '매주', '매월', '반복 안함', '맞춤 설정']

  const { openModal } = useModal()

  const handleSelect = (selectedRepeat: string) => {
    setRepeat(selectedRepeat)
    setValue(selectedRepeat)

    if (selectedRepeat === '맞춤 설정') {
      openModal('dimed', ModalTypes.REPEAT)
    }
  }

  return (
    <FormField
      control={form.control}
      name="repeat"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <p className="text-small">{repeat || '반복 안함'}</p>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="text-center">
                <DropdownMenuLabel>반복 여부</DropdownMenuLabel>
                {repeatList.map((item, index) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleSelect(item)}
                    >
                      {item}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export const PublicForm = ({ form, value, setValue }: publicFormType) => {
  const [publicContent, setPublicContent] = React.useState<string>('')
  const publicList = ['내용 비공개', '공개']

  const handleSelect = (selectedPublic: string) => {
    setPublicContent(selectedPublic)
    setValue(selectedPublic)
  }

  return (
    <FormField
      control={form.control}
      name="repeat"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <p className="text-small">{publicContent || '내용 비공개'}</p>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="text-center">
                <DropdownMenuLabel>반복 여부</DropdownMenuLabel>
                {publicList.map((item, index) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleSelect(item)}
                    >
                      {item}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export const ScheduleTypeForm = ({
  form,
  value,
  setValue,
}: scheduleTypeFormType) => {
  const [type, setType] = React.useState<string>('')
  const typeList = ['개인 일정', '팀 일정']

  const handleSelect = (selectedType: string) => {
    setType(selectedType)
    setValue(selectedType)
  }

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <p className="text-small">{type || '개인 일정'}</p>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="text-center">
                <DropdownMenuLabel>반복 여부</DropdownMenuLabel>
                {typeList.map((item, index) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleSelect(item)}
                    >
                      {item}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export const RepeatDayForm = ({ form, value, setValue }: repeatDayFormType) => {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const [selectedDays, setSelectedDays] = React.useState<string[]>(['일'])

  const handleClick = (day: string) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day)
      } else {
        return [...prevSelectedDays, day]
      }
    })
  }
  return (
    <FormField
      control={form.control}
      name="day"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start gap-2 self-stretch">
          <FormLabel className="text-p">반복 요일</FormLabel>
          <FormControl>
            <div className="flex items-start justify-between self-stretch px-4 py-2">
              {days.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      handleClick(item)
                    }}
                    className={`flex h-[36px] w-[36px] cursor-pointer items-center justify-center px-[10px] py-1 text-large text-gray-400 ${selectedDays.includes(item) ? 'h-[36px] w-[36px] rounded-full bg-black text-white' : ''}`}
                  >
                    {item}
                  </span>
                )
              })}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export const ParticipateForm = ({
  form,
  participates,
  setParticipates,
}: participateFormType) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [filteredParticipates, setFilteredParticipates] =
    React.useState<Participant[]>(participates)

  const filterParticipates = (
    query: string,
    participates: Participant[],
  ): Participant[] => {
    return participates.filter(
      (participant) =>
        participant.name.toLowerCase().includes(query.toLowerCase()) ||
        participant.email.toLowerCase().includes(query.toLowerCase()),
    )
  }

  const participateSchema = z.object({
    name: z.string(),
    image: z.string(),
    attend: z.string(),
  })

  // 검색어 또는 참여자 목록이 변경될 때 필터링된 참여자 목록을 업데이트
  React.useEffect(() => {
    setFilteredParticipates(filterParticipates(searchQuery, participates))
  }, [searchQuery, participates])

  return (
    <FormField
      control={form.control}
      name="participates"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
          <FormLabel>참가자</FormLabel>
          <FormControl>
            <Input placeholder="@이름, 이메일로 추가" {...field} />
          </FormControl>
        </FormItem>
      )}
    ></FormField>
  )
}

export const EndDateForm = ({
  form,
  name,
  label,
  ...rest
}: defaultFormType) => {
  const formatDate = (date: Date) => {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][getDay(date)]
    return `${format(date, 'yyyy.MM.dd')} (${dayOfWeek})`
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
          <FormLabel className="text-p">{label}</FormLabel>
          <FormControl className="flex items-start gap-[8px] self-stretch">
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  {...rest}
                  {...field}
                  value={
                    field.value ? formatDate(new Date(field.value)) : '없음'
                  }
                  readOnly
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  disabled={(date) => date <= new Date()}
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={field.onChange}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export function DateTimePickerForm({
  form,
  name,
  label,
  ...rest
}: defaultFormType) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined)

  const formatDate = (
    date: Date,
    start: Date | undefined,
    end: Date | undefined,
  ) => {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][getDay(date)]
    const datePart = `${format(date, 'yyyy.MM.dd')} (${dayOfWeek})`

    const formattedStartTime = start ? format(start, 'a h:mm') : ''
    const formattedEndTime = end ? format(end, 'a h:mm') : ''

    return formattedStartTime && formattedEndTime
      ? `${datePart} ${formattedStartTime} ~ ${formattedEndTime}`
      : formattedStartTime || formattedEndTime
        ? `${datePart} ${formattedStartTime || formattedEndTime}`
        : datePart
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start gap-[6px] self-stretch">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  placeholder="일정 시간"
                  className="text-left"
                  {...rest}
                  {...field}
                  value={
                    field.value
                      ? formatDate(new Date(field.value), startDate, endDate)
                      : '일정 시간'
                  }
                  readOnly
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate)
                    field.onChange(selectedDate)
                  }}
                  initialFocus
                />
                <div className="border-t border-border p-3">
                  <TimePickerDemo
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
