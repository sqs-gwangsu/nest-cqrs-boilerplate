import { HttpException } from "@nestjs/common/exceptions/http.exception";

export type AbstractExceptionArgs = {
  httpCode: number;
  code: string;
  message: string;
  detail?: any;
};

export abstract class AbstractException extends HttpException {
  protected constructor(readonly args: AbstractExceptionArgs) {
    const { httpCode, message, detail, code } = args;

    const response = {
      code,
      message,
      detail,
    };

    super(response, httpCode);
  }
}
