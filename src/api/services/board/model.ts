export const enum BoardCategory {
  issue = '이슈',
  feadback = '피드백',
}
export const enum BoardProgress {
  done = '완료',
  progress = '진행중',
  problem = '긴급',
}
export interface InputBoard {
  title: string
  content: string
  category: BoardCategory
  progress: BoardProgress
  mastersId: number[] | []
}
export interface BoardDto {
  title: string
  content: string
  category: BoardCategory
  progress: BoardProgress
  masters: MasterDto[] | []
  createdAt: string
}
interface MasterDto {
  id: number
  name: string
  email: string
  logo: string
}

export interface BoardResponse<T> {
  code: number
  result: T | [] | null
}

export interface BoardProps {
  items: BoardDto[]
}
