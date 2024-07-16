export enum UserStatus {
  SocialLoginCompleted = 'SOCIAL_LOGIN_COMPLETED',
  Registered = 'REGISTERED',
  Withdrawn = 'WITHDRAWN',
}

export interface UserInfoResponse {
  code: string
  result: {
    id: string
    email: string
    status: UserStatus
    onboardingCompleted: boolean
    name: string
    phone: string
    address: string
    tool: {
      figma: string
      notion: string
    }
    stack: string[]
    MBTI: string
  }
}
