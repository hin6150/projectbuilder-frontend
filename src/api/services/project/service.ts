import { APIBuilder } from '@/api/lib/fetcher'
import { QueryClient } from '@tanstack/react-query'
import {
  ProjectInfoResponse,
  TeamInfoResponse,
  DefaultResponse,
  AddProjectDTO,
  EditProjectDTO,
  InviteTeamDto,
  DeleteTeamDto,
} from './model'

export const projectService = {
  async projectInfo(client: QueryClient) {
    return (
      APIBuilder.get('/project/info')
        // .withCredentials(client)
        .build()
        .call<ProjectInfoResponse>()
    )
  },

  async addProjectInfo(client: QueryClient, dto: AddProjectDTO) {
    return (
      APIBuilder.post('/project/info')
        // .withCredentials(client)
        .build()
        .call<DefaultResponse>({ body: JSON.stringify(dto) })
    )
  },

  async editProjectInfo(client: QueryClient, dto: EditProjectDTO) {
    return (
      APIBuilder.post('/project/info')
        // .withCredentials(client)
        .build()
        .call<DefaultResponse>({ body: JSON.stringify(dto) })
    )
  },

  async deleteProjectInfo(client: QueryClient, uid: string) {
    return (
      APIBuilder.delete(`/project/info/${uid}`)
        // .withCredentials(client)
        .build()
        .call<DefaultResponse>()
    )
  },

  async teamInfo(client: QueryClient, uid: string) {
    return (
      APIBuilder.get(`/project/info/${uid}/TeamInfo`)
        // .withCredentials(client)
        .build()
        .call<TeamInfoResponse>()
    )
  },

  async inviteTeamInfo(client: QueryClient, dto: InviteTeamDto) {
    return (
      APIBuilder.post(`/project/info/${dto.uid}/TeamInfo`)
        // .withCredentials(client)
        .build()
        .call<DefaultResponse>({ body: JSON.stringify(dto) })
    )
  },

  async deleteTeamInfo(client: QueryClient, dto: DeleteTeamDto) {
    return (
      APIBuilder.delete(`/project/info/${dto.uid}/TeamInfo`)
        // .withCredentials(client)
        .build()
        .call<DefaultResponse>({ body: JSON.stringify(dto) })
    )
  },
}
