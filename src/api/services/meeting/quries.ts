import {
  MutationOptions,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { RecommedMeetingDto, RecommedMeetingResponse } from './model'
import { meetingService } from './service'
import { CustomQueryOptions } from '@/api/type'

export const meetingOptions = {
  recommedMeetingTimes: (client: QueryClient, dto: RecommedMeetingDto) => ({
    queryKey: ['meetings'],
    queryFn: () => meetingService.recommedMeetingTimes(client, dto),
  }),
}

export const useRecommedMeetingTimesQuery = (
  dto: RecommedMeetingDto,
  options: CustomQueryOptions<RecommedMeetingResponse> = {},
) => {
  const queryClient = useQueryClient()

  return useQuery<RecommedMeetingResponse>({
    ...meetingOptions.recommedMeetingTimes(queryClient, dto),
    ...options,
  })
}

export const useRecommedMeetingTimesMutation = (
  dto: RecommedMeetingDto,
  options: MutationOptions = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...meetingOptions.recommedMeetingTimes(queryClient, dto),
    ...options,
  })
}
