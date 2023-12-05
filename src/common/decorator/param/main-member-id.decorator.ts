import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { MainAccessToken } from '@/features/main-member/domain/token/main-access-token'

export const MainMemberId = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest()

  if (!MainAccessToken.is(request.jwtPayload)) {
    return 0
  }

  return request.jwtPayload.memberId
})
