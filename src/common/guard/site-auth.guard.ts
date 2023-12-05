import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { QvUnauthorizedException } from '@/shared/exception/exception/qv.unauthorized.exception'
import { SITE_AUTH_META_KEY } from '@/common/decorator/controller/site-auth.decorator'
import { SiteAccessToken } from '@/features/member/domain/token/site-access-token'

@Injectable()
export class SiteAuthGuard implements CanActivate {
  @Inject()
  private readonly reflector: Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const isSiteAuth = Boolean(
      this.reflector.get<boolean>(SITE_AUTH_META_KEY, context.getHandler()) ||
        this.reflector.get<boolean>(SITE_AUTH_META_KEY, context.getClass()),
    )

    if (!isSiteAuth) {
      return true
    }

    if (!SiteAccessToken.is(request.siteId!, request.jwtPayload)) {
      throw QvUnauthorizedException.create()
    }

    return true
  }
}
