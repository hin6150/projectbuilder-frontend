import {
  ProjectInfo,
  UserInfo,
  useAddProjectInfo,
  useDeleteProjectInfo,
  useDeleteTeamInfo,
  useEditProjectInfo,
  useInviteTeamInfo,
  useTeamInfoQuery,
} from '@/api'
import { useModal } from '@/hooks/useModal'
import { formSchemaProject } from '@/hooks/useVaild'
import { formEmailProject } from '@/hooks/useVaild/useVaild'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  DatePickerInfoForm,
  DefaultInputForm,
  TextAreaForm,
} from '../InputForm'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Modal } from './Modal'

export const ProjectCreateModal = () => {
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

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
      overview: form.watch('description'),
      startDate: form.watch('period').from.toISOString(),
      endDate: form.watch('period').to.toISOString(),
      color: '#7c67bb',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projectList'] })

        closeModal('dimed')
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  function onSubmit(values: z.infer<typeof formSchemaProject>) {
    addProjectInfo.mutate()
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
              onClick={() => closeModal('dimed')}
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
  const { closeModal } = useModal()

  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(formSchemaProject),
    defaultValues: {
      title: project.title,
      period: {
        from: new Date(project.startDate),
        to: new Date(project.endDate),
      },
      description: project.overview || '',
    },
  })

  const editProjectInfo = useEditProjectInfo(
    {
      title: form.watch('title'),
      overview: form.watch('description'),
      startDate: form.watch('period').from.toISOString(),
      endDate: form.watch('period').to.toISOString(),
      color: '#7c67bb',
    },
    project.id,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projectList'] })

        closeModal('dimed')
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  function onSubmit(values: z.infer<typeof formSchemaProject>) {
    editProjectInfo.mutate()
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
              onClick={() => closeModal('dimed')}
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
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  const deleteProjectInfo = useDeleteProjectInfo(uid, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectList'] })

      closeModal('dimed')
    },
    onError: (err: Error) => {
      console.error('프로젝트 삭제 실패:', err)
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
          onClick={() => closeModal('dimed')}
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
  const { data } = useTeamInfoQuery({}, uid)
  const [inviteEmailList, setInviteEmailList] = useState<UserInfo[]>([])

  useEffect(() => {
    if (data != null) {
      setInviteEmailList([...data?.result])
    }
  }, [data])

  const { closeModal } = useModal()

  const form = useForm({
    resolver: zodResolver(formEmailProject),
    defaultValues: {
      email: '',
      state: '',
    },
  })

  const inviteTeamInfo = useInviteTeamInfo(
    {
      projectId: uid,
      userEmails: [form.watch('email')],
    },
    {
      onSuccess: () => {
        console.log('Success:', {
          uid: uid,
          email: [form.watch('email')],
        })
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  const deleteTeamInfo = useDeleteTeamInfo(
    {
      projectId: uid,
      userEmails: [form.watch('email')],
    },
    {
      onSuccess: () => {
        console.log('Success:', {
          id: uid,
          email: form.watch('email'),
        })
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  const handleRemove = async (index: number) => {
    // Call deleteTeamInfo and wait for it to complete
    try {
      await deleteTeamInfo.mutateAsync() // Use mutateAsync for async operations
      // Proceed to remove the item from the list
      setInviteEmailList(inviteEmailList.filter((_, i) => i !== index))
    } catch (error) {
      console.error('Error deleting team info:', error)
    }
  }

  function onSubmit(values: z.infer<typeof formEmailProject>) {
    setInviteEmailList([
      ...inviteEmailList,
      // { email: form.watch('email') ?? '', state: ProjectInviteStatus.Invited },
    ])
    inviteTeamInfo.mutate()
    form.reset()

    console.log(values)
    // closeModal()
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
        {/* <div className="flex flex-col gap-2">
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
        </div> */}
        <Button
          title="닫기"
          variant="secondary"
          className="w-full flex-1"
          onClick={() => closeModal('dimed')}
        >
          <p className="text-body">닫기</p>
        </Button>
      </div>
    </Modal>
  )
}
