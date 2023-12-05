import { ExceptionType } from "@/shared/exception/type/exception.type";
import { QvAbstractException } from "@/shared/exception/exception/abstract/qv-abstract.exception";
import { ExceptionInfo } from "@/shared/exception/type/util/exception.type";

export class BadRequestException extends QvAbstractException {
  constructor(
    readonly code: string,
    message: string,
    detail: any,
  ) {
    super({
      httpCode: 400,
      message: message,
      code: code,
      detail: detail,
    });
  }

  static _create(type?: ExceptionType, detail?: any) {
    return new BadRequestException(undefined as any, type as any, detail);
  }

  static create<T extends ExceptionInfo>(info: T, detail?: any): BadRequestException {
    const { code, message } = info;
    return new BadRequestException(code, message, detail);
  }
}
