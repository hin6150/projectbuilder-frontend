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
import { LockIcon, PencilIcon, Trash2Icon } from 'lucide-react'
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
  EndDateForm,
  ParticipateForm,
  PublicForm,
  RepeatDayForm,
  RepeatForm,
  ScheduleTypeForm,
} from '../InputForm/InputForm'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

type Participant = {
  name: string
  email: string
}

export const ScheduleCreateModal = () => {
  const { toggleModal, setModal } = useModal()
  const [selectedType, setSelectedType] = React.useState<string>('개인 일정')
  const [selectedRepeat, setSelectedRepeat] = React.useState<string>('')
  const [selectedPublic, setSelectedPublic] = React.useState<string>('')
  const [participates, setParticipates] = React.useState<Participant[]>([])

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
      participate: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toggleModal()
  }

  return (
    <Modal>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[384px] flex-col gap-6"
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
              <DatePickerInfoForm form={form} name="period" label="일정 시간" />
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
                <ParticipateForm
                  form={form}
                  participates={participates}
                  setParticipates={setParticipates}
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
              title="생성"
              className="flex flex-[1_0_0] gap-[10px]"
              onClick={() => setModal(ModalTypes.CHECK)}
              disabled={!form.formState.isValid}
              variant={form.formState.isValid ? 'default' : 'disabled'}
            >
              <p className="text-body">생성</p>
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export const ScheduleEditModal = () => {
  const { toggleModal, setModal } = useModal()
  const [selectedType, setSelectedType] = React.useState<string>('개인 일정')
  const [selectedRepeat, setSelectedRepeat] = React.useState<string>('')
  const [selectedPublic, setSelectedPublic] = React.useState<string>('')
  const [participates, setParticipates] = React.useState<Participant[]>([])

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
      participate: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toggleModal()
  }

  return (
    <Modal>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[384px] flex-col gap-6"
        >
          <div className="flex w-[384px] items-center justify-between self-stretch">
            <p className="text-h4">일정 수정</p>
            <ScheduleTypeForm
              form={form}
              value={selectedType}
              setValue={setSelectedType}
            />
          </div>

          <div className="flex flex-col gap-4">
            <DefaultInputForm form={form} name="title" label="일정 이름" />
            <div className="flex flex-col gap-[6px]">
              <DatePickerInfoForm form={form} name="period" label="일정 시간" />
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
                <ParticipateForm
                  form={form}
                  participates={participates}
                  setParticipates={setParticipates}
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
              onClick={() => setModal(ModalTypes.CHECK)}
              disabled={!form.formState.isValid}
              variant={form.formState.isValid ? 'default' : 'disabled'}
            >
              <p className="text-body">수정</p>
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export const ScheduleCheckModal = () => {
  const { toggleModal, setModal } = useModal()

  return (
    <Modal>
      <div className="flex items-center justify-between self-stretch">
        <p className="text-h4">일정 이름입니다</p>
        <div className="flex gap-2">
          <PencilIcon
            className="h-6 w-6"
            onClick={() => {
              setModal(ModalTypes.EDIT)
            }}
          />
          <Trash2Icon
            className="h-6 w-6"
            onClick={() => {
              setModal(ModalTypes.DELETE)
            }}
          />
        </div>
      </div>
      <Button className="w-full" onClick={toggleModal}>
        <p>닫기</p>
      </Button>
    </Modal>
  )
}

export const ScheduleRepeatModal = () => {
  const { toggleModal, setModal } = useModal()
  const [cycle, setCycle] = React.useState<string>('')
  const [day, setDay] = React.useState<string>('')

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
      <Form {...form}>
        <form className="flex w-[384px] flex-col gap-6">
          <div className="flex items-end gap-2">
            <DefaultInputForm form={form} name="repeat" label="반복 주기" />
            <CycleForm form={form} value={cycle} setValue={setCycle} />
          </div>
          <RepeatDayForm form={form} value={day} setValue={setDay} />
          <EndDateForm form={form} name="endDate" label="종료 날짜" />
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
              onClick={() => setModal(ModalTypes.EDIT)}
              disabled={!form.formState.isValid}
              variant={form.formState.isValid ? 'default' : 'disabled'}
            >
              <p className="text-body">수정</p>
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export const ScheduleDeleteModal = () => {
  const { toggleModal } = useModal()

  return (
    <Modal>
      <p className="text-h4">해당 일정을 삭제하시겠습니까?</p>
      <p className="text-p">해당 행동은 되돌릴 수 없습니다.</p>
      <div className="flex w-full gap-3">
        <Button
          title="취소"
          variant="secondary"
          className="flex-1"
          onClick={toggleModal}
        >
          <p className="text-body">취소</p>
        </Button>
        <Button
          type="submit"
          title="삭제"
          className="flex-1"
          onClick={toggleModal}
        >
          <p className="text-body">삭제</p>
        </Button>
      </div>
    </Modal>
  )
}

export const RepeatScheduleDeleteModal = () => {
  const { toggleModal } = useModal()

  return (
    <Modal>
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
          onClick={toggleModal}
        >
          <p className="text-body">취소</p>
        </Button>
        <Button
          type="submit"
          title="삭제"
          className="flex-1"
          onClick={toggleModal}
        >
          <p className="text-body">삭제</p>
        </Button>
      </div>
    </Modal>
  )
}
