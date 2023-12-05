import { SetMetadata } from '@nestjs/common'

export type SuperAdminAuthOption = {
  isPublic?: boolean
}

export const SUPER_ADMIN_AUTH_KEY = Symbol('SUPER_ADMIN_AUTH_KEY')

export const SuperAdminAuth = (option: SuperAdminAuthOption = {}) =>
  SetMetadata(SUPER_ADMIN_AUTH_KEY, option)
