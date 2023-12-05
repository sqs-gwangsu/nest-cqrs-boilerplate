import { TOKEN_ACCESS_TYPE, TOKEN_REFRESH_TYPE } from '@/common/constants/jwt-name.constant'

export type JwtType = typeof TOKEN_ACCESS_TYPE | typeof TOKEN_REFRESH_TYPE

export type Payload = {
  type: JwtType
}

export type MainPayload = {
  account: string
  memberId: number
}

export type SitePayload = {
  account: string
  memberId: number
  siteId: number
  email: string
  isAdmin: boolean
}

export type JwtSignResult = {
  accessToken: string
  refreshToken: string
}
