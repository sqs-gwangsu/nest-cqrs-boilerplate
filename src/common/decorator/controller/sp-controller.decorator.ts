import { applyDecorators, Controller } from '@nestjs/common'
import { env } from '@/common/config/env'
import {
  SuperAdminAuth,
  SuperAdminAuthOption,
} from '@/common/decorator/controller/super-admin-auth.decorator'

export function SpController(prefix: string, option: SuperAdminAuthOption = {}) {
  const spPrefix = env.apiPath.sp
  const apiPath = prefix.startsWith(`${spPrefix}/`) ? prefix : `${spPrefix}/${prefix}`

  return applyDecorators(SuperAdminAuth(option), Controller(apiPath))
}
