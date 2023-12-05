import { QvAbstractException } from "@/shared/exception/exception/abstract/qv-abstract.exception";
import { InternalServerErrorException } from "@nestjs/common";

export class QueryException extends QvAbstractException {
  private constructor(
    readonly message: string,
    readonly sql: string,
    readonly stack: string,
  ) {
    new InternalServerErrorException();
    super({
      httpCode: 400,
      message: "Query Error",
      code: "common.server",
    });
  }

  static create(message: string, sql: string, stack: string) {
    return new QueryException(message, sql, stack);
  }
}
