import { SetMetadata } from '@nestjs/common'

export type MainAuthOption = {
  isPublic?: boolean
}

export const MAIN_AUTH_META_KEY = Symbol('main_auth')
export const MainAuth = (option: MainAuthOption = {}) => SetMetadata(MAIN_AUTH_META_KEY, option)
