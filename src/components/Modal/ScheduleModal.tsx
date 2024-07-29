'use client'
import * as React from 'react'
import { useModal } from '@/hooks/useModal'
import {
  formSchemaPersonalSchedule,
  formSchemaRepeatSchedule,
  formSchemaTeamSchedule,
} from '@/hooks/useVaild'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import { z } from 'zod'
import { Modal } from './Modal'
import { LockIcon } from 'lucide-react'
import {
  DatePickerInfoForm,
  DefaultInputForm,
  TextAreaForm,
} from '../InputForm'
import { Button } from '../ui/button'
import { ModalTypes } from '@/hooks/useModal/useModal'
import { Checkbox } from '../ui/checkbox'
import {
  CycleForm,
  PublicForm,
  RepeatForm,
  ScheduleTypeForm,
} from '../InputForm/InputForm'

export const ScheduleCreateModal = () => {
  const { toggleModal, open, type } = useModal()
  const [selectedType, setSelectedType] = React.useState('개인 일정')
  const [selectedRepeat, setSelectedRepeat] =
    React.useState<string>('반복 안함')
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
              <ScheduleTypeForm
                form={form}
                value={selectedType}
                setValue={setSelectedType}
              />
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
                  <RepeatForm
                    form={form}
                    value={selectedRepeat}
                    setValue={setSelectedRepeat}
                  />
                  {selectedType === '개인 일정' && (
                    <>
                      <div className="flex items-center gap-1">
                        <LockIcon className="h-4 w-4" />
                        <p className="text-small">공개 여부</p>
                      </div>

                      <PublicForm
                        form={form}
                        value={selectedPublic}
                        setValue={setSelectedPublic}
                      />
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
      {open && type === ModalTypes.REPEAT && <ScheduleCreateModal />}
    </>
  )
}

export const ScheduleRepeatModal = () => {
  const { toggleModal } = useModal()
  const [cycle, Setcycle] = React.useState<string>('')
  const [value, setValue] = React.useState<string>('')

  const form = useForm({
    resolver: zodResolver(formSchemaRepeatSchedule),
    defaultValues: {
      repeat: '1',
      cycle: '',
      day: '',
      end: new Date(),
    },
  })

  return (
    <Modal>
      <p className="text-h4">반복 맞춤 설정</p>
      <div className="flex w-full flex-col gap-6">
        <Form {...form}>
          <form>
            <div className="flex items-end gap-2 self-stretch">
              <DefaultInputForm form={form} name="repeat" label="반복 주기" />
              <CycleForm form={form} value={cycle} setValue={Setcycle} />
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
