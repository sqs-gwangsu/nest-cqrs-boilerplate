import { ArgumentsHost, Catch, Inject } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ExceptionEvent } from '@/shared/exception/event/exception.event'
import { EventBus } from '@nestjs/cqrs'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { Request } from 'express'

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  @Inject()
  private readonly eventBus: EventBus

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const { isLocal } = ctx.getRequest<Request>()

    try {
      this.eventBus.publish(new ExceptionEvent(exception, host))

      if (exception instanceof HttpException) {
        const errorResponse: object =
          typeof exception.getResponse() === 'object'
            ? (exception.getResponse() as object)
            : { error: exception.getResponse() }

        const newException = new HttpException(
          {
            ...errorResponse,
            ...(isLocal ? { _dev: ((exception || {}).stack || '').split(/\n\s+/) } : {}),
          },
          exception.getStatus(),
        )

        return super.catch(newException, host)
      }

      const newException = new HttpException(
        {
          error: 'Internal server error',
          ...(isLocal ? { _dev: ((exception || {}).stack || '').split(/\n\s+/) } : {}),
        },
        500,
      )

      return super.catch(newException, host)
    } catch (e) {
      return super.catch(e, host)
    }
  }
}
