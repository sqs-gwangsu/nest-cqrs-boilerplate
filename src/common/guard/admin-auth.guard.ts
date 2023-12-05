import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { QvUnauthorizedException } from '@/shared/exception/exception/qv.unauthorized.exception'
import { SiteAccessToken } from '@/features/member/domain/token/site-access-token'
import { ADMIN_AUTH_KEY, AdminAuthOption } from '@/common/decorator/controller/admin-auth.decorator'

@Injectable()
export class AdminAuthGuard implements CanActivate {
  @Inject()
  private readonly reflector: Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const option = this.reflector.getAllAndOverride<AdminAuthOption>(ADMIN_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!option) {
      return true
    }

    if (option.public) {
      return true
    }

    if (!SiteAccessToken.is(request.siteId!, request.jwtPayload) || !request.jwtPayload.isAdmin) {
      throw QvUnauthorizedException.create()
    }

    return true
  }
}
