import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'

import { useModal } from '@/hooks/useModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  DatePickerInfoForm,
  DefaultInputForm,
  TextAreaForm,
} from '../InputForm'
import { Button } from '../ui/button'
import { Modal } from './Modal'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Username must be at least 2 characters.',
  }),
  period: z.object({
    from: z.date(),
    to: z.date(),
  }),
  description: z.string(),
})

export const ProjectCreateModal = () => {
  const { toggleModal } = useModal()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      period: { from: new Date(), to: new Date() },
      description: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
            <DefaultInputForm form={form} name="name" label="프로젝트 이름" />
            <DatePickerInfoForm
              form={form}
              name="period"
              label="프로젝트 기간"
            />
            <TextAreaForm
              form={form}
              name="description"
              label="프로젝트 개요"
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
              variant="default"
              disabled={!form.formState.isValid}
              className="flex-1"
              onClick={() => {
                console.log(
                  form.watch('period'),
                  form.watch('name'),
                  !form.formState.isValid,
                )
              }}
            >
              <p className="text-body">생성</p>
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
