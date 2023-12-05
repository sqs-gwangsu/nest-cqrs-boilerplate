import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { SiteAccessToken } from '@/features/member/domain/token/site-access-token'

export const SiteUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest()

  return SiteAccessToken.is(request.siteId!, request.jwtPayload) ? request.jwtPayload : null
})
