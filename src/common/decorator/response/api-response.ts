import { ClassType } from '@/common/utils/type.util'
import { applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

export class ApiResponse {
  static list(itemType: ClassType<any>) {
    return applyDecorators(
      ApiExtraModels(itemType),
      ApiOkResponse({
        schema: {
          allOf: [
            {
              properties: {
                list: {
                  type: 'array',
                  items: {
                    $ref: getSchemaPath(itemType),
                  },
                },
              },
            },
          ],
        },
      }),
    )
  }

  static paging(itemType: ClassType<any>) {
    return applyDecorators(
      ApiExtraModels(itemType),
      ApiOkResponse({
        schema: {
          allOf: [
            {
              properties: {
                list: {
                  type: 'array',
                  items: {
                    $ref: getSchemaPath(itemType),
                  },
                },
                count: {
                  type: 'number',
                },
              },
            },
          ],
        },
      }),
    )
  }

  static item(type: ClassType<any>) {
    return applyDecorators(
      ApiExtraModels(type),
      ApiOkResponse({
        schema: {
          properties: {
            item: {
              $ref: getSchemaPath(type),
            },
          },
        },
      }),
    )
  }

  static id(type: 'number' | 'string' = 'number') {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          properties: {
            id: {
              type,
            },
          },
        },
      }),
    )
  }

  static ok() {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          example: 'ok',
        },
      }),
    )
  }
}
