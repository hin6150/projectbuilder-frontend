import { MutationOptions, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentService } from "./service";
import { Comment, CommentResponse } from "./model";
import { CustomQueryOptions } from "@/api/type";

const CommentQueryOptions = {
  commentList: (client: QueryClient, uid: string) => ({
    queryKey: ['commentList'],
    queryFn: () => CommentService.commentListInfo(client, uid)
  }),
  addComment: (client: QueryClient, uid: string) => ({
    mutationFn: (dto: Comment) => CommentService.addComment(client, uid, dto) 
  }),
  updateComment: (client: QueryClient, uid: string) => ({
    mutationFn: (dto: Comment) => CommentService.updateComment(client, uid, dto) 
  }),
  deleteComment: (client: QueryClient, uid: string) => ({
    mutationFn: (dto: Comment) => CommentService.deleteComment(client, uid, dto) 
  }),
}

export const useCommentListQuery = (
  uid: string,
  options: CustomQueryOptions<CommentResponse<Comment[]>> = {},
) => {
  const queryClient = useQueryClient()

  return useQuery<CommentResponse<Comment[]>>({
    ...CommentQueryOptions.commentList(queryClient, uid),
    ...options,
  })
}
export const useAddCommentMutation= (
  uid: string,
  options: MutationOptions<CommentResponse<string>, Error, Comment> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation<CommentResponse<string>, Error, Comment>({
    ...CommentQueryOptions.addComment(queryClient, uid),
    ...options,
  })
}
export const useUpdateCommentMutation= (
  uid: string,
  options: MutationOptions<CommentResponse<null>, Error, Comment> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation<CommentResponse<null>, Error, Comment>({
    ...CommentQueryOptions.updateComment(queryClient, uid),
    ...options,
  })
}
export const useDeleteCommentMutation= (
  uid: string,
  options: MutationOptions<CommentResponse<null>, Error, Comment> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation<CommentResponse<null>, Error, Comment>({
    ...CommentQueryOptions.deleteComment(queryClient, uid),
    ...options,
  })
}

