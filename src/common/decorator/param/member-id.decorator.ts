import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { SiteAccessToken } from '@/features/member/domain/token/site-access-token'

export const MemberId = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest()

  if (!SiteAccessToken.is(request.siteId!, request.jwtPayload)) {
    return 0
  }

  return request.jwtPayload.memberId
})
