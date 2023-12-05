import { QvAbstractException } from "@/shared/exception/exception/abstract/qv-abstract.exception";
import { InternalServerErrorException } from "@nestjs/common";

export class UnauthorizedException extends QvAbstractException {
  private constructor() {
    new InternalServerErrorException();
    super({
      httpCode: 401,
      message: "Unauthorized",
      code: "common.server",
    });
  }

  static create() {
    return new UnauthorizedException();
  }
}
