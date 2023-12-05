import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { SiteException } from '@/shared/exception/type/feature/site.exception'

export class SiteIdGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    if (request.siteId) {
      return true
    }

    throw SiteException.NotFound()
  }
}
