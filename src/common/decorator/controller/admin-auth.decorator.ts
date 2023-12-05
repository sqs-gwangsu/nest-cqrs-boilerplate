import { SetMetadata } from '@nestjs/common'

export type AdminAuthOption = {
  public?: boolean
}
export const ADMIN_AUTH_KEY = Symbol('ADMIN_AUTH_KEY')
export const AdminAuth = (option: AdminAuthOption = {}) => SetMetadata(ADMIN_AUTH_KEY, option)
