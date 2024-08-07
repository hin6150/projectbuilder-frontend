'use client'
import { useModal } from '@/hooks/useModal'
import { ModalTypes } from '@/hooks/useModal/useModal'
import {
  formSchemaCheckSchedule,
  formSchemaPersonalSchedule,
  formSchemaRepeatSchedule,
  formSchemaTeamSchedule,
} from '@/hooks/useVaild'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CalendarIcon,
  LockIcon,
  PencilIcon,
  RepeatIcon,
  Trash2Icon,
} from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  DefaultInputForm,
  TextAreaForm,
  DateTimePickerForm,
  EndDateForm,
  ParticipateForm,
  RepeatDayForm,
  DropdownForm,
  SelectForm,
} from '../InputForm'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Form } from '../ui/form'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Modal, ScheduleModal } from './Modal'
import { ProfileAvatar } from '../Avatar/Avatar'
import { Input } from '../ui/input'

interface Participate {
  imageUrl: string
  name: string
  email: string
  attend: string
}

const getRepeatOptions = (date: Date) => {
  const dayOfWeekNames = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ]
  const dayOfWeek = dayOfWeekNames[date.getDay()]

  const monthDay = date.getDate()
  const month = date.getMonth() + 1

  return [
    '반복 안함',
    '매일',
    `매주 ${dayOfWeek}`,
    `매월 ${monthDay}일`,
    `매년 ${month}월 ${monthDay}일`,
    '맞춤 설정',
  ]
}

