import { ArgumentsHost, Logger } from "@nestjs/common";
import { IEvent, IEventHandler } from "@nestjs/cqrs";
import { BadRequestException } from "@/shared/exception/exception/bad-request.exception";
import { ForbiddenException } from "@/shared/exception/exception/forbidden.exception";
import { UnauthorizedException } from "@/shared/exception/exception/unauthorized.exception";
import { ValidationException } from "@/shared/exception/exception/validation.exception";
import { AbstractException } from "@/shared/exception/exception/abstract/abstract.exception";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { QueryFailedError } from "typeorm";
import { SafeEventsHandler } from "@/shared/event/safe-events-handler";

export class ExceptionEvent implements IEvent {
  constructor(
    readonly exception: Error,
    readonly host: ArgumentsHost,
  ) {}
}

@SafeEventsHandler(ExceptionEvent)
export class ExceptionEventHandler implements IEventHandler<ExceptionEvent> {
  constructor(private readonly logger: Logger) {}

  handle(event: ExceptionEvent): any {
    const { exception } = event;

    if (exception instanceof AbstractException) {
      return this.handleQvException(event);
    }

    if (exception instanceof QueryFailedError) {
      const message = `[QUERY_ERROR] \n${exception.message}\n\`\`\`${exception.query}\n${exception.parameters}\`\`\`\n${exception.stack}`;
      this.logger.error(message);
      return;
    }

    if (exception instanceof HttpException) {
      return;
    }

    const message = `[ERROR] ${exception.message}\n${exception.stack}`;
    this.logger.error(message);
  }

  private handleQvException(event: ExceptionEvent) {
    const { exception } = event;

    // 사용자 입력 오류
    if (exception instanceof BadRequestException) {
      return;
    }

    // 인증
    if (exception instanceof ForbiddenException) {
      return;
    }

    // 로그인
    if (exception instanceof UnauthorizedException) {
      return;
    }

    // DTO 오류
    if (exception instanceof ValidationException) {
      return;
    }
  }
}
