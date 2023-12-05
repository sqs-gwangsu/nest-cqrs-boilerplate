import { ClassType } from '@/common/utils/type.util'
import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger'

export class ApiRequest {
  static example<T extends ClassType<any>>(param: {
    type: T
    examples: Record<
      string,
      {
        value: InstanceType<T>
        summary?: string
        description?: string
        externalValue?: string
      }
    >
  }) {
    return applyDecorators(
      ApiExtraModels(param.type),
      ApiBody({
        schema: {
          $ref: getSchemaPath(param.type),
          examples: param.examples,
        },
        examples: param.examples,
      }),
    )
  }
}