export const ScheduleCreateModal = () => {
  const { closeModal, openModal } = useModal()
  const [selectedType, setSelectedType] = React.useState('개인 일정')
  const [allDay, setAllDay] = React.useState(false)
  const [participates, setParticipates] = React.useState<Participate[]>([])
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [selectedEndDate, setSelectedEndDate] = React.useState<
    Date | undefined
  >(undefined)
  const [selectedRepeat, setSelectedRepeat] = React.useState('반복 안함')

  const teamOptions = ['프로젝트 팀A', '프로젝트 팀B', '프로젝트 팀C']
  const repeatOptions = getRepeatOptions(selectedDate)

  const formSchema =
    selectedType === '개인 일정'
      ? formSchemaPersonalSchedule
      : formSchemaTeamSchedule

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '개인 일정',
      title: '',
      period: { from: new Date(), to: new Date() },
      description: '',
      allday: false,
      repeat: '반복 안함',
      publicContent: '내용 비공개',
      team: '',
      participate: [],
      endDate: undefined,
    },
  })
  const selectedPublic = form.watch('publicContent')
  const selectedTeam = form.watch('team')

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setSelectedRepeat('반복 안함')
    setSelectedEndDate(undefined)
    form.setValue('endDate', undefined)
  }

  React.useEffect(() => {
    if (selectedRepeat === '맞춤 설정') {
      form.setValue('period.from', selectedDate)
      console.log('일정시간:', form.getValues('period.from'))
    }
  }, [selectedRepeat, selectedDate, form])

  const onSubmit = () => {
    closeModal('default')
  }

  return (
    <ScheduleModal>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[384px] flex-col gap-4"
        >
          <div className="flex items-center justify-between self-stretch">
            <p className="text-h4">일정 생성</p>
            <div className="flex items-center gap-[6px]">
              <CalendarIcon className="h-4 w-4" />
              <DropdownForm
                form={form}
                value={selectedType}
                options={['개인 일정', '팀 일정']}
                defaultValue="개인 일정"
                label="일정 유형"
                name="type"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <DefaultInputForm form={form} name="title" label="일정 이름" />
            <div className="flex flex-col gap-[6px]">
              <DateTimePickerForm
                form={form}
                name="datetime"
                label="일정 시간"
                allDay={allDay}
                setAllDay={setAllDay}
                setSelectedDate={handleDateChange}
                maxDate={selectedEndDate}
              />
              <div className="flex items-center justify-between self-stretch">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="allday"
                    checked={allDay}
                    onCheckedChange={() => setAllDay(!allDay)}
                  />
                  <label htmlFor="allday" className="text-small">
                    하루 종일
                  </label>
                </div>
                {form.watch('type') === '개인 일정' ? (
                  <div className="flex items-center gap-1">
                    <LockIcon className="h-4 w-4" />
                    <DropdownForm
                      form={form}
                      value={selectedPublic}
                      options={['내용 비공개', '내용 공개']}
                      defaultValue="내용 비공개"
                      label="공개 여부"
                      name="public"
                    />
                  </div>
                ) : (
                  <DropdownForm
                    form={form}
                    value={selectedTeam}
                    options={teamOptions}
                    defaultValue="프로젝트 팀"
                    label="프로젝트 팀"
                    name="team"
                  />
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex w-full flex-col gap-4">
                <Label>반복 여부</Label>
                <SelectForm
                  form={form}
                  value={selectedRepeat}
                  setValue={setSelectedRepeat}
                  options={repeatOptions}
                  defaultValue="반복 안함"
                  name="repeat"
                  className="w-full"
                />
              </div>
              {selectedRepeat !== '반복 안함' && (
                <div className="flex w-full flex-col gap-4">
                  <Label>종료 일자</Label>
                  <EndDateForm
                    form={form}
                    disabled={false}
                    minDate={selectedDate}
                    setSelectedEndDate={setSelectedEndDate}
                  />
                </div>
              )}
            </div>

            {form.watch('type') === '팀 일정' && (
              <ParticipateForm
                form={form}
                participates={participates}
                setParticipates={setParticipates}
              />
            )}
          </div>

          <TextAreaForm form={form} name="description" label="일정 내용" />

          <div className="flex w-full items-start justify-end gap-[12px] self-stretch">
            <Button
              title="취소"
              onClick={() => closeModal('default')}
              className="flex flex-[1_0_0] gap-[10px] bg-blue-100"
            >
              <p className="text-body text-blue-500">취소</p>
            </Button>
            <Button
              title="생성"
              className="flex flex-[1_0_0] gap-[10px]"
              onClick={() => openModal('default', ModalTypes.CHECK)}
              disabled={!form.formState.isValid}
              variant={form.formState.isValid ? 'default' : 'disabled'}
            >
              <p className="text-body">생성</p>
            </Button>
          </div>
        </form>
      </Form>
    </ScheduleModal>
  )
}

export const ScheduleEditModal = () => {
  const { closeModal, openModal } = useModal()
  const [selectedType, setSelectedType] = React.useState('개인 일정')
  const [allDay, setAllDay] = React.useState(false)
  const [participates, setParticipates] = React.useState<Participate[]>([])
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [selectedEndDate, setSelectedEndDate] = React.useState<
    Date | undefined
  >(undefined)
  const [selectedRepeat, setSelectedRepeat] = React.useState('반복 안함')

  const teamOptions = ['프로젝트 팀A', '프로젝트 팀B', '프로젝트 팀C']
  const repeatOptions = getRepeatOptions(selectedDate)

  const formSchema =
    selectedType === '개인 일정'
      ? formSchemaPersonalSchedule
      : formSchemaTeamSchedule

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      title: '',
      period: { from: new Date(), to: new Date() },
      description: '',
      allday: false,
      repeat: '반복 안함',
      publicContent: '내용 비공개',
      team: '',
      participate: [],
      endDate: undefined,
    },
  })

  const onSubmit = () => {
    closeModal('default')
  }

  const selectedPublic = form.watch('publicContent')
  const selectedTeam = form.watch('team')

  return (
    <ScheduleModal>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[384px] flex-col gap-4"
        >
          <div className="flex items-center justify-between self-stretch">
            <p className="text-h4">일정 수정</p>
            <div className="flex items-center gap-[6px]">
              <CalendarIcon className="h-4 w-4" />
              <DropdownForm
                form={form}
                value={selectedType}
                options={['개인 일정', '팀 일정']}
                defaultValue="개인 일정"
                label="일정 유형"
                name="type"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <DefaultInputForm form={form} name="title" label="일정 이름" />
            <div className="flex flex-col gap-[6px]">
              <DateTimePickerForm
                form={form}
                name="datetime"
                label="일정 시간"
                allDay={allDay}
                setAllDay={setAllDay}
                setSelectedDate={setSelectedDate}
                maxDate={selectedEndDate}
              />
              <div className="flex items-center justify-between self-stretch">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="allday"
                    checked={allDay}
                    onCheckedChange={() => setAllDay(!allDay)}
                  />
                  <label htmlFor="allday" className="text-small">
                    하루 종일
                  </label>
                </div>
                {form.watch('type') === '개인 일정' ? (
                  <div className="flex items-center gap-1">
                    <LockIcon className="h-4 w-4" />
                    <DropdownForm
                      form={form}
                      value={selectedPublic}
                      options={['내용 비공개', '내용 공개']}
                      defaultValue="내용 비공개"
                      label="공개 여부"
                      name="public"
                    />
                  </div>
                ) : (
                  <DropdownForm
                    form={form}
                    value={selectedTeam}
                    options={teamOptions}
                    defaultValue="프로젝트 팀"
                    label="프로젝트 팀"
                    name="team"
                  />
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex w-full flex-col gap-4">
                <Label>반복 여부</Label>
                <SelectForm
                  form={form}
                  value={selectedRepeat}
                  setValue={setSelectedRepeat}
                  options={repeatOptions}
                  defaultValue="반복 안함"
                  name="repeat"
                  className="w-full"
                />
              </div>
              {selectedRepeat !== '반복 안함' && (
                <div className="flex w-full flex-col gap-4">
                  <Label>종료 일자</Label>
                  <EndDateForm
                    form={form}
                    disabled={false}
                    minDate={selectedDate}
                    setSelectedEndDate={setSelectedEndDate}
                  />
                </div>
              )}
            </div>

            {form.watch('type') === '팀 일정' && (
              <ParticipateForm
                form={form}
                participates={participates}
                setParticipates={setParticipates}
              />
            )}
          </div>

          <TextAreaForm form={form} name="description" label="일정 내용" />

          <div className="flex w-full items-start justify-end gap-[12px] self-stretch">
            <Button
              title="취소"
              onClick={() => closeModal('default')}
              className="flex flex-[1_0_0] gap-[10px] bg-blue-100"
            >
              <p className="text-body text-blue-500">취소</p>
            </Button>
            <Button
              title="생성"
              className="flex flex-[1_0_0] gap-[10px]"
              onClick={() => openModal('default', ModalTypes.CHECK)}
              disabled={!form.formState.isValid}
              variant={form.formState.isValid ? 'default' : 'disabled'}
            >
              <p className="text-body">수정</p>
            </Button>
          </div>
        </form>
      </Form>
    </ScheduleModal>
  )
}

export const ScheduleCheckModal = () => {
  const { openModal, closeModal } = useModal()

  const form = useForm({
    resolver: zodResolver(formSchemaCheckSchedule),
    defaultValues: {
      type: '팀 일정',
      title: '스크럼 회의',
      period: { from: '2024.08.02 (금) 오후 2:00', to: '오후 2:15' },
      description: '이슈를 공유합시다',
      publicContent: '내용 비공개',
      allday: false,
      repeat: '매주 금요일',
      participate: {
        imageUrl: '',
        name: '홍길동',
        attend: '참석',
      },
      team: ['자기주도 프로젝트'],
    },
  })

  const title = form.watch('title')
  const type = form.watch('type')
  const periodFrom = form.watch('period.from')
  const periodTo = form.watch('period.to')
  const description = form.watch('description')
  const publicContent = form.watch('publicContent')
  const repeat = form.watch('repeat')
  const participate = form.watch('participate')

  const attendClass =
    participate.attend === '참석'
      ? 'text-blue-500'
      : participate.attend === '불참'
        ? 'text-slate-500'
        : 'text-red-500'

  return (
    <ScheduleModal>
      <Form {...form}>
        <form className="flex w-[384px] flex-[1_0_0] flex-col items-start gap-6">
          <div className="flex items-center justify-between self-stretch">
            <p className="text-h4">{title}</p>
            <div className="flex gap-2">
              <PencilIcon
                className="h-6 w-6"
                onClick={() => {
                  openModal('default', ModalTypes.EDIT)
                }}
              />
              <Trash2Icon
                className="h-6 w-6"
                onClick={() => {
                  if (type === '팀 일정') {
                    openModal('dimed', ModalTypes.DELETE_REPEAT)
                  } else {
                    openModal('dimed', ModalTypes.DELETE)
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 self-stretch">
            <p>
              {periodFrom} ~ {periodTo}
            </p>
            <div className="flex items-center justify-between self-stretch">
              <div className="flex w-[88px] items-center gap-2">
                <p className="text-small text-gray-400">{repeat}</p>
                <RepeatIcon className="h-4 w-4" />
              </div>
              <div className="flex items-start gap-2">
                <div className="flex items-center gap-1">
                  <LockIcon className="h-4 w-4" />
                  <span className="text-small">{publicContent}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="text-small">{type}</span>
                </div>
              </div>
            </div>
            {type === '팀 일정' && (
              <div className="flex h-[36px] items-center gap-2 self-stretch px-[8px] py-[6px] text-detail">
                <ProfileAvatar
                  imageUrl={participate.imageUrl}
                  name={participate.name}
                  size="30px"
                />
                <p className="flex-[1_0_0] text-small">{participate.name}</p>
                <p className={`text-detail ${attendClass}`}>
                  {participate.attend}
                </p>
              </div>
            )}
            <p className="text-p">{description}</p>
          </div>

          <Button className="w-full" onClick={() => closeModal('default')}>
            <p>닫기</p>
          </Button>
        </form>
      </Form>
    </ScheduleModal>
  )
}

export const ScheduleRepeatModal = () => {
  const { closeModal } = useModal()
  const [selectedCycle, setSelectedCycle] = React.useState<string>('')
  const [selectedOption, setSelectedOption] = React.useState<string>('none')
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [selecteEndDate, setSelectedEndDate] = React.useState<Date | undefined>(
    new Date(),
  )

  const cycleOptions = ['일(Day)', '주(Week)', '월(Month)', '년(Year)']

  const form = useForm({
    resolver: zodResolver(formSchemaRepeatSchedule),
    defaultValues: {
      period: { from: new Date(), to: new Date() },
      repeat: '1',
      cycle: '',
      day: '',
      endDate: undefined,
    },
  })

  const handleRadioChange = (value: string) => {
    setSelectedOption(value)
  }

  const handleSubmit = () => {
    form.getValues('endDate')
    console.log('endDate:', form.getValues('endDate'))

    closeModal('dimed')
  }

  return (
    <Modal>
      <p className="text-h4">반복 맞춤 설정</p>
      <Form {...form}>
        <form className="flex w-[384px] shrink-0 flex-col items-start gap-6">
          <div className="flex flex-col gap-2 self-stretch">
            <div className="flex items-end gap-2">
              <DefaultInputForm form={form} name="repeat" label="반복 주기" />
              <SelectForm
                form={form}
                value={selectedCycle}
                setValue={setSelectedCycle}
                options={cycleOptions}
                defaultValue="일(Day)"
                name="cycle"
                className="w-[200px]"
              />
            </div>
            {selectedCycle === '주(Week)' && <RepeatDayForm form={form} />}

            <Label>종료</Label>
            <RadioGroup
              defaultValue="none"
              className="gap-1"
              onValueChange={handleRadioChange}
            >
              <div className="flex h-[40px] items-center space-x-2">
                <RadioGroupItem value="none" id="r1" />
                <Label htmlFor="r1">없음</Label>
              </div>
              <div className="flex items-center gap-9 self-stretch">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="date" id="r2" />
                  <Label htmlFor="r2">날짜</Label>
                </div>

                <EndDateForm
                  form={form}
                  disabled={selectedOption !== 'date'}
                  minDate={selectedDate}
                  setSelectedEndDate={setSelectedEndDate}
                />
              </div>
              <div className="self-stertch flex items-center gap-9">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="times" id="r3" />
                  <Label htmlFor="r3">횟수</Label>
                </div>
                <Input
                  placeholder="0회 반복"
                  className="flex-[1_0_0]"
                  disabled={selectedOption !== 'times'}
                />
              </div>
            </RadioGroup>
          </div>
          <div className="flex w-full items-start justify-end gap-[12px] self-stretch">
            <Button
              title="취소"
              type="button"
              onClick={() => closeModal('dimed')}
              className="flex flex-[1_0_0] gap-[10px] bg-blue-100"
            >
              <p className="text-body text-blue-500">취소</p>
            </Button>
            <Button
              title="확인"
              type="button"
              onClick={handleSubmit}
              className="flex flex-[1_0_0] gap-[10px]"
            >
              <p className="text-body">확인</p>
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export const ScheduleDeleteModal = () => {
  const { closeModal } = useModal()

  return (
    <Modal>
      <p className="text-h4">해당 일정을 삭제하시겠습니까?</p>
      <p className="text-p">해당 행동은 되돌릴 수 없습니다.</p>
      <div className="flex w-full gap-3">
        <Button
          title="취소"
          variant="secondary"
          className="flex-1"
          onClick={() => {
            closeModal('dimed')
          }}
        >
          <p className="text-body">취소</p>
        </Button>
        <Button
          type="submit"
          title="삭제"
          className="flex-1"
          onClick={() => {
            closeModal('dimed')
            closeModal('default')
          }}
        >
          <p className="text-body">삭제</p>
        </Button>
      </div>
    </Modal>
  )
}

export const RepeatScheduleDeleteModal = () => {
  const { closeModal } = useModal()

  return (
    <ScheduleModal>
      <p className="text-h4">반복되는 일정을 삭제하시겠습니까?</p>
      <RadioGroup
        defaultValue="only"
        className="flex w-[384px] flex-col items-start gap-4 px-4 py-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="only" id="r1" />
          <Label htmlFor="r1">이 일정만</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="future" id="r2" />
          <Label htmlFor="r2">이 일정과 향후 일정</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="r3" />
          <Label htmlFor="r3">모든 일정</Label>
        </div>
      </RadioGroup>

      <div className="flex w-full gap-3">
        <Button
          title="취소"
          variant="secondary"
          className="flex-1"
          onClick={() => {
            closeModal('default')
          }}
        >
          <p className="text-body">취소</p>
        </Button>
        <Button
          type="submit"
          title="삭제"
          className="flex-1"
          onClick={() => {
            closeModal('dimed')
            closeModal('default')
          }}
        >
          <p className="text-body">삭제</p>
        </Button>
      </div>
    </ScheduleModal>
  )
}
