import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { QvUnauthorizedException } from '@/shared/exception/exception/qv.unauthorized.exception'
import { Reflector } from '@nestjs/core'
import {
  SUPER_ADMIN_AUTH_KEY,
  SuperAdminAuthOption,
} from '@/common/decorator/controller/super-admin-auth.decorator'
import { env } from '@/common/config/env'

@Injectable()
export class SuperAdminGuard implements CanActivate {
  @Inject()
  private reflector: Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const option = this.getAuthOption(context)
    if (option === undefined) {
      return true
    }

    if (option.isPublic) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()
    const isAllowed = await this.isAllowed(request, option)
    if (isAllowed) {
      return true
    }

    throw QvUnauthorizedException.create()
  }

  private async isAllowed(request: Request, option: SuperAdminAuthOption): Promise<boolean> {
    return env.localIpList.includes(request.realIp)
  }

  private getAuthOption(context: ExecutionContext): SuperAdminAuthOption {
    return this.reflector.getAllAndOverride<SuperAdminAuthOption>(SUPER_ADMIN_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
  }
}
