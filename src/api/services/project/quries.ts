import { CustomQueryOptions } from '@/api/type'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProjectInfoResponse, TeamInfoResponse } from './model'
import { projectService } from './service'

export const projectOptions = {
  projectInfo: (client: QueryClient) => ({
    queryKey: ['projectList'],
    queryFn: () => projectService.projectInfo(client),
  }),
  teamInfo: (client: QueryClient, uid: string) => ({
    queryKey: ['teamList'],
    queryFn: () => projectService.teamInfo(client, uid),
  }),
}

export const useProjectInfoQuery = (
  options: CustomQueryOptions<ProjectInfoResponse> = {},
) => {
  const queryClient = useQueryClient()

  return useQuery<ProjectInfoResponse>({
    ...projectOptions.projectInfo(queryClient),
    ...options,
  })
}

export const useTeamInfoQuery = (
  options: CustomQueryOptions<TeamInfoResponse> = {},
  uid: string,
) => {
  const queryClient = useQueryClient()

  return useQuery<TeamInfoResponse>({
    ...projectOptions.teamInfo(queryClient, uid),
    ...options,
  })
}
