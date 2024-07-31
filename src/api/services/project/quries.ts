import { CustomQueryOptions } from '@/api/type'
import {
  MutationOptions,
  QueryClient,
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query'
import {
  ProjectInfo,
  ProjectInfoResponse,
  TeamInfoResponse,
  AddProjectDTO,
  EditProjectDTO,
} from './model'
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
  addProjectInfo: (client: QueryClient, dto: AddProjectDTO) => ({
    mutationFn: () => projectService.addProjectInfo(client, dto),
  }),
  editProjectInfo: (client: QueryClient, dto: EditProjectDTO) => ({
    mutationFn: () => projectService.editProjectInfo(client, dto),
  }),
  deleteProjectInfo: (client: QueryClient, uid: string) => ({
    mutationFn: () => projectService.deleteProjectInfo(client, uid),
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

export const useAddProjectInfo = (
  dto: AddProjectDTO,
  options: MutationOptions = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...projectOptions.addProjectInfo(queryClient, dto),
    ...options,
  })
}

export const useEditProjectInfo = (
  dto: EditProjectDTO,
  options: MutationOptions = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...projectOptions.editProjectInfo(queryClient, dto),
    ...options,
  })
}

export const useDeleteProjectInfo = (
  uid: string,
  options: MutationOptions = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...projectOptions.deleteProjectInfo(queryClient, uid),
    ...options,
  })
}
