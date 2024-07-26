import { authHandlers } from './auth'
import { projectHandlers } from './project'
import { userHandlers } from './user'

export const handlers = [...authHandlers, ...userHandlers, ...projectHandlers]
