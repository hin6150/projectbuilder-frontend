'use client'
import * as React from 'react'
import { useModal } from '@/hooks/useModal'
import {
  formSchemaPersonalSchedule,
  formSchemaTeamSchedule,
} from '@/hooks/useVaild'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import { z } from 'zod'
import { Modal } from './Modal'
import { Calendar, ChevronDown, LockIcon } from 'lucide-react'
import {
  DatePickerInfoForm,
  DefaultInputForm,
  TextAreaForm,
} from '../InputForm'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { ModalTypes } from '@/hooks/useModal/useModal'
import { Checkbox } from '../ui/checkbox'

export const ScheduleCreateModal = () => {
  const { toggleModal, open, setModal, type } = useModal()
  const [selectedType, setSelectedType] = React.useState('개인 일정')
  const [selectedRepeat, setSelectedRepeat] = React.useState('반복 안함')
  const [selectedPublic, setSelectedPublic] = React.useState('내용 비공개')

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
      repeat: '',
      public: '',
      participate: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toggleModal()
  }
  const handleTypeClick = (scheduleType: string) => {
    setSelectedType(scheduleType)
  }
  const handleRepeatClick = (scheduleRepeat: string) => {
    setSelectedRepeat(scheduleRepeat)
  }

  const handlePublicClick = (schedulePublic: string) => {
    setSelectedPublic(schedulePublic)
  }

  return (
    <>
      <Modal>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
          >
            <div className="flex w-[384px] items-center justify-between self-stretch">
              <p className="text-h4">일정 생성</p>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-[16px] w-[72px] items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <p className="text-small">{selectedType}</p>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="text-center">
                  <DropdownMenuLabel>일정 유형</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => handleTypeClick('개인 일정')}
                  >
                    개인 일정
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTypeClick('팀 일정')}>
                    팀 일정
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col gap-4">
              <DefaultInputForm form={form} name="title" label="일정 이름" />
              <div className="flex flex-col gap-[6px]">
                <DatePickerInfoForm
                  form={form}
                  name="period"
                  label="일정 시간"
                />
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox id="allday" />
                    <label htmlFor="allday" className="text-small">
                      하루 종일
                    </label>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <p className="text-small">{selectedRepeat}</p>
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="text-center">
                      <DropdownMenuLabel>반복 여부</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          handleRepeatClick('매일')
                        }}
                      >
                        매일
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          handleRepeatClick('매주')
                        }}
                      >
                        매주
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          handleRepeatClick('매월')
                        }}
                      >
                        매월
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          handleRepeatClick('반복 안함')
                        }}
                      >
                        반복 안함
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          handleRepeatClick('맞춤 설정')
                        }}
                      >
                        맞춤 설정
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {selectedType === '개인 일정' && (
                    <>
                      <div className="flex items-center gap-1">
                        <LockIcon className="h-4 w-4" />
                        <p className="text-small">공개 여부</p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1">
                          <p className="text-small">{selectedPublic}</p>
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>공개 여부</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              handlePublicClick('내용 비공개')
                            }}
                          >
                            내용 비공개
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handlePublicClick('공개')
                            }}
                          >
                            공개
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
                {selectedType === '팀 일정' && (
                  <DefaultInputForm
                    form={form}
                    name="participate"
                    label="참가자"
                  />
                )}
              </div>
              <TextAreaForm form={form} name="description" label="일정 내용" />
            </div>
            <div className="flex w-full items-start justify-end gap-[12px] self-stretch">
              <Button
                title="취소"
                onClick={toggleModal}
                className="flex flex-[1_0_0] gap-[10px] bg-blue-100"
              >
                <p className="text-body text-blue-500">취소</p>
              </Button>
              <Button
                title="수정"
                className="flex flex-[1_0_0] gap-[10px]"
                disabled={!form.formState.isValid}
                variant={form.formState.isValid ? 'default' : 'disabled'}
              >
                <p className="text-body">수정</p>
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  )
}
