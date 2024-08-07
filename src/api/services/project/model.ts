export const enum ProjectInviteStatus {
  Invited = '초대완료',
  Acceped = '수락',
  Denied = '거절',
}

interface ProjectUserInfo {
  id: string
  avatar: string | undefined
  name: string
  email: string
}

export interface ProjectInfo {
  id: string
  title: string
  overview: string
  users: ProjectUserInfo[]
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
  id: string
  email: string
}

export interface DeleteTeamDto {
  id: string
  email: string
}

export interface AddProjectDTO {
  title: string
  overview: string
  startDate: string
  endDate: string
}

export interface EditProjectDTO {
  title: string
  overview: string
  startDate: string
  endDate: string
}

export interface DefaultResponse {
  code: string
}
