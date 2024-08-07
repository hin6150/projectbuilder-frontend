import { StringDecoder } from 'string_decoder'

export const enum ProjectInviteStatus {
  Invited = '초대완료',
  Acceped = '수락',
  Denied = '거절',
}

interface ProjectUserInfo {
  uid: string
  avatar: string | undefined
  name: string
  email: string
}

export interface ProjectInfo {
  uid: string
  title: string
  subTitle: string
  user: ProjectUserInfo[]
  startDate: string
  endDate: string
}

export interface ProjectInfoResponse {
  code: string
  result: ProjectInfo[]
}

export interface TeamInfoResponse {
  code: string
  result: TeamInfo[]
}

export interface TeamInfo {
  email: string
  state: ProjectInviteStatus
}

export interface InviteTeamDto {
  uid: string
  email: string
}

export interface DeleteTeamDto {
  uid: string
  email: string
}

export interface AddProjectDTO {
  title: string
  subTitle: string
  startDate: string
  endDate: string
}

export interface EditProjectDTO {
  title: string
  subTitle: string
  startDate: string
  endDate: string
}

export interface DefaultResponse {
  code: string
}
