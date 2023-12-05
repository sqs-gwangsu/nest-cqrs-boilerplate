import { AbstractException } from "@/shared/exception/exception/abstract/abstract.exception";

export class ValidationException extends AbstractException {
  constructor(errors: any) {
    super({
      httpCode: 400,
      message: "Validation Error",
      code: "common.server",
      detail: errors,
    });
  }

  static create(errors: any) {
    return new ValidationException(errors);
  }
}
