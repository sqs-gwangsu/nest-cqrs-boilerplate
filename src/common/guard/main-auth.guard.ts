import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {
  MAIN_AUTH_META_KEY,
  MainAuthOption,
} from '@/common/decorator/controller/main-auth.decorator'
import { Request } from 'express'
import { QvUnauthorizedException } from '@/shared/exception/exception/qv.unauthorized.exception'
import { MainAccessToken } from '@/features/main-member/domain/token/main-access-token'

@Injectable()
export class MainAuthGuard implements CanActivate {
  @Inject()
  private readonly reflector: Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const option = this.reflector.getAllAndOverride<MainAuthOption>(MAIN_AUTH_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!option) {
      return true
    }

    if (option.isPublic) {
      return true
    }

    if (!MainAccessToken.is(request.jwtPayload)) {
      throw QvUnauthorizedException.create()
    }

    return true
  }
}
