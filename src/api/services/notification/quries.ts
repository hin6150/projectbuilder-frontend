import {
  MutationOptions,
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { CustomQueryOptions } from '@/api/type'
import { NotificationService } from './service'
import { InputNotification, NotificationResponse } from './model'

export const NotificationOptions = {
  NotificationList: (client: QueryClient) => ({
    queryKey: ['notificationList'],
    queryFn: () => NotificationService.notificationListInfo(client),
  }),
  NotificationPost: (client: QueryClient, uid: string) => ({
    mutationFn: (dto: InputNotification) =>
      NotificationService.notifycationPost(client, uid, dto),
  }),
}
export const useNotificationListQuery = (
  options: CustomQueryOptions<NotificationResponse<Notification[]>> = {},
) => {
  const queryClient = useQueryClient()

  return useQuery<NotificationResponse<Notification[]>>({
    ...NotificationOptions.NotificationList(queryClient),
    ...options,
  })
}
export const useNotificationPost = (
  uid: string,
  options: MutationOptions<
    NotificationResponse<null>,
    Error,
    InputNotification
  > = {},
) => {
  const queryClient = useQueryClient()

  return useMutation<NotificationResponse<null>, Error, InputNotification>({
    ...NotificationOptions.NotificationPost(queryClient, uid),
    ...options,
  })
}
