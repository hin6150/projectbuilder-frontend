import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ProjectInfo,
  TeamInfo,
  useInviteTeamInfo,
  useTeamInfoQuery,
} from '@/api'
import { formSchemaProject } from '@/hooks/useVaild'
import { formEmailProject } from '@/hooks/useVaild/useVaild'
import { useModal } from '@/hooks/useModal'
import {
  ProjectInviteStatus,
  useAddProjectInfo,
  useEditProjectInfo,
  useDeleteProjectInfo,
} from '@/api'
import { Form, useFormField } from '../ui/form'
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

  const addProjectInfo = useAddProjectInfo(
    {
      title: form.watch('title'),
      subTitle: form.watch('description'),
      startDate: form.watch('period').from.toISOString(),
      endDate: form.watch('period').to.toISOString(),
    },
    {
      onSuccess: () => {
        console.log('Success:', {
          title: form.watch('title'),
          subTitle: form.watch('description'),
          startDate: form.watch('period').from.toISOString(),
          endDate: form.watch('period').to.toISOString(),
        })
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  function onSubmit(values: z.infer<typeof formSchemaProject>) {
    addProjectInfo.mutate()
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
              title="닫기"
              variant="secondary"
              className="flex-1"
              onClick={toggleModal}
            >
              <p className="text-body">닫기</p>
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
  const editProjectInfo = useEditProjectInfo(
    {
      title: form.watch('title'),
      subTitle: form.watch('description'),
      startDate: form.watch('period').from.toISOString(),
      endDate: form.watch('period').to.toISOString(),
    },
    {
      onSuccess: () => {
        console.log('Success:', {
          title: form.watch('title'),
          subTitle: form.watch('description'),
          startDate: form.watch('period').from.toISOString(),
          endDate: form.watch('period').to.toISOString(),
        })
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  function onSubmit(values: z.infer<typeof formSchemaProject>) {
    editProjectInfo.mutate()
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
              title="닫기"
              variant="secondary"
              className="flex-1"
              onClick={toggleModal}
            >
              <p className="text-body">닫기</p>
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

export const ProjectDeleteModal = ({ uid }: { uid: string }) => {
  const { toggleModal } = useModal()

  const deleteProjectInfo = useDeleteProjectInfo(uid, {
    onSuccess: () => {
      console.log('프로젝트 삭제 성공:', uid)
      toggleModal()
    },
    onError: (err: Error) => {
      console.error('프로젝트 삭제 실패:', err)
      toggleModal()
    },
  })

  const handleDeleteClick = () => {
    deleteProjectInfo.mutate()
  }

  return (
    <Modal>
      <p className="text-h4">프로젝트를 삭제하시겠습니까?</p>
      <p className="text-p">해당 행동은 되돌릴 수 없습니다.</p>
      <div className="flex w-full gap-3">
        <Button
          title="닫기"
          variant="secondary"
          className="flex-1"
          onClick={toggleModal}
        >
          <p className="text-body">닫기</p>
        </Button>
        <Button title="삭제" className="flex-1" onClick={handleDeleteClick}>
          <p className="text-body">삭제</p>
        </Button>
      </div>
    </Modal>
  )
}

export const ProjectInviteModal = ({ uid }: { uid: string }) => {
  const { data, isLoading } = useTeamInfoQuery({}, uid)

  console.log(data)
  const [inviteEmailList, setInviteEmailList] = useState<TeamInfo[]>(
    data?.result ?? [],
  )

  const { toggleModal } = useModal()

  const form = useForm({
    resolver: zodResolver(formEmailProject),
    defaultValues: {
      email: '',
      state: '',
    },
  })

  const inviteTeamInfo = useInviteTeamInfo(
    {
      uid: uid,
      email: form.watch('email'),
    },
    {
      onSuccess: () => {
        console.log('Success:', {
          uid: uid,
          email: form.watch('email'),
        })
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  const handleRemove = (index: number) => {
    setInviteEmailList(inviteEmailList.filter((_, i) => i !== index))
  }

  function onSubmit(values: z.infer<typeof formEmailProject>) {
    setInviteEmailList([
      ...inviteEmailList,
      { email: form.watch('email') ?? '', state: ProjectInviteStatus.Invited },
    ])
    inviteTeamInfo.mutate()
    form.reset()
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
              data.state == ProjectInviteStatus.Invited
                ? 'text-gray-500'
                : data.state == ProjectInviteStatus.Acceped
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
                  <p className={`text-small ${color}`}>{data.state}</p>
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
          title="닫기"
          variant="secondary"
          className="w-full flex-1"
          onClick={toggleModal}
        >
          <p className="text-body">닫기</p>
        </Button>
      </div>
    </Modal>
  )
}
