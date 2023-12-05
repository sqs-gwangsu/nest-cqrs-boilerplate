import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class IsInPipe<T = number | string> implements PipeTransform<any> {
  constructor(readonly list: T[]) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    const isValid = this.list.some((t) => value == t)
    if (!isValid) {
      throw new BadRequestException('Validation failed')
    }
    return value
  }
}
