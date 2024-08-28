import {
  MutationOptions,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { CustomQueryOptions } from '@/api/type'
import { BoardService } from './service'
import { BoardDto, BoardResponse, InputBoard } from './model'

export const { BoardListInfo, BoardInfo, AddBoard } = {
  BoardListInfo: (client: QueryClient, uid: string) => ({
    queryKey: ['boardList'],
    queryFn: () => BoardService.boardListInfo(client, uid),
  }),
  BoardInfo: (client: QueryClient, uid: string) => ({
    queryKey: ['board', uid],
    queryFn: () => BoardService.boardInfo(client, uid),
  }),
  AddBoard: (client: QueryClient, uid: string) => ({
    mutationFn: (dto: InputBoard) => BoardService.addBoard(client, uid, dto),
  }),
}

export const useBoardListQuery = (
  uid: string,
  options: CustomQueryOptions<BoardResponse<BoardDto[]>> = {},
) => {
  const queryClient = useQueryClient()

  return useQuery<BoardResponse<BoardDto[]>>({
    ...BoardListInfo(queryClient, uid),
    ...options,
  })
}
export const useBoardQuery = (
  uid: string,
  options: CustomQueryOptions<BoardResponse<BoardDto>> = {},
) => {
  const queryClient = useQueryClient()

  return useQuery<BoardResponse<BoardDto>>({
    ...BoardInfo(queryClient, uid),
    ...options,
  })
}
export const useAddBoard = (
  uid: string,
  options: MutationOptions<BoardResponse<string>, Error, InputBoard> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation<BoardResponse<string>, Error, InputBoard>({
    ...AddBoard(queryClient, uid),
    ...options,
  })
}
