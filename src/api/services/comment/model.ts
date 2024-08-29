export interface Comment {
  id?: string
  description: string
  createdAt?: string
  masterId?: number[] | []
}
export interface CommentResponse<T> {
  code: number
  message: string
  result: T | null
}