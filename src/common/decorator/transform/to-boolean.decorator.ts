import { Transform } from 'class-transformer'

export const ToBoolean = () => Transform(({ value }) => convertToBoolean(value))

const convertToBoolean = (value: any): Boolean | null => {
  if (value == null) {
    return null
  }

  if (typeof value === 'boolean') {
    return value
  }

  if ([0, 1].includes(value)) {
    return !!value
  }

  if (['0', '1'].includes(value)) {
    return value === '1'
  }

  if (['true', 'false'].includes(value)) {
    return value === 'true'
  }

  return null
}
