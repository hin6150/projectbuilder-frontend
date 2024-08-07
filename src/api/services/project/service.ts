import { APIBuilder } from '@/api/lib/fetcher'
import { QueryClient } from '@tanstack/react-query'
import {
  AddProjectDTO,
  DefaultResponse,
  DeleteTeamDto,
  EditProjectDTO,
  InviteTeamDto,
  ProjectInfoResponse,
  TeamInfoResponse,
} from './model'

export const projectService = {
  async projectInfo(client: QueryClient) {
    return APIBuilder.get('/workspace')
      .withCredentials(client)
      .build()
      .call<ProjectInfoResponse>()
  },

  async addProjectInfo(client: QueryClient, dto: AddProjectDTO) {
    return APIBuilder.post('/workspace')
      .withCredentials(client)
      .build()
      .call<DefaultResponse>({ body: JSON.stringify(dto) })
  },

  async editProjectInfo(client: QueryClient, dto: EditProjectDTO, uid: string) {
    return APIBuilder.put(`/workspace/project?key=${uid}`)
      .withCredentials(client)
      .build()
      .call<DefaultResponse>({ body: JSON.stringify(dto) })
  },

  async deleteProjectInfo(client: QueryClient, uid: string) {
    return APIBuilder.delete(`/workspace/project?key=${uid}`)
      .withCredentials(client)
      .build()
      .call<DefaultResponse>()
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
      APIBuilder.post(`/project/info/${dto.id}/TeamInfo`)
        // .withCredentials(client)
        .build()
        .call<DefaultResponse>({ body: JSON.stringify(dto) })
    )
  },

  async deleteTeamInfo(client: QueryClient, dto: DeleteTeamDto) {
    return (
      APIBuilder.delete(`/project/info/${dto.id}/TeamInfo`)
        // .withCredentials(client)
        .build()
        .call<DefaultResponse>({ body: JSON.stringify(dto) })
    )
  },
}
