import { applyDecorators, Controller } from '@nestjs/common'
import { env } from '@/common/config/env'

export function WebhookController(prefix: string) {
  prefix = prefix.startsWith('/') ? prefix.slice(1) : prefix

  const hookPrefix = env.apiPath.webhook
  const apiPath = prefix.startsWith(`${hookPrefix}/`) ? prefix : `${hookPrefix}/${prefix}`

  return applyDecorators(Controller(apiPath))
}
