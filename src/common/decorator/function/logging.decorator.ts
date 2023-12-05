import { applyDecorators, SetMetadata } from '@nestjs/common'

export const LOGGING_METADATA = Symbol('LOGGING_METADATA')

export interface LoggingOption {
  start?: boolean
  end?: boolean
  param?: boolean
  result?: boolean
}

export function Logging(
  option: LoggingOption = {
    end: true,
  },
) {
  return applyDecorators(SetMetadata(LOGGING_METADATA, option))
}
