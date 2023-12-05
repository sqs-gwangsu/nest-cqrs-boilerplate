import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { QvValidationException } from '@/shared/exception/exception/qv.validation.exception'

export class ClassUtil {
  static async tryParseDto<T extends object>(type: { new (): T }, object: any): Promise<T> {
    const instance = plainToInstance(type, object, {
      enableImplicitConversion: false,
    })
    const errors = await validate(instance, {
      whitelist: true,
      validationError: {
        target: false,
        value: false,
      },
    })

    if (errors.length > 0) {
      return null as any
    }

    return instance
  }

  static async parseDto<T extends object>(type: { new (): T }, object: any): Promise<T> {
    const instance = plainToInstance(type, object, {
      enableImplicitConversion: false,
    })
    const errors = await validate(instance, {
      whitelist: true,
      validationError: {
        target: false,
        value: false,
      },
    })

    if (errors.length > 0) {
      throw QvValidationException.create(errors)
    }

    return instance
  }
}
