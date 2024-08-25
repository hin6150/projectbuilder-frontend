import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { CustomQueryOptions } from '@/api/type'
import { BoardService } from './service'
import { BoardDto, BoardResponse } from './modal'

export const { BoardListInfo, BoardInfo } = {
  BoardListInfo: (client: QueryClient, uid: string) => ({
    queryKey: ['boardList'],
    queryFn: () => BoardService.boardListInfo(client, uid),
  }),
  BoardInfo: (client: QueryClient, uid: string) => ({
    queryKey: ['board'],
    qeuryFn: () => BoardService.boardInfo(client, uid),
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
