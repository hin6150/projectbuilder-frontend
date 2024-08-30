export interface Comment {
  id?: string
  description: string
  user: string
  createdAt: string
  masterId?: number[] | []
}
export interface InputComment {
  description: string,
  masterId?: number[] | []
}

export interface CommentResponse<T> {
  code: number
  message: string
  result: T | null
}