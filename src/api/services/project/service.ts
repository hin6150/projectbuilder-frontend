import { APIBuilder } from '@/api/lib/fetcher'
import { QueryClient } from '@tanstack/react-query'
import { ProjectInfoResponse, TeamInfoResponse } from './model'

export const projectService = {
  async projectInfo(client: QueryClient) {
    return (
      APIBuilder.get('/project/info')
        // .withCredentials(client)
        .build()
        .call<ProjectInfoResponse>()
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
}
