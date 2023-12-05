import { applyDecorators, Controller, UseGuards } from '@nestjs/common'
import { SiteIdGuard } from '@/common/guard/site-id.guard'
import { env } from '@/common/config/env'
import { ApiBearerAuth } from '@nestjs/swagger'

export function UserController(prefix: string) {
  prefix = prefix.startsWith('/') ? prefix.slice(1) : prefix

  const userPrefix = env.apiPath.user
  const apiPath = prefix.startsWith(`${userPrefix}/`) ? prefix : `${userPrefix}/${prefix}`

  return applyDecorators(UseGuards(SiteIdGuard), Controller(apiPath), ApiBearerAuth('LP'))
}
