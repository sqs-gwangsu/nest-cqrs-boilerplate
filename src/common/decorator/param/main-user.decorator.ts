import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { MainAccessToken } from '@/features/main-member/domain/token/main-access-token'

export const MainUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest()

  if (!MainAccessToken.is(request.jwtPayload)) {
    return null
  }

  return request.jwtPayload
})
