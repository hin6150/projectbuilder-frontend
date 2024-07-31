import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ProjectInfo } from '@/api'
import { formSchemaProject } from '@/hooks/useVaild'
import { formEmailProject } from '@/hooks/useVaild/useVaild'
import { useModal } from '@/hooks/useModal'
import { ProjectInviteStatus } from '@/api'
import { Form } from '../ui/form'
import { Button } from '../ui/button'
import { Modal } from './Modal'
import { MailIcon, XIcon } from 'lucide-react'
import {
  DatePickerInfoForm,
  DefaultInputForm,
  TextAreaForm,
} from '../InputForm'

export const ProjectCreateModal = () => {
  const { toggleModal } = useModal()

  const form = useForm({
    resolver: zodResolver(formSchemaProject),
    defaultValues: {
      title: '',
      period: { from: new Date(), to: new Date() },
      description: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchemaProject>) {
    toggleModal()
  }

  return (
    <Modal>
      <p className="text-h4">프로젝트 생성</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <div className="flex flex-col gap-10">
            <DefaultInputForm form={form} name="title" label="프로젝트 이름" />
            <DatePickerInfoForm
              form={form}
              name="period"
              label="프로젝트 기간"
            />
            <TextAreaForm
              form={form}
              name="description"
              label="프로젝트 개요(선택)"
            />
          </div>
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
              title="생성"
              disabled={!form.formState.isValid}
              variant={form.formState.isValid ? 'default' : 'disabled'}
              className="flex-1"
            >
              <p className="text-body">생성</p>
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export const ProjectEditeModal = ({ project }: { project: ProjectInfo }) => {
  const { toggleModal } = useModal()

  const form = useForm({
    resolver: zodResolver(formSchemaProject),
    defaultValues: {
      title: project.title,
      period: {
        from: new Date(project.startDate),
        to: new Date(project.endDate),
      },
      description: project.subTitle || '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchemaProject>) {
    toggleModal()
  }

  return (
    <Modal>
      <p className="text-h4">프로젝트 수정</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <div className="flex flex-col gap-10">
            <DefaultInputForm form={form} name="title" label="프로젝트 이름" />
            <DatePickerInfoForm
              form={form}
              name="period"
              label="프로젝트 기간"
            />
            <TextAreaForm
              form={form}
              name="description"
              label="프로젝트 개요(선택)"
            />
          </div>
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
              title="수정"
              disabled={!form.formState.isValid}
              variant={form.formState.isValid ? 'default' : 'disabled'}
              className="flex-1"
            >
              <p className="text-body">수정</p>
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export const ProjectDeleteModal = () => {
  const { toggleModal } = useModal()

  return (
    <Modal>
      <p className="text-h4">프로젝트를 삭제하시겠습니까?</p>
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

export const ProjectInviteModal = () => {
  const [inviteEmailList, setInviteEmailList] = useState<
    { email: string; status: string }[]
  >([])

  const { toggleModal } = useModal()

  const form = useForm({
    resolver: zodResolver(formEmailProject),
    defaultValues: {
      email: '',
    },
  })

  const handleRemove = (index: number) => {
    setInviteEmailList(inviteEmailList.filter((_, i) => i !== index))
  }

  function onSubmit(values: z.infer<typeof formEmailProject>) {
    setInviteEmailList([
      ...inviteEmailList,
      { email: form.watch('email') ?? '', status: ProjectInviteStatus.Invited },
    ])
    form.reset()

    console.log(values)
  }

  return (
    <Modal>
      <p className="text-h4">프로젝트 팀원 초대</p>
      <div className="flex w-full flex-col gap-6">
        <Form {...form}>
          <form
            className="flex w-full items-end gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex-1">
              <DefaultInputForm form={form} label="팀원 이메일" name="email" />
            </div>
            <Button
              type="submit"
              title="초대"
              disabled={!form.formState.isValid}
              variant={form.formState.isValid ? 'default' : 'disabled'}
            >
              <p>초대하기</p>
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-2">
          {inviteEmailList.map((data, index) => {
            const color =
              data.status == ProjectInviteStatus.Invited
                ? 'text-gray-500'
                : data.status == ProjectInviteStatus.Acceped
                  ? 'text-blue-500'
                  : 'text-red-500'
            return (
              <div
                className="flex items-center justify-between p-1"
                key={index}
              >
                <div className="flex items-center gap-2">
                  <MailIcon size={16} />
                  <p className="text-subtle">{data.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className={`text-small ${color}`}>{data.status}</p>
                  <XIcon
                    size={16}
                    onClick={() => handleRemove(index)}
                    className="cursor-pointer text-black"
                  />
                </div>
              </div>
            )
          })}
          {inviteEmailList.length == 0 && (
            <p className="text-subtle text-slate-400">초대된 팀원이 없어요!</p>
          )}
        </div>
        <Button
          title="취소"
          variant="secondary"
          className="w-full flex-1"
          onClick={toggleModal}
        >
          <p className="text-body">취소</p>
        </Button>
      </div>
    </Modal>
  )
}
