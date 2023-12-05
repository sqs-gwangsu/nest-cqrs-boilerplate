import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import mobile from 'is-mobile'
import { Request } from 'express'
import { DeviceEnum } from '@/common/type/common.type'

export const Device = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest()

  const isMobile = mobile({ ua: request })
  return isMobile ? DeviceEnum.Mobile : DeviceEnum.Pc
})
