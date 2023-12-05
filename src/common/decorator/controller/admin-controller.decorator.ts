import { applyDecorators, Controller, UseGuards } from '@nestjs/common'
import { env } from '@/common/config/env'
import { ApiBearerAuth } from '@nestjs/swagger'
import { SiteIdGuard } from '@/common/guard/site-id.guard'
import { AdminAuth, AdminAuthOption } from '@/common/decorator/controller/admin-auth.decorator'

export function AdminController(prefix: string, option: AdminAuthOption = {}) {
  prefix = prefix.startsWith('/') ? prefix.slice(1) : prefix

  const adminPrefix = env.apiPath.admin
  const apiPath = prefix.startsWith(`${adminPrefix}/`) ? prefix : `${adminPrefix}/${prefix}`

  return applyDecorators(
    UseGuards(SiteIdGuard),
    AdminAuth(option),
    ApiBearerAuth('AD'),
    Controller(apiPath),
  )
}
