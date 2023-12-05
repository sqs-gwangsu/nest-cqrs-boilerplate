import { QvAbstractException } from "@/shared/exception/exception/abstract/qv-abstract.exception";
import { InternalServerErrorException } from "@nestjs/common";

export class ForbiddenException extends QvAbstractException {
  constructor(detail?: any) {
    new InternalServerErrorException();
    super({
      httpCode: 403,
      code: "common.server",
      message: "forbidden",
      detail: detail,
    });
  }
}
