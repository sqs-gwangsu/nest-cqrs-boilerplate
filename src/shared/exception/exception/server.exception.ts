import { QvAbstractException } from "@/shared/exception/exception/abstract/qv-abstract.exception";
import { InternalServerErrorException } from "@nestjs/common";

export class ServerException extends QvAbstractException {
  constructor(detail?: any) {
    new InternalServerErrorException();
    super({
      httpCode: 500,
      message: "Internal server error",
      code: "common.server",
      detail: detail,
    });
  }
}
