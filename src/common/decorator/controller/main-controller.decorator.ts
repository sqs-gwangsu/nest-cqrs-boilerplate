import { applyDecorators, Controller } from '@nestjs/common'
import { env } from '@/common/config/env'
import { MainAuth, MainAuthOption } from '@/common/decorator/controller/main-auth.decorator'
import { ApiBearerAuth } from '@nestjs/swagger'

export function MainController(prefix: string, option: MainAuthOption = {}) {
  prefix = prefix.startsWith('/') ? prefix.slice(1) : prefix

  const mainPrefix = env.apiPath.main
  const apiPath = prefix.startsWith(`${mainPrefix}/`) ? prefix : `${mainPrefix}/${prefix}`

  return applyDecorators(MainAuth(option), Controller(apiPath), ApiBearerAuth('HP'))
}
