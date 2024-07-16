// Constants
export {
  ACCESS_TOKEN_HEADER_KEY,
  REFRESH_TOKEN_HEADER_KEY,
} from './constants/header-key'

// MSW
export async function initMsw() {
  if (typeof window === 'undefined') {
    const { server } = await import('./mocks/worker/server')
    server.listen()
  } else {
    const { worker } = await import('./mocks/worker/browser')
    await worker.start()
  }
}

// USER
export type { UserInfoResponse } from './services/user/model'
export { UserStatus } from './services/user/model'
export { userOptions, useUserInfoQuery } from './services/user/quries'
export { userService } from './services/user/service'
