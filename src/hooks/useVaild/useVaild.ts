import { z } from 'zod'

// 개별 필드 정의
const nameField = z.string().min(2, {
  message: '이름은 2글자 이상이어야 합니다.',
})

const emailField = z.string().email({ message: '유효한 이메일을 입력하세요.' })

const phonenumberField = z.string().refine(
  (value) => {
    const phoneNumber = value.replace(/-/g, '')
    return /^01[0-9]\d{7,8}$/.test(phoneNumber)
  },
  {
    message: '올바른 전화번호를 입력해주세요.',
  },
)

const addressField = z.string()

const stackField = z.string()

const mbtiField = z.string()

const entriesField = z.array(
  z.object({
    tool: z.string(),
    email: emailField,
  }),
)

const imageUrlField = z.string().optional()

const useField = z.boolean().refine((value) => value === true, {
  message: '이 항목을 체크해야 합니다.',
})

const privacyField = z.boolean().refine((value) => value === true, {
  message: '이 항목을 체크해야 합니다.',
})

const marketingField = z.boolean().optional()

const title = z.string().min(1, {
  message: 'Username must be at least 2 characters.',
})

const period = z.object({
  from: z.date(),
  to: z.date(),
})

const description = z.string()

const scheduletypeField = z.string()

const alldayField = z.boolean().optional()

const repeatField = z.string()

const publicField = z.string()

const participate = z.string()

const cycleField = z.string()

const repeatDay = z.string()

const endDate = z.date()

const teamName = z.string()

export const formSchemaUserEdit = z.object({
  name: nameField,
  email: emailField,
  contact: phonenumberField,
  address: addressField,
  stack: stackField,
  MBTI: mbtiField,
  entries: entriesField,
  imageUrl: imageUrlField,
})

export const formSchemaSignUp = z.object({
  name: nameField,
  email: emailField,
  contact: phonenumberField,
  use: useField,
  privacy: privacyField,
  marketing: marketingField,
})

export const formSchemaOptionalInfo = z.object({
  address: addressField,
  stack: stackField,
  MBTI: mbtiField,
  entries: entriesField,
})

export const formSchemaProject = z.object({
  title: title,
  period: period,
  description: description,
})

export const formEmailProject = z.object({
  email: emailField,
})

export const formSchemaPersonalSchedule = z.object({
  type: scheduletypeField,
  title: title,
  period: period,
  description: description,
  allday: alldayField,
  repeat: repeatField,
  publicContent: publicField,
})

export const formSchemaTeamSchedule = z.object({
  type: scheduletypeField,
  title: title,
  period: period,
  description: description,
  allday: alldayField,
  repeat: repeatField,
  participate: participate,
})

export const formSchemaRepeatSchedule = z.object({
  repeat: repeatField,
  cycle: cycleField,
  day: repeatDay,
  end: endDate,
})

export const formSchemaCheckSchedule = z.object({
  type: scheduletypeField,
  title: title,
  period: period,
  description: description,
  publicContent: publicField,
  allday: alldayField,
  repeat: repeatField,
  participate: participate,
  team: teamName,
})

export const formatPhoneNumber = (value: string) => {
  if (!value) return value
  const phoneNumber = value.replace(/[^\d]/g, '')
  const phoneNumberLength = phoneNumber.length

  if (phoneNumberLength < 4) return phoneNumber
  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`
}

export type FormSchemas =
  | typeof formSchemaUserEdit
  | typeof formSchemaOptionalInfo
  | typeof formSchemaSignUp
